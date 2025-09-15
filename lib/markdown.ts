export type RenderOptions = { inline?: boolean };

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeUrl(url: string) {
  try {
    const u = url.trim();
    if (/^(https?:|mailto:)/i.test(u)) return u;
    return ""; // disallow javascript: and other schemes
  } catch {
    return "";
  }
}

function applyInline(md: string) {
  // Protect inline code first
  const codeSlots: string[] = [];
  md = md.replace(/`([^`]+)`/g, (_, code: string) => {
    const idx = codeSlots.length;
    codeSlots.push(`<code>${code}</code>`);
    return `\u0000CODE${idx}\u0000`;
  });

  // Images ![alt](url)
  md = md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt: string, url: string) => {
    const u = sanitizeUrl(url);
    if (!u) return alt ? escapeHtml(alt) : "";
    return `<img src="${u}" alt="${alt}" />`;
  });

  // Links [text](url)
  md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text: string, url: string) => {
    const u = sanitizeUrl(url);
    const t = text;
    if (!u) return t;
    return `<a href="${u}" target="_blank" rel="nofollow noreferrer noopener">${t}</a>`;
  });

  // Auto-link plain URLs
  md = md.replace(/(?<![\"'>])(https?:\/\/[^\s<]+)(?![^<]*>)/g, (m: string) => {
    const u = sanitizeUrl(m);
    if (!u) return m;
    return `<a href="${u}" target="_blank" rel="nofollow noreferrer noopener">${m}</a>`;
  });

  // Strikethrough ~~text~~
  md = md.replace(/~~(.+?)~~/g, "<del>$1</del>");
  // Bold **text**
  md = md.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic _text_ or *text*
  md = md.replace(/(^|\W)_(.+?)_(?=\W|$)/g, "$1<em>$2</em>");
  md = md.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Underline ++text++ (non-standard)
  md = md.replace(/\+\+(.+?)\+\+/g, "<u>$1</u>");

  // Restore inline code
  md = md.replace(/\u0000CODE(\d+)\u0000/g, (_, i: string) => codeSlots[Number(i)] || "");
  return md;
}

export function toHtml(input: string, opts: RenderOptions = {}): string {
  const inline = !!opts.inline;
  const safe = escapeHtml(input || "");

  if (inline) {
    let s = safe;
    // Render headings inline as strong
    s = s.replace(/^######\s+(.*)$/gm, "<strong>$1</strong>");
    s = s.replace(/^#####\s+(.*)$/gm, "<strong>$1</strong>");
    s = s.replace(/^####\s+(.*)$/gm, "<strong>$1</strong>");
    s = s.replace(/^###\s+(.*)$/gm, "<strong>$1</strong>");
    s = s.replace(/^##\s+(.*)$/gm, "<strong>$1</strong>");
    s = s.replace(/^#\s+(.*)$/gm, "<strong>$1</strong>");
    s = applyInline(s);
    // Convert newlines to <br /> for previewing multi-line snippets
    s = s.replace(/\n/g, "<br />");
    return s;
  }

  // Full block rendering
  const lines = safe.replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;
  let inCode = false;
  let codeLang = "";
  let codeBuffer: string[] = [];
  let openList: null | "ul" | "ol" = null;

  function closeList() {
    if (openList) {
      out.push(openList === "ul" ? "</ul>" : "</ol>");
      openList = null;
    }
  }

  while (i < lines.length) {
    let line = lines[i] ?? "";

    // Code fence start/end
    const fenceMatch = line.match(/^\s*```\s*([a-zA-Z0-9_-]+)?\s*$/);
    if (fenceMatch) {
      if (!inCode) {
        closeList();
        inCode = true;
        codeLang = fenceMatch[1] || "";
        codeBuffer = [];
      } else {
        // close code block
        const codeHtml = codeBuffer.join("\n");
        const cls = codeLang ? ` class=\"language-${codeLang}\"` : "";
        out.push(`<pre><code${cls}>${codeHtml}</code></pre>`);
        inCode = false;
        codeLang = "";
        codeBuffer = [];
      }
      i++;
      continue;
    }

    if (inCode) {
      codeBuffer.push(line);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^\s*(\*\s*\*\s*\*|-{3,}|_{3,})\s*$/.test(line)) {
      closeList();
      out.push("<hr />");
      i++;
      continue;
    }

    // Headings
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      closeList();
      const level = Math.min(6, (h[1] || '').length);
      out.push(`<h${level}>${applyInline(h[2] || '')}</h${level}>`);
      i++;
      continue;
    }

    // Blockquote: group consecutive '>' lines
    if (/^\s*>\s?/.test(line)) {
      closeList();
      const bqLines: string[] = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i] ?? "")) {
        bqLines.push((lines[i] ?? "").replace(/^\s*>\s?/, ""));
        i++;
      }
      const inner = applyInline(bqLines.join("\n")).replace(/\n/g, "<br />");
      out.push(`<blockquote>${inner}</blockquote>`);
      continue;
    }

    // Lists
    const ulMatch = line.match(/^\s*[-+*]\s+(.*)$/);
    const olMatch = line.match(/^\s*(\d+)\.\s+(.*)$/);
    if (ulMatch || olMatch) {
      const isOl = Boolean(olMatch);
      if (!openList || (isOl ? openList !== "ol" : openList !== "ul")) {
        closeList();
        openList = isOl ? "ol" : "ul";
        out.push(openList === "ol" ? "<ol>" : "<ul>");
      }
      // Gather this item's text possibly spanning following indented lines
      let item = (ulMatch ? ulMatch[1] : olMatch![2]) || "";
      let j = i + 1;
      const itemLines: string[] = [item];
      while (j < lines.length) {
        const next = lines[j] ?? "";
        if (/^\s*$/.test(next)) break;
        if (/^\s*```/.test(next)) break; // start of code block
        if (/^\s*>\s?/.test(next)) break; // start of blockquote
        if (/^\s*[-+*]\s+/.test(next)) break; // new bullet
        if (/^\s*\d+\.\s+/.test(next)) break; // new ordered item
        itemLines.push(next);
        j++;
      }

      // Checkbox support [-] [x]
      let itemHtml: string;
      const check = itemLines.join("\n").match(/^\s*\[( |x|X)\]\s+(.*)$/);
      if (check) {
        const checked = /x/i.test(check[1] || "");
        itemHtml = `<label><input type=\"checkbox\" disabled ${checked ? "checked" : ""} /> ${applyInline(check[2] || "")}</label>`;
      } else {
        itemHtml = applyInline(itemLines.join("\n")).replace(/\n/g, "<br />");
      }

      out.push(`<li>${itemHtml}</li>`);
      i = j;
      continue;
    }

    // Blank line
    if (!line.trim()) {
      closeList();
      i++;
      continue;
    }

    // Paragraph: gather until blank or block boundary
    closeList();
    const para: string[] = [line];
    let j = i + 1;
    while (j < lines.length) {
      const next = lines[j] ?? "";
      if (!next.trim()) break;
      if (/^\s*```/.test(next)) break;
      if (/^\s*>\s?/.test(next)) break;
      if (/^(#{1,6})\s+/.test(next)) break;
      if (/^\s*(\*\s*\*\s*\*|-{3,}|_{3,})\s*$/.test(next)) break;
      if (/^\s*[-+*]\s+/.test(next)) break;
      if (/^\s*\d+\.\s+/.test(next)) break;
      para.push(next);
      j++;
    }
    const html = applyInline(para.join("\n")).replace(/\n/g, "<br />");
    out.push(`<p>${html}</p>`);
    i = j;
  }

  // Close any open list
  if (openList) closeList();
  // If code block left open, flush it as-is
  if (inCode) {
    const codeHtml = codeBuffer.join("\n");
    const cls = codeLang ? ` class=\"language-${codeLang}\"` : "";
    out.push(`<pre><code${cls}>${codeHtml}</code></pre>`);
  }

  return out.join("\n");
}

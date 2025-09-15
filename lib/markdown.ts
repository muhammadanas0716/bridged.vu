export type RenderOptions = { inline?: boolean };

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function applyInline(md: string) {
  // Bold **text**
  md = md.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic _text_ or *text*
  md = md.replace(/(^|\W)_(.+?)_(?=\W|$)/g, "$1<em>$2</em>");
  md = md.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Underline ++text++ (non-standard but simple)
  md = md.replace(/\+\+(.+?)\+\+/g, "<u>$1</u>");
  return md;
}

export function toHtml(input: string, opts: RenderOptions = {}): string {
  const inline = !!opts.inline;
  const safe = escapeHtml(input);

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

  // Block rendering with headings and paragraphs
  const lines = safe.split(/\n\n+/); // paragraphs by blank line
  const out: string[] = [];
  for (let block of lines) {
    // Headings (largest to smallest)
    if (/^######\s+/.test(block)) { out.push(`<h6>${applyInline(block.replace(/^######\s+/, ""))}</h6>`); continue; }
    if (/^#####\s+/.test(block)) { out.push(`<h5>${applyInline(block.replace(/^#####\s+/, ""))}</h5>`); continue; }
    if (/^####\s+/.test(block)) { out.push(`<h4>${applyInline(block.replace(/^####\s+/, ""))}</h4>`); continue; }
    if (/^###\s+/.test(block)) { out.push(`<h3>${applyInline(block.replace(/^###\s+/, ""))}</h3>`); continue; }
    if (/^##\s+/.test(block)) { out.push(`<h2>${applyInline(block.replace(/^##\s+/, ""))}</h2>`); continue; }
    if (/^#\s+/.test(block)) { out.push(`<h1>${applyInline(block.replace(/^#\s+/, ""))}</h1>`); continue; }

    // Regular paragraph: keep single newlines as breaks inside paragraph
    const html = applyInline(block).replace(/\n/g, "<br />");
    out.push(`<p>${html}</p>`);
  }
  return out.join("\n");
}


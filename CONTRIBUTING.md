# Contributing to Bridged.vu

Thanks for your interest in contributing! We welcome issues, discussions, and pull requests from the community.

---

## 🛠 Getting Started

1. **Fork the repo** and clone it locally.
2. **Create a branch** for your work:
   - `feat/<short-name>` for new features
   - `fix/<short-name>` for bug fixes
   - `chore/<short-name>` for tooling or housekeeping
3. **Make your changes** with clear, incremental commits.
4. **Push** to your fork and open a **Pull Request** against `main`.

---

## 💻 Development Workflow

- Install dependencies:

  ```bash
  npm install
  # or
  pnpm install
  ```

- Run the dev server:

  ```bash
  npm run dev
  # or
  pnpm dev
  ```

- Lint your code (optional but recommended):
  ```bash
  npm run lint
  # or
  pnpm lint
  ```

---

## 📝 Commit Messages

We encourage using [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` → a new feature
- `fix:` → a bug fix
- `chore:` → changes to tooling, configs, or docs
- `refactor:` → code refactor without changing features

Example:

```
feat: add project page layout
fix: correct header alignment on mobile
```

---

## 🎨 Code Style

- TypeScript **strict mode** is enforced.
- Keep components **small, focused, and accessible**.
- Favor **readability over cleverness**.
- Keep dependencies minimal.

---

## 🤝 How to Contribute

- **Open an Issue** for bugs, feature requests, or discussions.
- **Submit a Pull Request** once your code is ready.
- **Join Discussions** in Issues/PRs — your feedback matters!

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

---

## 🔐 Security & Privacy

- Never commit secrets; use `.env.local` (see `.env.example`)
- Do not log sensitive data (passwords, tokens)
- Report security issues privately via Issues with the `security` label (we’ll coordinate a secure channel)

---

<p align="center">
  Made with ❤️ by the <b>Bridged.vu</b> community
</p>

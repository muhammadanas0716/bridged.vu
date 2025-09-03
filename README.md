# founderdiary.io

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js Badge"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge"/>
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS Badge"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License Badge"/>
</p>

<p align="center">
  <b>FounderDiary</b> — an open-source platform where founders can share their SaaS story and daily progress.
</p>

---

## ✨ Features (Scaffold)

- 🚀 Next.js (App Router) with TypeScript  
- 🎨 TailwindCSS v4 (modern config-less setup)  
- 📂 Clean project structure (app router + components)  
- 📝 Open-source ready with MIT License, Contributing Guidelines, and Code of Conduct  
- 🎯 Minimal skeleton: Home, Dashboard, Login, Project, and User profile routes  

---

## 📦 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)  
- **Language**: [TypeScript](https://www.typescriptlang.org/)  
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/docs)  
- **Package Manager**: npm / pnpm / yarn (your choice)  

---

## 🛠️ Getting Started

Clone the repository and install dependencies:

```bash
# clone
git clone https://github.com/YOUR_USERNAME/founderdiary.io.git
cd founderdiary.io

# install
npm install

# dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see it running.

---

## ⚙️ Environment Variables

Copy `.env.example` into `.env.local`:

```bash
cp .env.example .env.local
```

Default values are already provided for local development.
Future values (API keys, DB URLs, etc.) will be added here.

---

## 📂 Project Structure

```
founderdiary.io/
├─ app/                # Next.js App Router pages
│  ├─ layout.tsx       # Root layout
│  ├─ page.tsx         # Home
│  ├─ login/           # Login route
│  ├─ dashboard/       # Dashboard route
│  ├─ u/[handle]/      # User profile route
│  └─ p/[projectSlug]/ # Project route
│
├─ components/         # Shared UI components
│  └─ site-header.tsx
│
├─ public/             # Static assets
│
├─ app/globals.css     # TailwindCSS global styles
├─ .env.example        # Example env vars
├─ .gitignore
├─ CONTRIBUTING.md
├─ CODE_OF_CONDUCT.md
├─ LICENSE
└─ README.md
```

---

## 🤝 Contributing

We welcome contributions from the community!

1. Fork the repository
2. Create a new branch:

   ```bash
   git checkout -b feat/your-feature-name
   ```
3. Commit your changes (use [Conventional Commits](https://www.conventionalcommits.org/)):

   ```bash
   git commit -m "feat: add project page layout"
   ```
4. Push to your fork and open a PR

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) for full guidelines.

---

## 📜 Code of Conduct

This project follows the [Contributor Covenant v2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).
By participating, you agree to uphold this standard.

See [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) for details.

---

## 📄 License

This project is licensed under the **MIT License**.
See [`LICENSE`](LICENSE) for details.

---

## 🌟 Acknowledgements

* Inspired by the **build-in-public** movement
* Powered by the amazing [Next.js](https://nextjs.org/) and [TailwindCSS](https://tailwindcss.com/) communities

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/YOUR_USERNAME">YOUR_NAME</a>
</p>
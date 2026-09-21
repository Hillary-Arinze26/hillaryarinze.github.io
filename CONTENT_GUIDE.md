# Portfolio Website — Content Guide

This guide explains how to update your portfolio website. No coding experience needed — just follow these steps.

---

## How to Add Your Photo

1. Save your photo as a JPG file named exactly `profile.jpg`.
2. Place it in the `assets` folder (same place as your resume).
3. The photo will automatically appear in the About section next to your bio.
4. The placeholder will disappear once the photo is detected.

---

## How to Update Your Resume

1. Save your resume as a PDF file named exactly `resume.pdf`.
2. Replace the file at `assets/resume.pdf` in this project folder.
3. The website will automatically detect it and enable the download button.

---

## How to Add a New Project

Open the file `js/data.js` in VS Code. Find the `projects` array. Copy any existing project block (from `{` to `}`) and paste it as a new entry. Change the fields:

- `id`: a unique short name, no spaces (e.g., `'my-new-project'`)
- `title`: the project name
- `tags`: array of category tags — use these values: `'powerbi'`, `'excel'`, `'python'`, `'research'`, `'education'`
- `tagLabels`: what shows on the card — e.g., `['Power BI', 'DAX']`
- `shortDesc`: one-sentence summary shown on the card
- `problem`: what problem the project solves
- `process`: array of steps you took (each step in quotes)
- `findings`: array of key results
- `skills`: array of skill names
- `links`: array of `{ label: '...', url: '...' }` for external links (can be empty `[]`)

---

## How to Update Skills

In `js/data.js`, find the `skills` array. Edit the `title`, `desc`, and `level` (0-100) for each skill. To add a new skill, copy an existing block and change the values. The `icon` field uses these keys: `'chart'`, `'grid'`, `'database'`, `'code'`, `'check'`, `'book'`.

---

## How to Update Contact Links

Open `index.html` in VS Code and search for the `id="contact"` section. Update the `href` attributes:

- **Email**: change `mailto:hillary.arinze26@gmail.com` to your preferred email
- **GitHub**: change `https://github.com/` to `https://github.com/YOUR_USERNAME`
- **LinkedIn**: change `https://www.linkedin.com/` to your LinkedIn profile URL

---

## How to Update Your Name or Bio

Open `index.html` in VS Code:

- Search for "Hillary Chidinma Arinze" to find and replace your name
- The hero section (top of the page) has your tagline and subtitle
- The About section has your bio paragraphs
- The Quick Facts card has your location, education, and focus

---

## How to Deploy to GitHub Pages

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** in the top right, then **New repository**
3. Name it `your-username.github.io` (replace with your GitHub username)
4. Set it to **Public**, then click **Create repository**
5. In VS Code, open the terminal (Ctrl + `)
6. Run these commands (replace `YOUR-USERNAME`):
   ```
   git init
   git add .
   git commit -m "Initial portfolio website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
   git push -u origin main
   ```
7. On GitHub, go to your repository → **Settings** → **Pages**
8. Under "Source", select **Deploy from a branch**
9. Select branch `main` and folder `/root`, then click **Save**
10. Your site will be live at `https://YOUR-USERNAME.github.io` in a few minutes

---

## How to Make Future Updates

After making any changes in VS Code:

1. Save the files (Ctrl + S)
2. Open the terminal (Ctrl + `)
3. Run:
   ```
   git add .
   git commit -m "Updated projects"
   git push
   ```
4. Your live site updates automatically in 1-2 minutes

---

## File Structure

```
portfolio-site/
├── index.html          ← Main page (edit name, bio, contact links here)
├── css/
│   ├── base.css        ← Design system (colors, fonts)
│   └── style.css       ← Layout and component styles
├── js/
│   ├── data.js         ← YOUR PROJECTS AND SKILLS (edit this)
│   └── app.js          ← App logic (charts, filters, modal)
├── assets/
│   ├── resume.pdf      ← PUT YOUR RESUME HERE
│   └── profile.jpg     ← PUT YOUR PHOTO HERE
└── CONTENT_GUIDE.md    ← This file
```

---

## Questions?

If you need help updating the site, just ask in your Perplexity Computer session and I can make the changes for you.

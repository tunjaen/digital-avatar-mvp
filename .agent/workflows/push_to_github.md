---
description: How to push the current project to GitHub
---

# Push to GitHub

1.  **Create a New Repository on GitHub**
    *   Go to [github.com/new](https://github.com/new).
    *   Name your repository (e.g., `digital-avatar-mvp`).
    *   Do **NOT** initialize with README, .gitignore, or License (we already have them).
    *   Click **Create repository**.

2.  **Link and Push**
    *   Copy the URL of your new repository (e.g., `https://github.com/username/digital-avatar-mvp.git`).
    *   Run the following commands in your terminal:

```bash
# Add the remote repository
git remote add origin <PASTE_YOUR_REPO_URL_HERE>

# Rename branch to main (standard practice)
git branch -M main

# Push your code
git push -u origin main
```

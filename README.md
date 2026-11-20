# Study Materials Hub

Home page (`public/index.html`) lists every material automatically.
Each material is a folder inside `public/` and gets its own link:

    public/bagdhara-exercise/   ->  your-site.pages.dev/bagdhara-exercise/
    public/materials-2/         ->  your-site.pages.dev/materials-2/

## Add a material
1. Make a folder in `public/` (its name becomes the link; use small English letters and dashes).
2. Put these inside:
   - `index.html`   the material's page
   - `meta.json`    the card shown on the home page
   - audio/images   any other files the page uses (keep each file under 25 MB)
3. Commit. Cloudflare rebuilds and the card appears in about a minute.

## meta.json
{
  "title": "ইংরেজি Tense চার্ট",
  "description": "সব Tense এক পাতায়, উদাহরণসহ।",
  "subject": "ইংরেজি",
  "tags": ["নোট", "PDF"],
  "date": "2026-11-25",
  "icon": "📚"
}
Optional: "hidden": true  -> hides the card from the home page (the page itself stays reachable by its link).

## Edit / delete
- Edit: open the file on GitHub, click the pencil icon, change, commit.
- Delete: open the folder on GitHub, "..." menu, Delete directory, commit.

## Cloudflare Pages settings
- Framework preset: None
- Build command:    node build.mjs
- Build output directory: public

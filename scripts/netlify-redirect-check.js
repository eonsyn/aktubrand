// scripts/netlify-redirect-check.js
const fs = require("fs");
const path = require("path");

const redirectSrc = path.join(__dirname, "..", "public", "_redirects.netlify");
const redirectDest = path.join(__dirname, "..", "public", "_redirects");

if (process.env.REDIRECT === "true") {
  fs.copyFileSync(redirectSrc, redirectDest);
  console.log("✅ Netlify: _redirects.netlify copied to _redirects");
} else {
  console.log("ℹ️ Netlify: REDIRECT=false, skipping _redirects");
}

# Asphalt Sealcoat Service — Website

Static HTML/CSS/JavaScript website for Asphalt Sealcoat Service.  
Designed for hosting on GitHub Pages with the custom domain **asphaltsealcoatservice.com**.

---

## File Structure

```
asphalt-site/
├── index.html          ← Main single-page site (all sections)
├── css/
│   └── styles.css      ← All styles, responsive, animations
├── js/
│   └── main.js         ← Navigation, scroll animations, form handling
├── images/             ← Add project photos here
├── CNAME               ← GitHub Pages custom domain config
└── README.md           ← This file
```

---

## Deploying to GitHub Pages

### Step 1: Create a GitHub Account
1. Go to [github.com](https://github.com) and sign up for a free account.
2. Verify your email address.

### Step 2: Create a New Repository
1. Click the **+** icon in the top right → **New repository**.
2. Name it: `asphaltsealcoatservice.com` (or any name you prefer).
3. Set it to **Public**.
4. Do NOT initialize with a README (we already have one).
5. Click **Create repository**.

### Step 3: Upload the Website Files
1. On the repository page, click **uploading an existing file**.
2. Drag and drop ALL files and folders from this project:
   - `index.html`
   - `css/` folder (with styles.css)
   - `js/` folder (with main.js)
   - `images/` folder
   - `CNAME`
3. Click **Commit changes**.

### Step 4: Enable GitHub Pages
1. Go to your repository → **Settings** tab.
2. In the left sidebar, click **Pages**.
3. Under "Source," select **Deploy from a branch**.
4. Select the **main** branch and **/ (root)** folder.
5. Click **Save**.
6. GitHub will deploy your site within 1–2 minutes.

### Step 5: Connect Custom Domain (asphaltsealcoatservice.com)

#### At Your Domain Registrar:
Add these DNS records (the registrar where you purchased asphaltsealcoatservice.com):

**A Records** (point the root domain to GitHub Pages):
```
Type: A    Host: @    Value: 185.199.108.153
Type: A    Host: @    Value: 185.199.109.153
Type: A    Host: @    Value: 185.199.110.153
Type: A    Host: @    Value: 185.199.111.153
```

**CNAME Record** (point www to GitHub Pages):
```
Type: CNAME    Host: www    Value: YOUR-USERNAME.github.io
```

Replace `YOUR-USERNAME` with your actual GitHub username.

#### In GitHub:
1. Go to repository → **Settings** → **Pages**.
2. Under "Custom domain," enter: `asphaltsealcoatservice.com`
3. Click **Save**.
4. Check **Enforce HTTPS** once the DNS propagates (may take up to 24 hours).

### Step 6: Verify
- Visit `https://asphaltsealcoatservice.com` — your site should be live.
- Visit `https://www.asphaltsealcoatservice.com` — should redirect to the above.

---

## Setting Up the Contact Form

The contact form is currently in demo mode (shows a success message but doesn't send emails).
To make it actually send form submissions to Rob's email:

### Option A: Formspree (Recommended — Free for 50 submissions/month)
1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form — Formspree gives you an endpoint URL like:
   `https://formspree.io/f/xABCDEFG`
3. In `index.html`, find this line:
   ```html
   <form id="contact-form" class="contact-form" action="#" method="POST">
   ```
4. Replace `action="#"` with your Formspree URL:
   ```html
   <form id="contact-form" class="contact-form" action="https://formspree.io/f/xABCDEFG" method="POST">
   ```
5. Commit and push the change. Form submissions will now email Rob directly.

### Option B: Netlify Forms (Free if you host on Netlify instead of GitHub Pages)
1. Add `netlify` attribute to the form tag:
   ```html
   <form id="contact-form" class="contact-form" netlify name="estimate-request">
   ```
2. Deploy to Netlify instead of GitHub Pages.

---

## Adding Project Photos

1. Add `.jpg` or `.webp` images to the `images/` folder.
2. In `index.html`, find the "about-image-placeholder" div and replace it with:
   ```html
   <img src="images/your-photo.jpg" alt="Sealcoating project by Asphalt Sealcoat Service" loading="lazy">
   ```
3. For a hero background image, add to the `.hero` section in CSS:
   ```css
   .hero-overlay {
     background:
       linear-gradient(135deg, rgba(26,26,26,0.88) 0%, rgba(44,44,44,0.7) 50%, rgba(26,26,26,0.85) 100%),
       url('../images/hero-bg.jpg') center/cover no-repeat;
   }
   ```

---

## Customization Notes

- **Colors**: All colors are CSS variables in `:root` at the top of `styles.css`.
- **Fonts**: Using Google Fonts (Oswald + Source Sans 3). Change in the `<link>` tag in `index.html`.
- **Service Area**: Edit the county list in the "Service Area" section of `index.html`.
- **Testimonials**: Replace placeholder reviews with real client testimonials.
- **SEO**: Title tag, meta description, and Open Graph tags are in the `<head>` of `index.html`.

---

## Cost

- **GitHub Pages hosting**: Free
- **HTTPS/SSL**: Free (via GitHub Pages)
- **Domain name**: ~$10–15/year (purchased separately from a registrar)
- **Contact form (Formspree)**: Free for up to 50 submissions/month
- **Total ongoing cost**: ~$10–15/year (domain only)

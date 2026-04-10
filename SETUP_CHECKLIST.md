# Setup checklist — West Idaho Anesthesia

Use this checklist to verify WordPress, GraphQL, Faust, and the Next.js frontend.

## WordPress

### Plugins

- [ ] **Advanced Custom Fields Pro** installed and activated  
- [ ] **WPGraphQL** installed and activated  
- [ ] **WPGraphQL for Advanced Custom Fields** installed and activated  
- [ ] **FaustWP** (Headless) installed and activated  

### GraphQL

- [ ] **GraphQL → Settings**: enable **GraphQL Debug Mode** (while developing)  
- [ ] **GraphQL → Settings**: enable **Public Introspection**  
- [ ] Save changes  

### Headless (Faust)

- [ ] **Settings → Headless**: **Front-end site URL** = your Next URL (`http://localhost:3000` locally, or production URL including port if applicable)  
- [ ] Copy **Secret Key** for `FAUST_SECRET_KEY`  
- [ ] Note the **WordPress site URL** for `NEXT_PUBLIC_WORDPRESS_URL`  

### Content (adjust to your IA)

- [ ] **Settings → Reading**: front page assigned as needed for the Faust `front-page` template  
- [ ] Core pages published in WordPress if they back CMS-driven routes  
- [ ] Blog: posts published if `/blog` or archives are used  

## Frontend (`frontend/`)

### Environment

- [ ] Create **`frontend/.env.local`** with:  
  - [ ] `NEXT_PUBLIC_WORDPRESS_URL` = WordPress base URL (no trailing path)  
  - [ ] `FAUST_SECRET_KEY` = secret from **Settings → Headless**  
- [ ] Optional: align **`frontend/.env.development`** / **`.env.production`** with the same variable rules for each environment  

### Install and generate

- [ ] `npm install` completes without errors  
- [ ] `npm run generate` updates **`possibleTypes.json`**  

### Local run

- [ ] `npm run dev` starts Faust/Next  
- [ ] Open **http://localhost:3000** — homepage loads  
- [ ] Spot-check: `/services`, `/meet-the-team`, `/contact`, `/blog`, `/patient-portal`, `/online-bill-pay` as applicable  
- [ ] WordPress-driven URLs resolve via **`[...wordpressNode]`** where used  
- [ ] **`/preview`** works for draft preview if configured  

## Verification

### UI and navigation

- [ ] Header and footer links match the live information architecture  
- [ ] Mobile layout is acceptable on key pages  

### Data

- [ ] GraphQL queries return expected content (use GraphiQL for complex cases)  
- [ ] Images from WordPress load (hostname allowed in **`next.config.js`** via Faust `getWpHostname()`)  

### Production / server (if applicable)

- [ ] **`NEXT_PUBLIC_WORDPRESS_URL`** on the server points at WordPress (often port **80** / HTTPS), not only at the Next port  
- [ ] PM2 (or your process manager) runs **`faust start`** / `npm start` from `frontend/`  
- [ ] GitHub Actions secrets/vars match **[README.md](./README.md)** deploy section  

## Troubleshooting

1. **GraphQL errors** — Plugins active; introspection on; ACF field groups expose fields to GraphQL; clear caches.  
2. **Frontend cannot reach WordPress** — URL in `.env.local`, firewall, and TLS match how Node resolves the host.  
3. **Faust secret mismatch** — Regenerate or re-copy key in WordPress and redeploy env.  
4. **Wrong template** — WordPress **Settings → Reading** and Faust `wp-templates` mapping for `front-page` / `page` / `single`.  

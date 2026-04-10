# West Idaho Anesthesia — Headless WordPress + Next.js

Headless WordPress powers content over **WPGraphQL**; the public site is a **Next.js** app built with **Faust.js** (`@faustwp/core` v3). WordPress runs as the CMS; the frontend talks to it at build time and request time (SSR) via GraphQL.

## Project structure

```
west-idaho-anesthesia/
├── app/public/                 # WordPress (e.g. Local WP, or synced/deployed docroot)
│   └── wp-content/
├── frontend/                   # Next.js / Faust frontend (package: west-idaho-anesthesia-frontend)
│   ├── components/
│   ├── pages/                  # App routes + Faust API route
│   ├── wp-templates/           # WordPress template mappings (front-page, page, single, …)
│   └── styles/
├── scripts/
│   ├── setup-server.sh         # Ubuntu: nginx, MySQL, PHP-FPM, Node 20, PM2, site configs
│   ├── faust-set-frontend-url.sh
│   └── faust-update-frontend-uri.php
├── ACF_SETUP.md                # ACF + GraphQL setup for this project
└── SETUP_CHECKLIST.md          # WordPress + frontend setup checklist
```

## Stack

| Layer | Technology |
|--------|------------|
| CMS | WordPress + **Advanced Custom Fields Pro (ACF)** |
| API | **WPGraphQL** + **WPGraphQL for ACF** |
| Headless bridge | **FaustWP** plugin (secret key + frontend URL in WP) |
| Frontend | **Next.js 14**, **React 18**, **Faust** CLI (`faust dev` / `faust build` / `faust start`) |
| Styling | **Tailwind CSS**, **Sass**, Radix UI, Framer Motion |

**Node.js:** `>= 18` and **npm `>= 8`** (see `frontend/package.json` `engines`).

## Prerequisites

1. **Node.js** 18+ and npm  
2. **WordPress** with ACF Pro, WPGraphQL, WPGraphQL for ACF, and FaustWP (Local by Flywheel, `app/public`, or a remote docroot)  
3. In WordPress: **Settings → Headless** (Faust): set the front-end URL and copy the **secret key** for `FAUST_SECRET_KEY`.

## Environment variables

Create **`frontend/.env.local`** for local work (not committed). Typical keys:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_WORDPRESS_URL` | Base URL of WordPress as the browser and Node should reach it (no trailing path), e.g. `http://west-idaho-anesthesia.local` for Local. |
| `FAUST_SECRET_KEY` | Same value as WordPress → Faust → secret key. |

The repo may also use:

- **`frontend/.env.development`** — loaded in development (`npm run dev`); often sets `NEXT_PUBLIC_WORDPRESS_URL` for your Local hostname.  
- **`frontend/.env.production`** — used for production builds when present; set `NEXT_PUBLIC_WORDPRESS_URL` to your deployed WordPress URL (`http://` or `https://` depending on TLS).

Faust/Next merge these with `.env.local` according to Next.js rules; **secrets belong in `.env.local` or CI**, not in tracked production files.

## Quick start (frontend)

```bash
cd frontend
npm install
# Create .env.local with NEXT_PUBLIC_WORDPRESS_URL and FAUST_SECRET_KEY
npm run generate    # refresh GraphQL possible types → possibleTypes.json
npm run dev
```

Open **http://localhost:3000**.

### Useful scripts (`frontend/package.json`)

| Script | Command |
|--------|---------|
| Dev | `npm run dev` → `faust dev` |
| Build | `npm run build` → `faust build` |
| Start | `npm run start` → `faust start` |
| GraphQL types | `npm run generate` → `faust generatePossibleTypes` |
| Global stylesheet | `npm run stylesheet` → `faust generateGlobalStylesheet` |

## Routes (overview)

- **`/`** — WordPress **front page** via Faust (`wp-templates/front-page`, `pages/index.js` + `WordPressTemplate`).  
- **WordPress-driven URLs** — `pages/[...wordpressNode].js` resolves CMS routes.  
- **Custom pages** (examples): `/services`, `/meet-the-team`, `/contact`, `/blog`, `/patient-portal`, `/online-bill-pay`.  
- **Preview** — `/preview` for draft/preview flows.  
- **Faust API** — `pages/api/faust/[[...route]].js`.

## GraphQL

Use **GraphiQL** in wp-admin (**GraphQL** menu) to test queries. Example:

```graphql
query GetPage {
  page(id: "contact", idType: URI) {
    title
    content
  }
}
```

## Production server (DigitalOcean-style)

`scripts/setup-server.sh` (run as **root** on Ubuntu 22.04/24.04) installs **nginx**, **MySQL**, **PHP-FPM**, **Node.js 20**, **PM2**, creates a MySQL DB/user, and configures:

- **WordPress** — nginx `default_server` on **port 80**, docroot `WP_ROOT` (default `/var/www/wordpress`).  
- **Next.js** — reverse proxy on **port 8080** → `127.0.0.1:3000` (PM2); you can also hit **:3000** directly while testing.

Optional env for the script: `WP_ROOT`, `FRONTEND_ROOT` (default `/var/www/west-idaho-anesthesia`), `WP_DB_NAME`, `WP_DB_USER`, `WP_DB_PASS`, `INSTALL_WP_CLI=1`.

After setup, build and run the frontend from the repo path, e.g.:

```bash
cd /var/www/west-idaho-anesthesia/frontend
npm ci
npm run build -- --skip-health-checks
pm2 start npm --name wia-frontend -- start
pm2 save
```

Set **`NEXT_PUBLIC_WORDPRESS_URL`** so SSR from Node can reach WordPress (often the droplet’s WordPress URL on port 80, not the `:8080` Next URL).

## GitHub Actions deploy

Workflow: **`.github/workflows/deploy.yml`** — on push to `main` (paths under `frontend/` or the workflow), SSH to the server, `git pull`, write **`frontend/.env.local`** from secrets/vars, `npm ci`, `npm run build -- --skip-health-checks`, **PM2** process name **`wia-frontend`**.

**Secrets:** `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`, `FAUST_SECRET_KEY`  
**Variables:** `DEPLOY_PATH` (default `/var/www/west-idaho-anesthesia`), `NEXT_PUBLIC_WORDPRESS_URL` (WordPress base URL; must not be the Faust frontend-only URL if that differs)

## Documentation in repo

- **[ACF_SETUP.md](./ACF_SETUP.md)** — ACF and GraphQL setup  
- **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** — setup checklist  
- **[frontend/README.md](./frontend/README.md)** — frontend-specific commands and config pointers

## Resources

- [Faust.js](https://faustjs.org)  
- [WPGraphQL](https://www.wpgraphql.com)  
- [Advanced Custom Fields](https://www.advancedcustomfields.com/resources)

## License

Private project for West Idaho Anesthesia.

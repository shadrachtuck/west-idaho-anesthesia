# West Idaho Anesthesia — frontend

Next.js application powered by **Faust.js** (`@faustwp/core`). It consumes the WordPress **WPGraphQL** endpoint configured for this project.

For stack overview, environment variables, deployment, and server setup, see the **[repository README](../README.md)** in the project root.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development (`faust dev`) |
| `npm run build` | Production build (`faust build`) |
| `npm run start` | Run production server (`faust start`) |
| `npm run generate` | Regenerate GraphQL `possibleTypes.json` |

## Configuration

- **`faust.config.js`** — Faust templates and `possibleTypes`  
- **`next.config.js`** — Faust wrapper, images, i18n, security headers, redirects  

Local and production WordPress URLs are set via **`.env.local`**, **`.env.development`**, and **`.env.production`** (see root README).

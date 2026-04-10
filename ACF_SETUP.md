# ACF setup — West Idaho Anesthesia

This guide covers **Advanced Custom Fields Pro (ACF)** and GraphQL for the West Idaho Anesthesia headless WordPress + Next.js site.

## Prerequisites

1. Install and activate:

   - **Advanced Custom Fields Pro**
   - **WPGraphQL**
   - **WPGraphQL for Advanced Custom Fields** — [wp-graphql/wp-graphql-acf](https://github.com/wp-graphql/wp-graphql-acf)

2. In WordPress Admin, open **GraphQL → Settings** and enable:

   - **Enable GraphQL Debug Mode** (useful while developing)
   - **Enable Public Introspection** (needed for schema tools and Faust `generate`)

## Optional: custom post types

Use **ACF → Post Types** only if content is easier to model as a CPT than as pages. Examples:

| Idea | Post type key | Show in GraphQL |
|------|----------------|-----------------|
| Team members | `team_member` | Yes |
| Office / location | `location` | Yes |

For each CPT, add an ACF field group with **Show in GraphQL** enabled and a stable **GraphQL Field Name** (e.g. `teamMemberFields`).

## Optional: field groups on pages

1. Go to **Custom Fields → Field Groups → Add New**.
2. Set **Location** to the templates you need (e.g. **Page Template** or **Page** with a specific slug).
3. Add fields (text, WYSIWYG, repeater for hero slides, etc.).
4. Enable **Show in GraphQL** and set field names that are safe for GraphQL.

## Content: pages and posts

- Set **Settings → Reading** so the desired page is the **homepage** (matches Faust `front-page` template).
- Create or edit pages for content that should be managed in WordPress (e.g. service copy, policy pages).
- Use **Posts** for news or blog content if the site exposes a blog.

## Faust (Headless)

- **Settings → Headless**: set **Front-end site URL** to your Next URL (local: `http://localhost:3000`; production: your public Faust URL).
- Copy the **Secret Key** into `FAUST_SECRET_KEY` in `frontend/.env.local` (and CI secrets).

## Verify GraphQL

1. Open **GraphQL → GraphiQL IDE** in wp-admin.
2. Run a simple query:

```graphql
query TestPages {
  generalSettings {
    title
  }
}
```

3. If you added ACF fields with GraphQL enabled, introspect or query them by the names shown in the schema.

## Troubleshooting

- **ACF fields missing in GraphQL** — Confirm **WPGraphQL for ACF** is active; check each field group’s GraphQL settings; clear caches.
- **Empty or wrong page** — Confirm the page is published and slugs/URIs match what the frontend queries.
- **Faust preview/auth issues** — Confirm `FAUST_SECRET_KEY` matches WordPress and `NEXT_PUBLIC_WORDPRESS_URL` is the WordPress base URL the server can reach.

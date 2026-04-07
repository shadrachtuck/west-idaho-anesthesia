# Mowby Wines Setup Checklist

Use this checklist to ensure everything is set up correctly.

## WordPress Setup

### Plugins Installation
- [ ] Install and activate **Advanced Custom Fields (ACF)**
- [ ] Install and activate **WPGraphQL**
- [ ] Install and activate **WPGraphQL for Advanced Custom Fields** (from GitHub)
- [ ] (Optional) Install and activate **Faust** plugin

### GraphQL Configuration
- [ ] Go to `GraphQL > Settings` in WordPress Admin
- [ ] Enable "Enable GraphQL Debug Mode"
- [ ] Enable "Enable Public Introspection"
- [ ] Click "Save Changes"

### Custom Post Type Setup (Optional - for Wine Products)
- [ ] Go to `ACF > Post Types`
- [ ] Create new post type: "Wines"
  - Post Type Key: `wine`
  - Plural Label: `Wines`
  - Singular Label: `Wine`
  - Show in GraphQL: ✅ Yes
  - Supports: Title, Editor, Featured Image, Custom Fields

### ACF Field Group Setup (for Wines, if using)
- [ ] Create field group: "Wine Fields"
- [ ] Set location rule: `Post Type` is equal to `Wine`
- [ ] Add fields for wine details (varietal, vintage, description, etc.)
- [ ] Enable "Show in GraphQL" with field name `wineFields`

### Content Setup
- [ ] Create "About" page in `Pages > Add New`
  - Title: "About"
  - Slug: "about"
  - Add winemaker story and First Crush content
  - Publish
- [ ] Create "Shop" page (or rely on frontend `/shop` route)
- [ ] Create "Contact" page
- [ ] Create "Blog" page or use Posts for blog content

### Faust Configuration (if using Faust plugin)
- [ ] Go to `Settings > Headless`
- [ ] Set "Front-end site URL" to `http://localhost:3000`
- [ ] Copy the "Secret Key"
- [ ] Note your WordPress site URL

## Frontend Setup

### Environment Configuration
- [ ] Navigate to `frontend/` directory
- [ ] Copy `.env.local.sample` to `.env.local`
- [ ] Edit `.env.local`:
  - [ ] Set `NEXT_PUBLIC_WORDPRESS_URL` to your WordPress URL
  - [ ] Set `FAUST_SECRET_KEY` to the key from WordPress Settings > Headless

### Install Dependencies
- [ ] Run `npm install` in the `frontend/` directory
- [ ] Verify no errors

### Generate GraphQL Types
- [ ] Run `npm run generate` to generate possible types
- [ ] Verify `possibleTypes.json` is updated

### Test Development Server
- [ ] Run `npm run dev`
- [ ] Visit `http://localhost:3000`
- [ ] Verify homepage loads with wine bottle animation
- [ ] Test `/about` page
- [ ] Test `/shop` page - reservation form
- [ ] Test `/contact` page
- [ ] Test `/blog` page

## Verification Checklist

### Homepage
- [ ] Wine bottle animation and hero display
- [ ] "Reserve a Bottle" / Shop link works
- [ ] Links to About, Shop, Contact, Blog work

### About Page (`/about`)
- [ ] Page displays content from WordPress "About" page or static content

### Shop Page (`/shop`)
- [ ] Reservation form displays
- [ ] Form submission works (localStorage for demo)

### Contact Page (`/contact`)
- [ ] Contact form displays
- [ ] Form submission works

### Blog Page (`/blog`)
- [ ] Wine journal / blog posts display

### Navigation
- [ ] Header navigation works (Home, About, Shop, Blog, Contact)
- [ ] Footer navigation works
- [ ] All internal links work

## Troubleshooting

1. **GraphQL errors**
   - Verify WPGraphQL for ACF plugin is active
   - Check field group GraphQL settings
   - Clear any caching

2. **Frontend not connecting to WordPress**
   - Verify `.env.local` has correct WordPress URL
   - Check WordPress URL is accessible
   - Verify Faust secret key is correct

3. **Pages not loading**
   - Check Next.js/Faust routing
   - Verify pages exist in WordPress for dynamic content

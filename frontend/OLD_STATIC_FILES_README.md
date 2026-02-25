# Old Static Files Archive

This folder contains the original static HTML, CSS, and JS files that were used before the migration to React + Tailwind.

## Migration Summary

The website has been successfully migrated from static HTML/CSS to **React + Tailwind CSS** for improved:
- **Efficiency**: Faster development with component reusability
- **Scalability**: Easy to add new features and pages
- **Maintainability**: Cleaner code structure with separated components

## Original Files Location

The original static files are located in:
- `src/pages/*.html` - Original HTML pages
- `src/pages/css/*.css` - Original CSS stylesheets
- `src/pages/js/*.js` - Original JavaScript files
- `src/pages/images/` - All images (now moved to `public/images/`)
- `src/pages/documents/` - All PDF documents (now moved to `public/documents/`)

## New Project Structure

```
src/
├── components/          # Reusable React components
│   ├── contacts/
│   ├── gallery/
│   ├── home/
│   ├── instructors/
│   ├── layout/          # Header, Footer
│   ├── ui/             # Shared UI components
│   └── values/
├── pages/               # Page components
│   ├── Home.jsx
│   ├── Values.jsx
│   ├── Instructors.jsx
│   ├── Gallery.jsx
│   ├── Regulations.jsx
│   └── Contacts.jsx
├── App.jsx             # Main app with routing
└── index.css           # Tailwind imports

public/
├── images/             # All images (organized)
└── documents/          # All PDF documents
```

## Design Preserved

All original design elements have been preserved:
- ✅ Colors: #007BFF (electric blue), #0056b3 (dark blue), #C0C0C0 (silver), etc.
- ✅ Fonts: Segoe UI / Roboto
- ✅ Gradients and backgrounds
- ✅ All images and icons
- ✅ All PDF documents
- ✅ Layout structure

## Running the Project

```
bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

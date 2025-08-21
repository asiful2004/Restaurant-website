# Bella Vista Restaurant Website

## Overview

This is a static website for Bella Vista Restaurant, a fine dining establishment. The website serves as a digital storefront showcasing the restaurant's brand, menu, location, and contact information. Built with vanilla HTML, CSS, and JavaScript, it provides a clean, responsive design focused on elegant presentation and user experience. The site includes multiple pages for home, menu, about, contact, and location information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static Multi-Page Application**: Built using vanilla HTML5, CSS3, and JavaScript
- **Responsive Design**: Mobile-first approach with CSS media queries for cross-device compatibility
- **Component-Based Structure**: Consistent navigation header across all pages with active state management
- **Typography System**: Uses Google Fonts (Playfair Display for headings, Inter for body text) to establish visual hierarchy
- **CSS Organization**: Single stylesheet approach with modular CSS structure for maintainability

### Page Structure
- **Navigation System**: Consistent navbar with hamburger menu for mobile devices
- **Page Templates**: Standardized layout with page headers and content sections
- **Image Strategy**: Placeholder structure for local images with fallback to external CDN sources
- **Interactive Elements**: JavaScript-powered mobile navigation toggle and form validation

### Design Pattern Decisions
- **Static Site Approach**: Chosen for simplicity, fast loading, and easy hosting without server requirements
- **CSS Grid/Flexbox Layout**: Modern CSS layout techniques for responsive design
- **Progressive Enhancement**: Base functionality works without JavaScript, enhanced with interactive features
- **Semantic HTML**: Proper HTML5 semantic elements for accessibility and SEO

### File Organization
- **Separation of Concerns**: HTML structure, CSS styling, and JavaScript behavior kept in separate files
- **Asset Management**: Dedicated directories for CSS, JavaScript, and images
- **Consistent Naming**: Clear, descriptive file and class naming conventions

## External Dependencies

### CDN Resources
- **Font Awesome 6.0.0**: Icon library for UI elements and visual enhancements
- **Google Fonts**: Typography system using Playfair Display and Inter font families
- **External Images**: Currently configured to use Pixabay CDN for demonstration images

### Browser Requirements
- **Modern Browser Support**: Targets browsers with ES6+ support
- **CSS3 Features**: Requires support for Flexbox, CSS Grid, and CSS custom properties
- **Responsive Design**: Viewport meta tag and media query support needed

### Hosting Considerations
- **Static Hosting Compatible**: Can be deployed on any static hosting service (GitHub Pages, Netlify, Vercel)
- **No Server Requirements**: Pure client-side application with no backend dependencies
- **CDN Optimization**: External resources loaded from CDNs for improved performance
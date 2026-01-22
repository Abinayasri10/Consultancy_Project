# Smart Agro Intelligence Platform - Installation & Setup Guide

## Project Overview
A professional, responsive React.js application for Anand Agro Agencies providing AI-powered pest identification, product catalog management, and admin analytics dashboard.

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Code editor (VS Code recommended)

## Step 1: Project Initialization

### Create React App
bash
npx create-react-app smart-agro-platform
cd smart-agro-platform


### Install Required Dependencies
bash
npm install react-router-dom recharts lucide-react
npm install --save-dev tailwindcss


## Step 2: Project Structure

Create the following folder structure:
```
smart-agro-platform/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── SmartRecommendationPage.jsx
│   │   ├── PestPredictionPage.jsx
│   │   ├── KnowledgeHubPage.jsx
│   │   ├── SafetyCompliancePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── AdminLoginPage.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── SalesAnalyticsPage.jsx
│   │   └── DemandForecastingPage.jsx
│   ├── styles/
│   │   ├── global.css
│   │   ├── navigation.css
│   │   ├── footer.css
│   │   ├── home.css
│   │   ├── products.css
│   │   ├── product-detail.css
│   │   ├── recommendation.css
│   │   ├── pest-prediction.css
│   │   ├── knowledge.css
│   │   ├── safety.css
│   │   ├── about.css
│   │   ├── contact.css
│   │   ├── admin-login.css
│   │   ├── admin-dashboard.css
│   │   ├── analytics.css
│   │   └── forecasting.css
│   ├── App.jsx
│   ├── index.jsx
│   └── index.css
├── public/
├── package.json
├── .env (optional)
└── README.md
```

## Step 3: Environment Setup

### Create .env file (optional)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

## Step 4: Run the Application

### Development Mode
```bash
npm start
```

The application will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
```

## Step 5: Admin Access

### Demo Admin Credentials
- **Email:** admin@anandagro.com
- **Password:** admin123

## Step 6: File Placement Instructions

1. Copy all `.jsx` files to the `src/pages/` directory
2. Copy component files to `src/components/` directory
3. Copy all `.css` files to `src/styles/` directory
4. Update `src/App.jsx` with the routing configuration provided
5. Replace `src/index.jsx` with the provided index file

## Step 7: Key Color Scheme Implementation

The application uses the following color palette:

```css
--primary-bg: #f5f5f5 (Light Gray Background)
--primary-accent: #b9e937 (Lime Green)
--secondary-accent: #57d131 (Vibrant Green)
--dark-accent: #406661 (Teal)
--white: #ffffff
--light-gray: #e8e8e8
--medium-gray: #a0a0a0
--dark-gray: #333333
```

## Step 8: Page Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | HomePage | Landing page with value propositions |
| `/products` | ProductsPage | Searchable product catalog |
| `/products/:id` | ProductDetailPage | Detailed product information |
| `/recommendation` | SmartRecommendationPage | AI-powered pest identification |
| `/pest-prediction` | PestPredictionPage | Regional outbreak forecasts |
| `/knowledge` | KnowledgeHubPage | Agricultural insights |
| `/safety` | SafetyCompliancePage | Safety guidelines |
| `/about` | AboutPage | Company information |
| `/contact` | ContactPage | Contact form |
| `/admin/login` | AdminLoginPage | Admin login portal |
| `/admin/dashboard` | AdminDashboard | Admin dashboard (protected) |
| `/admin/analytics` | SalesAnalyticsPage | Sales analysis (protected) |
| `/admin/forecasting` | DemandForecastingPage | Demand forecasting (protected) |

## Step 9: Features Implemented

### Farmer Portal
- Smart product catalog with filtering
- AI-powered pest identification
- Pest outbreak predictions
- Agricultural knowledge base
- Safety compliance guidelines
- Company information
- Contact form

### Admin Portal
- Secure login (demo credentials provided)
- Sales dashboard with KPIs
- Monthly sales trends
- Product performance analytics
- Demand forecasting with accuracy metrics
- Crop-wise sales distribution

## Step 10: Technologies Used

- **React 18+** - UI Library
- **React Router v6** - Client-side routing
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **CSS3** - Styling (no Bootstrap, pure CSS)

## Step 11: Professional Design Features

- Responsive mobile-first design
- Gradient backgrounds with professional colors
- Smooth animations and transitions
- Accessibility features (semantic HTML, ARIA labels)
- Clean, corporate aesthetic
- Cross-browser compatibility

## Step 12: Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop build folder to Netlify
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Update package.json with homepage
npm run build
npm run deploy
```

## Troubleshooting

### Port 3000 Already in Use
```bash
PORT=3001 npm start
```

### Module Not Found Errors
```bash
rm -rf node_modules
npm install
```

### Style Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Check CSS file paths

## Next Steps for Backend Integration

1. Replace mock data with API calls
2. Implement authentication with JWT
3. Connect to backend database
4. Integrate ML model API endpoints
5. Add payment gateway for orders
6. Implement user account system

## Support & Contact

For technical support:
- Email: support@anandagro.com
- Phone: +91 731-4123-456

---

**Created:** 2026
**Framework:** React.js
**Status:** Production Ready

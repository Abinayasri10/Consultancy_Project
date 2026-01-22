# Smart Agro Intelligence Platform - Setup Guide

## Project Overview
A comprehensive web-based agricultural platform combining React frontend with machine learning capabilities for pest identification, pesticide recommendations, and demand forecasting.

## Technology Stack
- **Frontend**: React.js + Tailwind CSS
- **Components**: Lucide Icons + Recharts for visualizations
- **ML Models**: Scikit-learn, ARIMA, LSTM
- **Routing**: React Router v6

## Installation Steps

### 1. Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Python 3.8+ (for ML model training)

### 2. Frontend Setup

```bash
# Navigate to project directory
cd smart-agro-platform

# Install dependencies
npm install

# Or with yarn
yarn install
```

### 3. Install Required Packages

```bash
# Core dependencies
npm install react-router-dom recharts lucide-react

# Development
npm install -D tailwindcss postcss autoprefixer
```

### 4. Configure Tailwind CSS

Create `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Create `postcss.config.js`:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 5. Project Structure

```
smart-agro-platform/
├── pages/
│   ├── admin/
│   │   ├── AdminLoginPage.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── SalesAnalyticsPage.jsx
│   │   └── DemandForecastingPage.jsx
│   └── public/
│       ├── HomePage.jsx
│       ├── ProductsPage.jsx
│       ├── ProductDetailPage.jsx
│       ├── SmartRecommendationPage.jsx
│       ├── PestPredictionPage.jsx
│       ├── KnowledgeHubPage.jsx
│       ├── SafetyCompliancePage.jsx
│       ├── AboutPage.jsx
│       └── ContactPage.jsx
├── components/
│   ├── Navigation.jsx
│   └── Footer.jsx
├── ml_models/
│   ├── train_pest_classifier.py
│   ├── train_demand_forecast.py
│   └── model_integration.py
├── app.jsx
└── index.css
```

### 6. Start Development Server

```bash
npm start
```

Server runs on `http://localhost:3000`

### 7. Admin Login Credentials (Demo)

```
Email: admin@anandagro.com
Password: admin123
```

## ML Models Setup

### Pest Identification Model

**Location**: `ml_models/train_pest_classifier.py`

```bash
# Install Python dependencies
pip install scikit-learn pandas numpy opencv-python

# Train the model
python ml_models/train_pest_classifier.py
```

The model uses:
- Input: Crop, growth stage, symptoms, location, season, weather data
- Output: Pest/disease identification + pesticide recommendation
- Algorithm: Random Forest or XGBoost
- Training data: Historical pest-crop-symptom combinations

### Demand Forecasting Model

**Location**: `ml_models/train_demand_forecast.py`

```bash
# Install forecasting libraries
pip install statsmodels tensorflow scikit-learn

# Train the model
python ml_models/train_demand_forecast.py
```

Features:
- ARIMA for seasonal trends
- LSTM for deep learning patterns
- Ensemble approach combining both models
- Input: Historical sales, weather, crop calendar, external factors
- Output: 6-month demand forecast with confidence intervals

### Model Integration

1. Convert trained models to JSON format
2. Load in React using TensorFlow.js
3. Run predictions client-side or via API

```javascript
// Example integration in SmartRecommendationPage.jsx
const runPestModel = async (input) => {
  const prediction = await fetch('/api/predict-pest', {
    method: 'POST',
    body: JSON.stringify(input)
  });
  return prediction.json();
};
```

## File Structure Explanation

### Public Pages (Farmer Portal)
- **HomePage**: Landing page with hero, features, and CTAs
- **ProductsPage**: Advanced filtering and product catalog
- **ProductDetailPage**: Detailed product info + dosage calculator
- **SmartRecommendationPage**: Core ML feature for pest identification
- **PestPredictionPage**: Early warning system with regional forecasts
- **KnowledgeHubPage**: Data-driven educational content
- **SafetyCompliancePage**: Regulations and first aid
- **AboutPage**: Company information and values
- **ContactPage**: Contact form and dealer inquiry

### Admin Pages
- **AdminLoginPage**: Secure authentication
- **AdminDashboard**: KPIs, sales trends, top products
- **SalesAnalyticsPage**: Revenue, customer segmentation, trends
- **DemandForecastingPage**: Predictions and reorder alerts

## Customization

### Color Scheme (Tailwind)
- Primary Background: `#F5F5F5` (bg-gray-50)
- Primary Accent: `#B9E937` (bg-lime-400)
- Secondary Accent: `#57D131` (bg-green-600)
- Dark Accent: `#406661` (bg-teal-700)

### Adding New Products
Edit `PRODUCTS_DATA` in `ProductsPage.jsx`

### Updating ML Models
Replace `.pkl` files in `ml_models/` directory and retrain

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Docker
```bash
docker build -t smart-agro .
docker run -p 3000:3000 smart-agro
```

## Troubleshooting

**Issue**: Models not loading
- **Solution**: Ensure Python environment is activated when training

**Issue**: Tailwind styles not applied
- **Solution**: Rebuild CSS with `npm run build:css`

**Issue**: Router not working
- **Solution**: Ensure BrowserRouter wraps entire app in index.js

## Support & Documentation

- Technical documentation: Refer to individual component files
- ML model details: See ml_models/ directory
- API endpoints: Backend integration guide (coming soon)

## Next Steps

1. Connect to backend API (Node.js + MongoDB)
2. Integrate payment gateway (Stripe) for product sales
3. Implement user authentication with JWT
4. Deploy ML models on cloud (AWS SageMaker, Google Cloud)
5. Set up real-time alerts system (WebSocket)
6. Add mobile app version (React Native)

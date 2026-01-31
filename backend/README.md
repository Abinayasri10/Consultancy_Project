# Smart Agro Platform - Backend API

This is the backend server for the Smart Agro Platform admin module, built with Express.js and MongoDB.

## Features

- Product Management API
- Inventory Tracking System
- Sales & Billing Management
- Supplier Management
- Analytics Dashboard Data
- Stock Alerts (Low Stock & Expiry)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-agro-platform
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
```

3. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/inventory/low-stock` - Get low stock products
- `GET /api/products/inventory/expiry-alerts` - Get expiry alerts

### Sales
- `GET /api/sales` - Get all sales
- `GET /api/sales/:id` - Get single sale
- `POST /api/sales` - Create sale
- `GET /api/sales/analytics/dashboard` - Get dashboard data

### Inventory
- `GET /api/inventory` - Get inventory transactions
- `POST /api/inventory/purchase` - Record purchase entry
- `POST /api/inventory/adjustment` - Record stock adjustment
- `GET /api/inventory/alerts/low-stock` - Get low stock alerts
- `GET /api/inventory/alerts/expiry` - Get expiry alerts

### Suppliers
- `GET /api/suppliers` - Get all suppliers
- `GET /api/suppliers/:id` - Get single supplier
- `POST /api/suppliers` - Create supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

## Database Setup

1. Create a MongoDB cluster on MongoDB Atlas
2. Update the `MONGODB_URI` in `.env` with your connection string
3. The application will automatically create collections on first run

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment mode (development/production)
- `JWT_SECRET` - JWT secret key for authentication
- `JWT_EXPIRE` - JWT expiration time

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Security Notes

- Always use environment variables for sensitive data
- Never commit `.env` file to version control
- Use HTTPS in production
- Implement proper authentication before deployment
- Validate all input data

## Future Enhancements

- User authentication with JWT
- Role-based access control
- File upload for product images
- Email notifications
- Advanced analytics
- Report generation

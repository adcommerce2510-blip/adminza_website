# Adminza Dashboard Backend Setup

## Overview

This project includes a complete backend setup for the Adminza dashboard with MongoDB integration and Cloudinary for image/video uploads.

## Features

- ✅ Next.js 14 API Routes
- ✅ MongoDB with Mongoose ODM
- ✅ Cloudinary integration for file uploads
- ✅ Product and Service management
- ✅ Image upload functionality
- ✅ CRUD operations for products and services

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/adminza?retryWrites=true&w=majority

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 2. MongoDB Setup

1. Create a MongoDB Atlas account at [mongodb.com](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string and replace the placeholders in `MONGODB_URI`
4. The database will be automatically created when you first add data

### 3. Cloudinary Setup

1. Create a Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name, API key, and API secret from the dashboard
3. Add them to your `.env.local` file

### 4. API Endpoints

#### Products

- `GET /api/products` - Get all products (with pagination and filtering)
- `POST /api/products` - Create a new product
- `GET /api/products/[id]` - Get a specific product
- `PUT /api/products/[id]` - Update a product
- `DELETE /api/products/[id]` - Delete a product

#### Services

- `GET /api/services` - Get all services (with pagination and filtering)
- `POST /api/services` - Create a new service
- `GET /api/services/[id]` - Get a specific service
- `PUT /api/services/[id]` - Update a service
- `DELETE /api/services/[id]` - Delete a service

#### File Upload

- `POST /api/upload` - Upload images to Cloudinary

### 5. Data Models

#### Product Model

```typescript
{
  name: string
  category: string
  price: number
  stock: number
  description: string
  images: string[]
  vendor: string
  status: 'Active' | 'Inactive' | 'Out of Stock'
  orders: number
  featured: boolean
  tags: string[]
  createdAt: Date
  updatedAt: Date
}
```

#### Service Model

```typescript
{
  name: string
  category: string
  price: number
  duration: string
  description: string
  location: string
  vendor: string
  status: 'Active' | 'Inactive'
  rating: number
  orders: number
  images: string[]
  features: string[]
  requirements: string[]
  createdAt: Date
  updatedAt: Date
}
```

## Usage

### Starting the Development Server

```bash
npm run dev
```

### Accessing the Dashboard

Visit `http://localhost:3000/dashboard` to access the admin dashboard.

### Adding Products/Services

1. Click "Add Product" or "Add Service" button
2. Fill in the required information
3. Upload images (optional)
4. Submit the form

### File Upload

- Images are automatically uploaded to Cloudinary
- Supported formats: JPG, PNG, GIF, WebP
- Files are stored in the 'adminza' folder on Cloudinary

## Database Collections

The MongoDB database will automatically create the following collections:

- `products` - Stores all product data
- `services` - Stores all service data

## Error Handling

All API endpoints include proper error handling and return structured responses:

```typescript
// Success response
{
  success: true,
  data: any,
  message?: string
}

// Error response
{
  success: false,
  error: string
}
```

## Security Notes

- Always keep your environment variables secure
- Never commit `.env.local` to version control
- Use proper authentication in production
- Validate all input data
- Implement rate limiting for API endpoints

## Dependencies

- `mongodb` - MongoDB driver
- `mongoose` - MongoDB ODM
- `cloudinary` - Cloudinary SDK
- `multer` - File upload handling
- `@types/multer` - TypeScript types for multer

## Next Steps

1. Add authentication and authorization
2. Implement user roles and permissions
3. Add email notifications
4. Implement search and filtering
5. Add analytics and reporting
6. Set up automated backups
7. Implement caching for better performance



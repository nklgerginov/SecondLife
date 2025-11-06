# SecondLife Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "1234567890"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Get Current User
**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

---

## Listings Endpoints

### Get All Listings
**GET** `/api/listings`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `category` (optional): Category ID
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `search` (optional): Search term

**Example:**
```
GET /api/listings?page=1&limit=20&category=1&minPrice=10&maxPrice=100&search=jacket
```

**Response (200):**
```json
{
  "listings": [
    {
      "id": 1,
      "title": "Vintage Denim Jacket",
      "description": "Classic vintage denim jacket",
      "price": "75.00",
      "size": "M",
      "brand": "Levi's",
      "images": ["http://localhost:5000/uploads/image-123.jpg"],
      "image": "http://localhost:5000/uploads/image-123.jpg",
      "location": "New York",
      "status": "active",
      "created_at": "2024-01-01T00:00:00.000Z",
      "category_name": "Denim",
      "category_slug": "denim",
      "seller_name": "John Doe"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

### Get New Listings
**GET** `/api/listings/new`

**Query Parameters:**
- `limit` (optional): Number of listings (default: 10)

**Response (200):**
```json
{
  "listings": [
    {
      "id": 1,
      "title": "Vintage Denim Jacket",
      "price": "75.00",
      "size": "M",
      "brand": "Levi's",
      "images": ["http://localhost:5000/uploads/image-123.jpg"],
      "image": "http://localhost:5000/uploads/image-123.jpg",
      "category_name": "Denim",
      "category_slug": "denim"
    }
  ]
}
```

### Search Listings
**GET** `/api/listings/search`

**Query Parameters:**
- `q` (required): Search query
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)

**Example:**
```
GET /api/listings/search?q=vintage%20jacket&page=1&limit=20
```

**Response (200):**
```json
{
  "listings": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 10,
    "totalPages": 1
  }
}
```

### Get Single Listing
**GET** `/api/listings/:id`

**Response (200):**
```json
{
  "id": 1,
  "title": "Vintage Denim Jacket",
  "description": "Classic vintage denim jacket",
  "price": "75.00",
  "size": "M",
  "brand": "Levi's",
  "images": ["http://localhost:5000/uploads/image-123.jpg"],
  "location": "New York",
  "status": "active",
  "created_at": "2024-01-01T00:00:00.000Z",
  "category_name": "Denim",
  "category_slug": "denim",
  "seller_id": 1,
  "seller_name": "John Doe",
  "seller_email": "user@example.com"
}
```

### Create Listing
**POST** `/api/listings`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `title` (required): Listing title
- `description` (optional): Listing description
- `price` (required): Price (number)
- `size` (optional): Size
- `brand` (optional): Brand name
- `categoryId` (optional): Category ID
- `condition` (optional): Item condition
- `location` (optional): Location
- `images` (optional): Image files (max 5)

**Response (201):**
```json
{
  "message": "Listing created successfully",
  "listing": {
    "id": 1,
    "user_id": 1,
    "title": "Vintage Denim Jacket",
    "price": "75.00",
    "images": ["http://localhost:5000/uploads/image-123.jpg"]
  }
}
```

### Update Listing
**PUT** `/api/listings/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:** (all fields optional)
- `title`: Listing title
- `description`: Listing description
- `price`: Price
- `size`: Size
- `brand`: Brand name
- `categoryId`: Category ID
- `condition`: Item condition
- `location`: Location
- `images`: New image files (max 5, adds to existing)

**Response (200):**
```json
{
  "message": "Listing updated successfully",
  "listing": {...}
}
```

### Delete Listing
**DELETE** `/api/listings/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Listing deleted successfully"
}
```

### Get User's Listings
**GET** `/api/listings/user/my-listings`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "listings": [
    {
      "id": 1,
      "title": "Vintage Denim Jacket",
      "price": "75.00",
      "status": "active",
      "category_name": "Denim"
    }
  ]
}
```

---

## Categories Endpoints

### Get All Categories
**GET** `/api/categories`

**Response (200):**
```json
{
  "categories": [
    {
      "id": 1,
      "name": "Dresses",
      "slug": "dresses",
      "created_at": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Outerwear",
      "slug": "outerwear",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Category by ID
**GET** `/api/categories/:id`

**Response (200):**
```json
{
  "category": {
    "id": 1,
    "name": "Dresses",
    "slug": "dresses",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Health Check

### Health Check
**GET** `/health`

**Response (200):**
```json
{
  "status": "ok",
  "message": "SecondLife API is running"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message"
}
```

**Status Codes:**
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (missing or invalid token)
- `403`: Forbidden (not authorized to perform action)
- `404`: Not Found
- `409`: Conflict (duplicate entry)
- `500`: Internal Server Error


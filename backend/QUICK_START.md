# Quick Start Guide - Rails Backend

## Prerequisites

- Ruby 3.2.0 or higher
- PostgreSQL (or Supabase account)
- Bundler gem

## Installation Steps

### 1. Install Dependencies

```bash
cd backend
bundle install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```env
# Supabase Database Configuration
SUPABASE_DB_HOST=your-supabase-host
SUPABASE_DB_PORT=5432
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-password

# Application Configuration
RAILS_ENV=development
SECRET_KEY_BASE=$(rails secret)
FRONTEND_URL=http://localhost:3000
API_HOST=http://localhost:3000

# JWT Configuration
JWT_SECRET=your-jwt-secret
```

### 3. Set Up Database

```bash
# Create database
rails db:create

# Run migrations
rails db:migrate

# Seed default categories
rails db:seed
```

### 4. Start the Server

```bash
rails server
```

The API will be available at `http://localhost:3000`

## API Base URL

All endpoints are prefixed with `/v1/ror` as specified in the requirements:

```
https://api.secondlife.com/v1/ror
```

Or locally:
```
http://localhost:3000/v1/ror
```

## Testing the API

### Health Check
```bash
curl http://localhost:3000/v1/ror/health
```

### Register User
```bash
curl -X POST http://localhost:3000/v1/ror/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "email": "test@example.com",
      "first_name": "Test",
      "last_name": "User"
    },
    "supabase_id": "test-id-123"
  }'
```

### Get Categories
```bash
curl http://localhost:3000/v1/ror/categories
```

## Notes

- Supabase handles user authentication
- The Rails API provides JWT tokens for API access
- Image uploads use Active Storage
- All endpoints return JSON responses

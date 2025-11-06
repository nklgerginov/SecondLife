# SecondLife Backend API (Ruby on Rails)

Backend API for the SecondLife e-commerce platform for second-hand clothing and fashion items.

## Technology Stack

- **Framework**: Ruby on Rails 7.0 (API mode)
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase (with JWT tokens for API access)
- **Image Storage**: Active Storage (local filesystem)

## Setup

### Prerequisites

- Ruby 3.2.0 or higher
- PostgreSQL (or Supabase account)
- Bundler gem

### Installation

1. **Install dependencies:**
```bash
cd backend
bundle install
```

2. **Configure environment variables:**

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
SECRET_KEY_BASE=your-secret-key-base
FRONTEND_URL=http://localhost:3000

# JWT Configuration
JWT_SECRET=your-jwt-secret
```

3. **Set up the database:**
```bash
rails db:create
rails db:migrate
rails db:seed  # Seeds default categories
```

4. **Start the server:**
```bash
rails server
```

The API will be available at `http://localhost:3000`

## API Endpoints

All endpoints are prefixed with `/v1/ror` as specified in the requirements.

### Health Check
- `GET /v1/ror/health` - Health check endpoint

### Authentication
- `POST /v1/ror/auth/register` - Register a new user
- `POST /v1/ror/auth/login` - Login user
- `GET /v1/ror/auth/me` - Get current user (requires authentication)

### Listings
- `GET /v1/ror/listings` - Get all listings (with pagination and filters)
- `GET /v1/ror/listings/new` - Get new listings
- `GET /v1/ror/listings/search?q=query` - Search listings
- `GET /v1/ror/listings/:id` - Get single listing
- `POST /v1/ror/listings` - Create new listing (requires authentication)
- `PUT /v1/ror/listings/:id` - Update listing (requires authentication, owner only)
- `DELETE /v1/ror/listings/:id` - Delete listing (requires authentication, owner only)
- `GET /v1/ror/listings/user/my-listings` - Get user's listings (requires authentication)

### Categories
- `GET /v1/ror/categories` - Get all categories
- `GET /v1/ror/categories/:id` - Get category by ID

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Database Schema

- **users**: User accounts (linked to Supabase)
- **categories**: Product categories (Dresses, Outerwear, Footwear, Denim, Accessories, Vintage)
- **listings**: Product listings
- **favorites**: User favorite listings

## Development

### Running Tests
```bash
rspec
```

### Database Migrations
```bash
rails db:migrate
rails db:rollback
```

### Console
```bash
rails console
```

## Production Deployment

1. Set all environment variables in production
2. Run migrations: `rails db:migrate RAILS_ENV=production`
3. Precompile assets if needed
4. Start server with Puma or your preferred server

## Notes

- Supabase handles user authentication. The Rails API provides JWT tokens for API access.
- Image uploads use Active Storage (configure for cloud storage in production)
- All endpoints return JSON responses
- CORS is configured to allow requests from the frontend URL

# SecondLife - A Second-hand Marketplace

SecondLife is a full-stack application that allows users to buy and sell second-hand items. It provides a platform for users to list items, browse different categories, and connect with sellers.

## Features

*   **User Authentication:** Secure user registration and login.
*   **Browse Listings:** View a paginated list of all available items.
*   **Search and Filter:** Search for specific items and filter them by category.
*   **View Item Details:** See detailed information about each item, including images and descriptions.
*   **Create Listings:** Registered users can post new ads for items they want to sell.
*   **Favorites:** Users can mark items as favorites to view them later.
*   **Dashboard:** A personal dashboard for users to manage their listings and favorites.

## Tech Stack

### Backend

*   **Ruby on Rails:** A powerful and mature framework for building web applications.
*   **PostgreSQL:** A robust and reliable open-source relational database.
*   **Puma:** A fast and concurrent web server for Ruby applications.

### Frontend

*   **React:** A popular JavaScript library for building user interfaces.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **React Router:** For handling client-side routing.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Ruby
*   Rails
*   Node.js
*   Yarn or npm

### Backend Setup

1.  **Clone the repo:**
    ```sh
    git clone https://github.com/your_username/SecondLife.git
    ```
2.  **Navigate to the backend directory:**
    ```sh
    cd SecondLife/backend
    ```
3.  **Install dependencies:**
    ```sh
    bundle install
    ```
4.  **Set up the database:**
    ```sh
    rails db:create
    rails db:migrate
    rails db:seed
    ```
5.  **Start the server:**
    ```sh
    rails s
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```sh
    cd ../frontend
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    ```
3.  **Start the development server:**
    ```sh
    npm start
    ```

## API Documentation

The API documentation can be found in the `backend/API_DOCUMENTATION.md` file. It provides detailed information about the available endpoints, request parameters, and response formats.

## Folder Structure

The project is organized into two main directories: `frontend` and `backend`.

*   **`backend/`**: Contains the Ruby on Rails application, including the API controllers, models, and database configuration.
*   **`frontend/`**: Contains the React application, including the UI components, pages, and services for interacting with the API.


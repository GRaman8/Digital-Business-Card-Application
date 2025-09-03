# Digital Business Card Application

This is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows an administrator to create, manage, and display digital business cards. It features a public-facing view for users and a secure, protected dashboard for all administrative tasks.

## Core Features

### Public User Features
- **View All Cards:** Visitors can view a list of all created business cards.
- **View Individual Cards:** Visitors can navigate to a specific URL to see the details of a single card.
- **Responsive Design:** The layout is designed to be user-friendly on both desktop and mobile devices.

### Admin Features
- **Secure Authentication:** Admin routes are protected using JSON Web Tokens (JWT). Admins must sign up with a secret key and then sign in to access the dashboard.
- **Admin Dashboard:** A central view for admins to see all cards with management options.
- **Full CRUD Functionality:**
    - **Create:** Add new business cards via a dedicated form.
    - **Read:** View all cards on the dashboard.
    - **Update:** Edit the details of any existing card on a dedicated edit page.
    - **Delete:**
        - Delete an entire business card.
        - Delete a specific interest from a card's interest list.
        - Delete optional fields (like a Twitter link) from a card.
- **Collapsible Card View:** Admins can expand or collapse cards on the dashboard to reduce clutter.

## Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **Validation:** Zod for robust schema validation
- **Environment Variables:** `dotenv`

### Frontend
- **Framework:** React
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Styling:** CSS (Global Stylesheets and CSS Modules)

## API Endpoints

All admin routes require a `Bearer` token in the `Authorization` header.

| Method   | Endpoint                           | Description                               | Protected |
|----------|------------------------------------|-------------------------------------------|-----------|
| **POST** | `/admin/signup`                    | Create a new admin account (requires admin key). | No        |
| **POST** | `/admin/signin`                    | Log in as an admin to receive a JWT.        | No        |
| **GET** | `/users/cards`                     | Get a list of all business cards.         | No        |
| **GET** | `/users/cards/:cardId`             | Get a single business card by its ID.     | No        |
| **GET** | `/admin/cards`                     | Get all cards (for admin dashboard).      | Yes       |
| **GET** | `/admin/cards/:cardId`             | Get a single card's data (for admin dashboard). | Yes       |
| **POST** | `/admin/card`                      | Create a new business card.               | Yes       |
| **PUT** | `/admin/cards/:cardId`             | Update an existing card.                  | Yes       |
| **DELETE**| `/admin/cards/:cardId`            | Delete an entire card.                    | Yes       |
| **DELETE**| `/admin/cards/:cardId/interests`  | Delete a specific interest from a card.   | Yes       |
| **DELETE**| `/admin/cards/:cardId/fields`     | Delete a specific field from a card.      | Yes       |


## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js and npm installed
- MongoDB instance (local or a cloud service like MongoDB Atlas)

### Backend Setup

1.  **Clone the repository:**
    ```sh
    git clone <your-repo-url>
    cd <project-folder>/Backend
    ```
2.  **Install NPM packages:**
    ```sh
    npm install
    ```
3.  **Create a `.env` file** in the `Backend` root directory and add the following environment variables:
    ```env
    MONGO_URI="your_mongodb_connection_string"
    JWT_SECRET="your_secret_for_jwt"
    ADMIN_SIGNUP_KEY="your_secret_key_for_admin_signup"
    ```
4.  **Run the server:**
    ```sh
    npm run dev
    ```
    The server will be running on `http://localhost:3000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```sh
    cd <project-folder>/Frontend
    ```
2.  **Install NPM packages:**
    ```sh
    npm install
    ```
3.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.


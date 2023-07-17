# Ecommerce Project - MERN Stack with Admin Panel

This is a full-stack ecommerce project built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It includes both user and admin features and incorporates various libraries and tools for efficient development and functionality.

## Deployment

- The deployed user-side can be accessed [here](https://parth-mern-ecommerce1.vercel.app/).
- The deployed admin-side can be accessed [here](https://parth-mern-ecommerce-admin.vercel.app/).

## Features

### User Features

- **Sorting**: Users can sort products based on different criteria such as price, popularity, etc.
- **Filtering**: Users can filter products based on categories, brands, and other relevant attributes.
- **Pagination**: Products are displayed in a paginated manner to enhance the browsing experience.
- **Stripe Payments**: Integration with the Stripe payment gateway to facilitate secure online payments.
- **Reset Password**: Users can reset their passwords in case they forget or want to change them.
- **Order History**: Users can view their order history and track the status of their orders.
- **Order Email**: Users receive email notifications regarding their orders, keeping them informed.
- **Cart**: Users can add products to their cart, modify quantities, and proceed to checkout.
- **Sign In/Sign Up**: Users can create an account or sign in using their credentials.
- **Sign Out**: Users can sign out of their accounts to ensure security.

### Admin Features

- **Products CRUD**: Admins have full control over managing products, including creating, reading, updating, and deleting them.
- **Brand Add and Delete**: Admins can add new brands and delete existing ones.
- **Category Add and Delete**: Admins can add new categories and delete existing ones.
- **Pagination**: Admin interface supports pagination for efficient management of large datasets.
- **Order Details**: Admins can view and manage order details, including customer information and status updates.
- **Update Order Status**: Admins can update the status of orders, such as processing, shipped, delivered, etc.
- **Sign In/Sign Out**: Admins can sign in to the admin panel using their credentials and sign out when finished.

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **State Management**: Redux Toolkit - Async Thunk
- **Routing**: React Router v6
- **API Operations**: Axios
- **Frontend Testing**: JSON-server
- **Form Validation**: React Hook Form Library
- **Alert Messages**: React Alert Library
- **Backend**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose v7
- **Authentication**: PassportJS
- **Emails**: NodeMailer
- **Payment Gateway**: Stripe

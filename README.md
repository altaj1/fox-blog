# Fox Blog Platform

A robust backend system for a blogging platform, designed to allow users to create, update, and manage their blogs. The system includes role-based access control, authentication, and a public API for blog viewing with search, sort, and filter functionalities.

## 🚀 Features

### User Roles
- **Admin**:
  - Created manually in the database with predefined credentials.
  - Can delete any blog and block any user.
  - Cannot update any blog.
- **User**:
  - Can register and log in.
  - Can create, update, and delete their own blogs.
  - Cannot perform admin actions.

### Authentication & Authorization
- **Authentication**:
  - Required for performing write, update, and delete operations.
- **Authorization**:
  - Differentiates between Admin and User roles for secured access.

### Blog API
- Public API for reading blogs, supporting:
  - Search by title or content.
  - Sort by specific fields (e.g., `createdAt` or `title`) in ascending/descending order.
  - Filter by author ID.

### Error Handling
- Handles various types of errors such as validation errors, authentication errors, and internal server errors.
- Consistent error response format for easier debugging.

## 🛠️ Technologies Used

- **TypeScript**: For strong type safety.
- **Node.js**: Backend runtime environment.
- **Express.js**: Framework for building the REST API.
- **MongoDB** with **Mongoose**: Database and ODM for managing data.

## 📦 Url

### Server Live Link
- **vercel**: https://fox-blog-server.vercel.app/
- **GitHub**: https://github.com/altaj1/fox-blog/new/main

# Job Portal Backend 🚀

A robust, enterprise-grade backend for a Job Portal application built with **Node.js**, **Express.js**, and **MongoDB**. This project provides a complete set of APIs for managing job postings, user profiles (Applicants & Employers), and job applications.

## 🌟 Features

### 🔐 Authentication & Security
- **Dual User Roles**: Targeted flows for `Applicant` and `Employer`.
- **JWT Authentication**: Secure API access using JSON Web Tokens.
- **Password Hashing**: Industry-standard security using `bcryptjs`.
- **Validation**: Strict input validation using `express-validator`.

### 💼 Job Management
- **CRUD Operations**: Employers can create, read, update, and delete job postings.
- **Job Search**: Public endpoints for searching jobs by role, location, or mode.
- **Saved Jobs**: Applicants can save jobs for later review.

### 👤 Profile Management
- **Applicant Profiles**: Manage personal details, skills, qualifications, and experience.
- **Company Profiles**: Employers can manage company descriptions and logos.
- **File Uploads**: Handles profile images and resumes seamlessly via `multer`.

### 📄 Application Tracking
- **Easy Apply**: Applicants can apply to jobs with a resume upload.
- **Status Management**: Employers can accept or reject applications.
- **Live Tracking**: Applicants can monitor the status of their applications.

### 📚 API Documentation
- **Swagger UI**: Interactive and modular documentation available at `/api-docs`.
- **OpenAPI 3.0**: Fully compliant specification for easy integration.

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Documentation**: [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express)
- **File Handling**: [Multer](https://github.com/expressjs/multer) & [Cloudinary](https://cloudinary.com/)
- **Security**: [JWT](https://jwt.io/), [Bcryptjs](https://github.com/dcodeIO/bcrypt.js)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB installed locally or an [Atlas](https://www.mongodb.com/cloud/atlas) cluster.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dDeepak26/Job-Portal-Backend.git
   cd Job-Portal-Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   The project uses environment variables for configuration. A template file `example.env` is provided. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=8080
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET_KEY=your_secret_key
   GOOGLE_APP_PASSWORD=your_google_app_password
   EMAIL_USER=your_email_address
   RECIPIENT_MAIL=your_recipient_email_address
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   The server will start on `http://localhost:8080`.

---

## 📖 API Documentation

The project includes built-in interactive documentation powered by Swagger.

- **URL**: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

Our documentation is organized into modular sections:
- **Authentication**: Login and Register endpoints.
- **Company Profile**: Employer profile management.
- **Applicant Profile**: Applicant personal data and resume.
- **Jobs**: Job creation, search, and details.
- **Applications**: Application submission and status tracking.

---

## 📂 Project Structure

```text
Job-Portal-Backend/
├── config/             # Database and Swagger configurations
├── controller/         # Business logic for API endpoints
├── docs/               # Modular Swagger documentation
├── middleware/         # Auth and File upload middlewares
├── model/              # MongoDB/Mongoose schemas
├── routes/             # Express route definitions
├── uploads/            # Local storage for images and resumes
├── utils/              # Validators and helper functions
├── .env                # Environment variables (Git-ignored)
├── server.js           # Entry point
└── package.json        # Project metadata and dependencies
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **ISC License**.

---

Developed with ❤️ by [Deepak](https://github.com/dDeepak26)
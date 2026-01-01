const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Job Portal API Documentation",
            version: "1.0.0",
            description:
                "Comprehensive API documentation for the Job Portal Backend application. This API provides endpoints for user authentication, company profiles, applicant profiles, job management, and job applications.",
            contact: {
                name: "API Support",
                email: "support@jobportal.com",
            },
            license: {
                name: "ISC",
                url: "https://opensource.org/licenses/ISC",
            },
        },
        servers: [
            {
                url: "http://localhost:8080",
                description: "Development server",
            },
            {
                url: "https://api.jobportal.com",
                description: "Production server",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description:
                        "Enter your JWT token in the format: Bearer <token>",
                },
            },
        },
        security: [],
        tags: [
            {
                name: "Authentication",
                description: "User authentication and registration endpoints",
            },
            {
                name: "Company Profile",
                description: "Employer company profile management endpoints",
            },
            {
                name: "Applicant Profile",
                description: "Applicant profile and resume management endpoints",
            },
            {
                name: "Jobs",
                description: "Job posting and management endpoints",
            },
            {
                name: "Applications",
                description: "Job application management endpoints",
            },
        ],
    },
    apis: ["./docs/swagger/*.swagger.js", "./config/swagger.schemas.js"], // Scan dedicated Swagger documentation files and schemas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

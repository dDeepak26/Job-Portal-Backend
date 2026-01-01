/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegistration:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *         - role
 *       properties:
 *         fullName:
 *           type: string
 *           description: Full name of the user
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: Email address
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           format: password
 *           minLength: 6
 *           description: Password (minimum 6 characters)
 *           example: SecurePassword123
 *         role:
 *           type: string
 *           enum: [applicant, employer]
 *           description: User role
 *           example: applicant
 *
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email address
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *           example: SecurePassword123
 *
 *     ApplicantUser:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Applicant ID
 *           example: 507f1f77bcf86cd799439011
 *         fullName:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *         role:
 *           type: string
 *           example: applicant
 *         aImage:
 *           type: string
 *           description: Profile image URL
 *           example: http://localhost:8080/uploads/ApplicantProfile/image.jpg
 *         aAbout:
 *           type: string
 *           description: About/bio section
 *           example: Experienced software developer
 *         aQualifications:
 *           type: string
 *           description: Educational qualifications
 *           example: Bachelor's in Computer Science
 *         aExperience:
 *           type: string
 *           description: Work experience
 *           example: 3 years
 *         aLocation:
 *           type: string
 *           description: Current location
 *           example: New York, USA
 *         aSkills:
 *           type: string
 *           description: Comma-separated skills
 *           example: JavaScript, React, Node.js
 *         resumeUrl:
 *           type: string
 *           description: Resume file URL
 *           example: http://localhost:8080/uploads/Resumes/resume.pdf
 *         savedJobs:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of saved job IDs
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     EmployerUser:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Employer ID
 *           example: 507f1f77bcf86cd799439012
 *         fullName:
 *           type: string
 *           example: Jane Smith
 *         email:
 *           type: string
 *           format: email
 *           example: jane.smith@company.com
 *         role:
 *           type: string
 *           example: employer
 *         companyName:
 *           type: string
 *           description: Company name
 *           example: Tech Corp Inc.
 *         companyAbout:
 *           type: string
 *           description: Company description
 *           example: Leading technology solutions provider
 *         companyImage:
 *           type: string
 *           description: Company logo URL
 *           example: http://localhost:8080/uploads/CompanyProfile/logo.jpg
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CompanyProfileUpdate:
 *       type: object
 *       required:
 *         - companyName
 *         - companyAbout
 *       properties:
 *         companyName:
 *           type: string
 *           description: Company name
 *           example: Tech Corp Inc.
 *         companyAbout:
 *           type: string
 *           description: Company description
 *           example: We are a leading technology solutions provider
 *         companyImage:
 *           type: string
 *           format: binary
 *           description: Company logo image file
 *
 *     ApplicantProfileUpdate:
 *       type: object
 *       properties:
 *         aAbout:
 *           type: string
 *           description: About/bio section
 *           example: Passionate software developer with 3 years of experience
 *         aQualifications:
 *           type: string
 *           description: Educational qualifications
 *           example: Bachelor's in Computer Science, Master's in Software Engineering
 *         aExperience:
 *           type: string
 *           description: Work experience
 *           example: 3 years at ABC Tech, 2 years at XYZ Solutions
 *         aLocation:
 *           type: string
 *           description: Current location
 *           example: New York, USA
 *         aSkills:
 *           type: string
 *           description: Comma-separated skills
 *           example: JavaScript, React, Node.js, MongoDB
 *         aImage:
 *           type: string
 *           format: binary
 *           description: Profile image file
 *
 *     Job:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Job ID
 *           example: 507f1f77bcf86cd799439013
 *         employerId:
 *           type: string
 *           description: Employer/Company ID
 *           example: 507f1f77bcf86cd799439012
 *         jRole:
 *           type: string
 *           description: Job role/title
 *           example: Senior Software Engineer
 *         jMode:
 *           type: string
 *           description: Work mode
 *           example: Remote
 *         jSalary:
 *           type: number
 *           description: Salary amount
 *           example: 120000
 *         jLocation:
 *           type: string
 *           description: Job location
 *           example: New York, USA
 *         jExperience:
 *           type: number
 *           description: Required years of experience
 *           example: 5
 *         jQualification:
 *           type: string
 *           description: Required qualifications
 *           example: Bachelor's degree in Computer Science or related field
 *         jSkills:
 *           type: string
 *           description: Required skills
 *           example: React, Node.js, MongoDB, AWS
 *         jResponsibility:
 *           type: string
 *           description: Job responsibilities
 *           example: Design and develop scalable web applications
 *         jNoOpening:
 *           type: number
 *           description: Number of openings
 *           example: 3
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     JobCreate:
 *       type: object
 *       required:
 *         - jRole
 *         - jMode
 *         - jSalary
 *         - jLocation
 *         - jExperience
 *         - jQualification
 *         - jSkills
 *         - jResponsibility
 *         - jNoOpening
 *       properties:
 *         jRole:
 *           type: string
 *           description: Job role/title
 *           example: Senior Software Engineer
 *         jMode:
 *           type: string
 *           description: Work mode (Remote, On-site, Hybrid)
 *           example: Remote
 *         jSalary:
 *           type: number
 *           description: Salary amount
 *           example: 120000
 *         jLocation:
 *           type: string
 *           description: Job location
 *           example: New York, USA
 *         jExperience:
 *           type: number
 *           description: Required years of experience
 *           example: 5
 *         jQualification:
 *           type: string
 *           description: Required qualifications
 *           example: Bachelor's degree in Computer Science
 *         jSkills:
 *           type: string
 *           description: Required skills (comma-separated)
 *           example: React, Node.js, MongoDB
 *         jResponsibility:
 *           type: string
 *           description: Job responsibilities
 *           example: Design and develop scalable applications
 *         jNoOpening:
 *           type: number
 *           description: Number of openings
 *           example: 3
 *
 *     Application:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Application ID
 *           example: 507f1f77bcf86cd799439014
 *         applicantId:
 *           type: string
 *           description: Applicant ID
 *           example: 507f1f77bcf86cd799439011
 *         jobId:
 *           type: string
 *           description: Job ID
 *           example: 507f1f77bcf86cd799439013
 *         employerId:
 *           type: string
 *           description: Employer ID
 *           example: 507f1f77bcf86cd799439012
 *         status:
 *           type: string
 *           enum: [Applied, Accepted, Rejected]
 *           description: Application status
 *           example: Applied
 *         resumeUrl:
 *           type: string
 *           description: Resume file URL
 *           example: http://localhost:8080/uploads/Resumes/resume.pdf
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     ApplicationStatusUpdate:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: [Applied, Accepted, Rejected]
 *           description: New application status
 *           example: Accepted
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: User Logged Successfully
 *         token:
 *           type: string
 *           description: JWT authentication token
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         user:
 *           oneOf:
 *             - $ref: '#/components/schemas/ApplicantUser'
 *             - $ref: '#/components/schemas/EmployerUser'
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Operation completed successfully
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         errorMessage:
 *           type: string
 *           description: Error message
 *           example: An error occurred
 *
 *     ValidationErrorResponse:
 *       type: object
 *       properties:
 *         errorMessage:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 description: Field name with validation error
 *                 example: email
 *               message:
 *                 type: string
 *                 description: Validation error message
 *                 example: Email is required
 */

module.exports = {};

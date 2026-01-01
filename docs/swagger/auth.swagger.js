/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user as either an applicant or employer. The password will be hashed before storing in the database.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *           examples:
 *             applicant:
 *               summary: Register as applicant
 *               value:
 *                 fullName: John Doe
 *                 email: john.doe@example.com
 *                 password: SecurePassword123
 *                 role: applicant
 *             employer:
 *               summary: Register as employer
 *               value:
 *                 fullName: Jane Smith
 *                 email: jane.smith@company.com
 *                 password: SecurePassword456
 *                 role: employer
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Register Successfully
 *                 newUser:
 *                   oneOf:
 *                     - $ref: '#/components/schemas/ApplicantUser'
 *                     - $ref: '#/components/schemas/EmployerUser'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *             example:
 *               errorMessage:
 *                 - field: email
 *                   message: Email is required
 *                 - field: password
 *                   message: Password must be at least 6 characters
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               applicant:
 *                 value:
 *                   errorMessage: Applicant User already exists
 *               employer:
 *                 value:
 *                   errorMessage: Employer User already exists
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               errorMessage: Error in creating user (catch)
 */

/**
 * @swagger
 * /api/auth/login/applicant:
 *   post:
 *     summary: Login as applicant
 *     description: Authenticate an applicant user and receive a JWT token for subsequent API calls.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *           example:
 *             email: john.doe@example.com
 *             password: SecurePassword123
 *     responses:
 *       201:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Applicant User Logged Successfully
 *                 token:
 *                   type: string
 *                   description: JWT authentication token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   $ref: '#/components/schemas/ApplicantUser'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               userNotFound:
 *                 value:
 *                   errorMessage: Applicant User is not Register
 *               wrongPassword:
 *                 value:
 *                   errorMessage: Password not Matched
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               errorMessage: Error in logging the user (catch)
 */

/**
 * @swagger
 * /api/auth/login/employer:
 *   post:
 *     summary: Login as employer
 *     description: Authenticate an employer user and receive a JWT token for subsequent API calls.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *           example:
 *             email: jane.smith@company.com
 *             password: SecurePassword456
 *     responses:
 *       201:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Employer User Logged Successfully
 *                 token:
 *                   type: string
 *                   description: JWT authentication token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   $ref: '#/components/schemas/EmployerUser'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               userNotFound:
 *                 value:
 *                   errorMessage: Employer User is not Register
 *               wrongPassword:
 *                 value:
 *                   errorMessage: Password not Matched
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               errorMessage: Error in logging the user (catch)
 */

module.exports = {};

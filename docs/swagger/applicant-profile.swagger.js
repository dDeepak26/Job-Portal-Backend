/**
 * @swagger
 * /api/applicant-profile:
 *   get:
 *     summary: Get applicant profile
 *     description: Retrieve the profile information for the authenticated applicant user.
 *     tags: [Applicant Profile]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Applicant profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApplicantUser'
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/applicant-profile:
 *   put:
 *     summary: Create or update applicant profile
 *     description: Create or update the applicant profile with personal information and profile image. Requires applicant authentication.
 *     tags: [Applicant Profile]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               aAbout:
 *                 type: string
 *                 description: About/bio section
 *                 example: Passionate software developer with 3 years of experience in full-stack development.
 *               aQualifications:
 *                 type: string
 *                 description: Educational qualifications
 *                 example: Bachelor of Science in Computer Science, Master of Science in Software Engineering
 *               aExperience:
 *                 type: string
 *                 description: Work experience details
 *                 example: 3 years at TechCorp as Full Stack Developer, 2 years at StartupXYZ as Frontend Engineer
 *               aLocation:
 *                 type: string
 *                 description: Current location
 *                 example: San Francisco, California, USA
 *               aSkills:
 *                 type: string
 *                 description: Comma-separated list of skills
 *                 example: JavaScript, React, Node.js, MongoDB, AWS, Docker
 *               aImage:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file (JPEG, PNG, etc.)
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *                 profile:
 *                   $ref: '#/components/schemas/ApplicantUser'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/applicant-profile/resume:
 *   put:
 *     summary: Upload or update resume
 *     description: Upload or update the resume file for the authenticated applicant. Accepts PDF, DOC, DOCX files.
 *     tags: [Applicant Profile]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Resume file (PDF, DOC, DOCX)
 *     responses:
 *       200:
 *         description: Resume uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Resume uploaded successfully
 *                 resumeUrl:
 *                   type: string
 *                   example: http://localhost:8080/uploads/Resumes/resume-123456.pdf
 *       400:
 *         description: Bad request - No file uploaded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               errorMessage: No file uploaded
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

module.exports = {};

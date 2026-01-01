/**
 * @swagger
 * /api/company-profile:
 *   get:
 *     summary: Get company profile
 *     description: Retrieve the company profile information for the authenticated employer. Requires employer authentication.
 *     tags: [Company Profile]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Company profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployerUser'
 *       401:
 *         description: Unauthorized - Only employers can access company profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               errorMessage: Only Employer can create company profile
 *       404:
 *         description: Company profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               errorMessage: No company profile found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               errorMessage: Error in getting the company profile by id
 */

/**
 * @swagger
 * /api/company-profile:
 *   put:
 *     summary: Update company profile
 *     description: Create or update the company profile for authenticated employer. Includes company logo upload. Only employers can access this endpoint.
 *     tags: [Company Profile]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *               - companyAbout
 *               - companyImage
 *             properties:
 *               companyName:
 *                 type: string
 *                 description: Company name
 *                 example: Tech Corp Inc.
 *               companyAbout:
 *                 type: string
 *                 description: Company description
 *                 example: We are a leading technology solutions provider specializing in cloud computing and AI.
 *               companyImage:
 *                 type: string
 *                 format: binary
 *                 description: Company logo image file (JPEG, PNG, etc.)
 *     responses:
 *       200:
 *         description: Company profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: company profile updated successfully
 *                 updatedCompanyProfile:
 *                   $ref: '#/components/schemas/EmployerUser'
 *       400:
 *         description: Bad request - Validation error or no file uploaded
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ValidationErrorResponse'
 *                 - $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               validationError:
 *                 value:
 *                   errorMessage:
 *                     - field: companyName
 *                       message: Company name is required
 *               noFile:
 *                 value:
 *                   errorMessage: No file uploaded
 *       401:
 *         description: Unauthorized - Only employers can update company profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               errorMessage: Only Employer can create company profile
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               errorMessage: Error in updating the company profile by employer id
 */

module.exports = {};

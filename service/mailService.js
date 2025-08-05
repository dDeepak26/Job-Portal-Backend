const nodemailer = require("nodemailer");

async function mailService(
  fullName,
  dateTime,
  location,
  companyName,
  jRole,
  recipientMail = "work.deepakdurgam@gmail.com"
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ddaniel264620@gmail.com",
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  //   mail info
  const info = await transporter.sendMail({
    from: '"D Daniel" <ddaniel264620@gmail.com>',
    to: `${recipientMail}`,
    subject: `Interview Invitation – ${companyName} ${jRole}`,
    text: `
Dear ${fullName},

We are pleased to inform you that you have been shortlisted for the ${jRole} position at ${companyName}.

We would like to invite you for an interview to further discuss your qualifications and experience.

📅🕒 Date Time: ${dateTime}
📍 Location: ${location}  

Please confirm your availability by replying to this email.

Best regards,  
D Daniel  
HR Team  
${companyName}
  `,
    html: `
    <p>Dear ${fullName},</p>
    <p>We are pleased to inform you that you have been shortlisted for the <strong>${jRole}</strong> position at <strong>${companyName}</strong>.</p>
    <p>We would like to invite you for an interview to further discuss your qualifications and experience.</p>
    <p>
      📅 🕒 <strong>Date:</strong> ${dateTime}<br>
      📍 <strong>Location:</strong> ${location}
    </p>
    <p>Please confirm your availability by replying to this email.</p>
    <p>Best regards,<br>
    D Daniel<br>
    HR Team<br>
    ${companyName}</p>
  `,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = mailService;

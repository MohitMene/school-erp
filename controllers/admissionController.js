const Student = require("../models/Student");
const nodemailer = require("nodemailer");

exports.submitAdmission = async (req, res) => {
  const { name, email, phone, course, message } = req.body;

  try {
    console.log("Received admission form:", req.body); // Log the request

    const newStudent = new Student({ name, email, phone, course, message });
    await newStudent.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
       tls: {
    rejectUnauthorized: false, // 👈 Add this line
  },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Admission Form Submission",
      html: `
        <h2>Admission Form Submitted</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Course:</strong> ${course}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Admission submitted and email sent!" });
  } catch (error) {
    console.error("Error in submitAdmissions:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

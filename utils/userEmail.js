const nodeEmailer = require("nodemailer");
const sendEmail = async (userEmail, productArray) => {
  const transporter = nodeEmailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_EMAIL,
      pass: process.env.NODE_PASS,
    },
  });

  //prepare product details in text formate
  const productDetails = productArray
    .map(
      (product, index) =>
        `${index + 1}. Name: ${product.name}, Price: ${product.price}`
    )
    .join("\n");

  //set mail structure
  const mailOptions = {
    from: process.env.NODE_EMAIL,
    to: userEmail,
    subject: "You order details",
    text: `thanks for your purchase! \n\n here is your product details ${productDetails}`,
  };
  try {
    await transporter.sendEmail(mailOptions);
  } catch (e) {
    console.log(e);
  }
};
module.exports = sendEmail;

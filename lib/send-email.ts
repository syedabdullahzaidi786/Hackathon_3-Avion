import nodemailer from "nodemailer";

interface OrderDetails {
    orderId: string;
    fullName: string;
    email: string;
    contactNumber: string;
    deliveryAddress: string;
    subtotal: number;
    shippingCost: number;
    totalCost: number;
    paymentIntentId: string; // Changed to required
}

export async function sendOrderConfirmationEmail(orderDetails: OrderDetails) {
    const {
        orderId,
        paymentIntentId,
        fullName,
        email,
        contactNumber,
        deliveryAddress,
        subtotal,
        shippingCost,
        totalCost,
    } = orderDetails;

    const transporter = nodemailer.createTransport({
        host: process.env.BREVO_SMTP_SERVER, // Replace with your SMTP server
        port: Number(process.env.BREVO_SMTP_PORT), // Common SMTP port
        secure: false, // Set to true if using port 465
        auth: {
            user: process.env.BREVO_SMTP_LOGIN, // Replace with your SMTP username
            pass: process.env.BREVO_SMTP_PASSWORD, // Replace with your SMTP password
        },
    });

    const mailOptions = {
        from: '"Avion" <ardevelopers622@gmail.com>', // Sender address
        to: email, // Customer's email
        replyTo: "ardevelopers622@gmail.com", // Reply-to address
        subject: `Order Confirmation - Order #${orderId}`, // Subject line
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #1e88e5;">Order Confirmation</h2>
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>Thank you for your order. Here are your order details:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background-color: #1e88e5; color: #fff; text-align: left;">
                    <th style="padding: 10px; border: 1px solid #ddd;">Field</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Details</th>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Order ID</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${orderId}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Payment ID</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${paymentIntentId}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Full Name</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${fullName}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Email</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Contact Number</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${contactNumber}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Delivery Address</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${deliveryAddress}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Subtotal</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">PKR ${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Shipping Cost</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">PKR ${shippingCost.toFixed(2)}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Total Cost</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">PKR ${totalCost.toFixed(2)}</td>
                </tr>
            </table>
            <p style="margin-top: 20px;">
                We will process your order shortly. If you have any questions, please don't hesitate to contact us.
            </p>
            <p>Best regards,<br><strong>The Avion Team</strong></p>
        </div>
    `,
    };


    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Order confirmation email sent successfully to ${email}`);
        return { success: true, info };
    } catch (error) {
        console.error(`Error sending order confirmation email to ${email}:`, error);
        return { success: false, error: "An unexpected error occurred" };
    }
}
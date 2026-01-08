export const resetPasswordTemplate = (code: string, year: number): string => `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 40px;">
    <div style="max-width: 520px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">
        <h2 style="text-align: center; color: #333333; margin-bottom: 20px;">Password Reset Request</h2>
        <p style="color: #555555; font-size: 14px; line-height: 1.6;">
            We received a request to reset your password.
            If you did not request this, you can safely ignore this email.
        </p>
        <p style="margin-top: 25px; font-size: 14px; color: #555555;">
            Use the verification code below:
        </p>
        <div style="margin: 20px 0; padding: 15px; background-color: #fef2f2; border: 1px dashed #ef4444; border-radius: 6px; text-align: center;">
            <span style="font-size: 28px; letter-spacing: 6px; font-weight: bold; color: #dc2626;">
                ${code}
            </span>
        </div>
        <p style="font-size: 12px; color: #777777;">
            This code will expire in <strong>10 minutes</strong>.
        </p>
        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;" />
        <p style="text-align: center; font-size: 12px; color: #999999;">
            © ${year} Ecommerce NestJS<br />
            All rights reserved.
        </p>
    </div>
</body>
</html>
`;

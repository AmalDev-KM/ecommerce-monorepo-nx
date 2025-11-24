export const otpEmailTemplate = (otp: string) => {
  return `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>PickNGo OTP Verification</title>
</head>

<body style="margin:0; padding:0; background-color:#f5f8ff; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f8ff; padding:30px 0;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:white; border-radius:12px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td align="center" style="background:#0d47a1; padding:24px 0; color:white; font-size:26px; font-weight:700;">
              PickNGo
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px; color:#333; font-size:15px; line-height:1.6;">

              <h2 style="margin-top:0; color:#0d47a1; font-size:22px;">OTP Verification</h2>

              <p style="margin:0 0 16px;">
                Hello,
              </p>

              <p style="margin:0 0 20px;">
                Thank you for registering with <strong>PickNGo</strong>. To complete your verification, please use the
                One-Time Password (OTP) provided below:
              </p>

              <!-- OTP BOX -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:20px 0;">
                    <div style="
                      font-size:32px; 
                      font-weight:700; 
                      letter-spacing:8px; 
                      color:#0d47a1; 
                      background:#e3ecff; 
                      padding:12px 24px; 
                      border-radius:10px;
                      display:inline-block;">
                      ${otp}
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin:22px 0 14px;">
                This OTP is valid for the next <strong>10 minutes</strong>. Please do not share it with anyone for security reasons.
              </p>

              <p style="margin:0;">
                If you didn’t request this, you can safely ignore this email.
              </p>

              <!-- Spacing -->
              <div style="height:24px;"></div>

              <!-- Note -->
              <p style="color:#666; font-size:13px;">
                This is an automated message. Please do not reply to this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background:#e3ecff; padding:16px; color:#0d47a1; font-size:13px;">
              © 2025 PickNGo. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>

</html>

  `;
};

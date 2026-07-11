export function generateOtp(){
    return Math.floor(100000    +   Math.random()   *   900000).toString()
}

export function getOtpHtml(otp) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f7; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7; padding:40px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <tr>
              <td style="background-color:#1a1a2e; padding:24px; text-align:center;">
                <h1 style="color:#ffffff; margin:0; font-size:20px;">Verify Your Email</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px; text-align:center;">
                <p style="color:#333333; font-size:15px; margin:0 0 16px;">
                  Use the code below to complete your verification. This code will expire in <strong>10 minutes</strong>.
                </p>

                <div style="margin:24px 0;">
                  <span style="display:inline-block; background-color:#f0f0f5; color:#1a1a2e; font-size:32px; font-weight:bold; letter-spacing:8px; padding:16px 24px; border-radius:6px;">
                    ${otp}
                  </span>
                </div>

                <p style="color:#888888; font-size:13px; margin:24px 0 0;">
                  If you didn't request this code, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#f4f4f7; padding:16px; text-align:center;">
                <p style="color:#aaaaaa; font-size:12px; margin:0;">
                  &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}


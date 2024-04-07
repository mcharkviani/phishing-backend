export const htmlWrapper = (title: string, content: string): string => {
  const html = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <title>${title}</title>
        </head>
        <body>
            ${content}
        </body>
    </html>`;

  return html;
};

export const getContent = (
  url: string,
  header: string,
  paragraph: string,
): string => {
  const body = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #333;">${header}</h2>
    <p style="color: #666;">${paragraph}</p>
    <p style="color: #666;">To start your adventure, click the button below:</p>
    <a href="${url}" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 15px;">Explore Now</a>
    <p style="color: #666; margin-top: 15px;">Hurry, seize the opportunity and create lasting memories!</p>
    <p style="color: #666;">If you have any questions or need assistance, feel free to contact our dedicated travel experts.</p>
    </div>`;

  return body;
};

export const transporterConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDER_USER,
    pass: process.env.PASSWORD,
  },
};

import nodemailer from 'nodemailer';

export const createMailServiceNodemailerTest = async () => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  return {
    send: async ({
      to, from, text, html,
    }
      : { to: string, from: string, text?: string, html?: string }) => {
      const response = await transporter.sendMail({
        to, from, text, html,
      });
      return response;
    },
  };
};

export const createMailServiceFake = () => ({
  send: async ({
    to, from, text, html,
  }
    : { to: string, from: string, text?: string, html?: string},
  ) => ({
    to, from, text, html,
  }),
});

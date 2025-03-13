const mailApi = {
  PUBLIC_KEY: "qlrGWyjsdHevNChv6", //public key
  TEMPLATE_ID: "template_d540mj5",
  SERVICE_ID: "service_z6qunbl",
};

export const MailApi = {
  sendEmail: async (data) => {
    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },
};

export default mailApi;

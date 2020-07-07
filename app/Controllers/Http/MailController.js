const Mail = use('mail');

class MailController {
  async store({ user }) {
    await Mail.send('emails.welcome', user.toJSON(), (message) => {
      message
        .to(user.email)
        .from('<email>')
        .subject('Welcome to yardstick');
    });

    return 'Registered successfully';
  }
}

module.exports = MailController;

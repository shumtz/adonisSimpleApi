'use strict'

const Env = use('Env')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | Connection to be used for sending emails. Each connection needs to
  | define a driver too.
  |
  */
  connection: Env.get('MAIL_CONNECTION', 'smtp'),

  /*
  |--------------------------------------------------------------------------
  | SMTP
  |--------------------------------------------------------------------------
  |
  | Here we define configuration for sending emails via SMTP.
  |
  */
  smtp: {
    driver: 'smtp',
    pool: true,
    port: Env.get('25', 25),
    host: Env.get('in-v3.mailjet.com'),
    secure: false,
    auth: {
      user: Env.get('f2d8020be51e314e5a8b924b5db41e8e'),
      pass: Env.get('8258880ed609e966d0a1ef2ec34c56df')
    },
    maxConnections: 5,
    maxMessages: 100,
    rateLimit: 10
  },

  /*
  |--------------------------------------------------------------------------
  | SparkPost
  |--------------------------------------------------------------------------
  |
  | Here we define configuration for spark post. Extra options can be defined
  | inside the `extra` object.
  |
  | https://developer.sparkpost.com/api/transmissions.html#header-options-attributes
  |
  | extras: {
  |   campaign_id: 'sparkpost campaign id',
  |   options: { // sparkpost options }
  | }
  |
  */
  sparkpost: {
    driver: 'sparkpost',
    apiKey: Env.get('SPARKPOST_API_KEY'),
    extras: {}
  },

  /*
  |--------------------------------------------------------------------------
  | Mailgun
  |--------------------------------------------------------------------------
  |
  | Here we define configuration for mailgun. Extra options can be defined
  | inside the `extra` object.
  |
  | https://mailgun-documentation.readthedocs.io/en/latest/api-sending.html#sending
  |
  | extras: {
  |   'o:tag': '',
  |   'o:campaign': '',,
  |   . . .
  | }
  |
  */
  mailgun: {
    driver: 'mailgun',
    domain: Env.get('MAILGUN_DOMAIN'),
    region: Env.get('MAILGUN_API_REGION'),
    apiKey: Env.get('MAILGUN_API_KEY'),
    extras: {}
  },

  /*
  |--------------------------------------------------------------------------
  | Ethereal
  |--------------------------------------------------------------------------
  |
  | Ethereal driver to quickly test emails in your browser. A disposable
  | account is created automatically for you.
  |
  | https://ethereal.email
  |
  */
  ethereal: {
    driver: 'ethereal'
  }
}

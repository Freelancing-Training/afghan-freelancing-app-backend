const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(process.env.EMAIL_API_KEY, process.env.EMAIL_SECRET_KEY);
const moment = require('moment');
const httpStatus = require('http-status');
const { TempToken } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Send an email
 * @param {Email} toEmail
 * @param {String} toName
 * @param {string} subject
 * @param {string} textPart
 * @param {string} HTMLPart
 * @returns {Promise<>}
 */
const sendEmailViaMailJet = (toEmail, toName, subject, textPart, HTMLPart) => {
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'Fidamohammad@bakhtar.edu.af',
          Name: 'Af Freelancing',
        },
        To: [
          {
            Email: toEmail,
            Name: toName,
          },
        ],
        Subject: subject,
        TextPart: textPart,
        HTMLPart: HTMLPart,
      },
    ],
  });
  try {
    return request;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Email Not send try again');
  }
};

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {Email} toEmail
 * @param {String} toName
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (toEmail, toName, userId) => {
  const pin = await createTemporaryToken(userId);
  const Subject = 'Verify your email';
  const TextPart = 'Dear user, welcome to Af Freelancing App!';
  const HTMLPart = `<p>Dear ${toName}! use the below 6 digits pin to verify your email. And it will expire in 3 hours </p><br />
    <h2>${pin}</h2>
    <p>if you have not used this email so ignore it</p>`;

  return sendEmailViaMailJet(toEmail, toName, Subject, TextPart, HTMLPart);
};

/**
 * find temp token by value
 * @param {Number} token
 * @param {ObjectId} userId
 * @returns {Promise<Object>}
 */
const findTempTokenByValue = (token, userId) => {
  return TempToken.findOne({ token, userId });
};

/**
 * generate six digits pin
 */
const generatePin = () => {
  const pin = Math.ceil(Math.random() * 1000000);
  if (pin.toString().length < 6 || pin.toString().length > 6) {
    return generatePin();
  }
  return pin;
};

/**
 * create temporary token and save in the database
 * @returns {<String>}
 */
const createTemporaryToken = async (userId) => {
  const pin = generatePin();
  const date = moment().add(3, 'hours');
  const databaseToken = await findTempTokenByValue(pin);
  if (databaseToken) {
    return createTemporaryToken(userId);
  }
  await TempToken.create({ token: pin, expiresIn: date, userId });
  return pin;
};

/**
 * delete temporary token by value
 * @param {Object} token
 * @returns {Promise<Object>}
 */
const deleteTemporaryToken = (token) => {
  return TempToken.deleteMany({ _id: token._id });
};

/**
 * get Temp Token
 * @param {Number} userToken
 * @returns {Promise<Object>}
 */
const getTempToken = async (userToken, userId) => {
  const token = await findTempTokenByValue(userToken, userId);
  if (!token) throw new ApiError(httpStatus.NOT_FOUND, 'Incorrect Pin');
  if (moment() >= token.expiresIn) {
    await deleteTemporaryToken(token);
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Pin is Expired');
  }
  return token;
};

module.exports = {
  transport,
  sendEmail,
  getTempToken,
  deleteTemporaryToken,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendEmailViaMailJet,
};

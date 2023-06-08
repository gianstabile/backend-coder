import dotenv from "dotenv";
dotenv.config();

const config = {
  server: {
    port: process.env.PORT || 8080,
  },
  database: {
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbUrl: process.env.DB_URL,
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
  github: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    appId: process.env.APP_ID,
    callbackUrl: process.env.CALLBACK_URL,
  },
  mailConfig: {
    mailName: process.env.USER_MAIL,
    mailPass: process.env.PASS_MAIL,
    mailPort: process.env.PORT_MAIL,
    mailService: process.env.SERVICE_MAIL,
  },
};

export default config;

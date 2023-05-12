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
};

export default config;

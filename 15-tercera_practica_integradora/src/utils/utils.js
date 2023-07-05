import { fileURLToPath } from "url";
import { dirname } from "path";
import { v4 as uuid } from "uuid";
import multer from "multer";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/images`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploader = multer({ storage });

// Bcrypt
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const calculateExpirationDate = () => {
  const now = new Date();
  const expirationDate = new Date(now.getTime() + 1 * 60 * 60 * 1000);
  return expirationDate;
};

export const generateUniqueToken = () => {
  return uuid();
};

export default __dirname;

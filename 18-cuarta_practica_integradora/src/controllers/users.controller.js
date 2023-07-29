import { logger } from "../utils/logger.js";
import CustomError from "../errors/customError.js";
import { errorsName, errorsCause, errorsMessage } from "../errors/errorDictionary.js";
import { usersService } from "../services/users.service.js";
import documentService from "../services/documents.service.js";
import { isValidPassword } from "../utils/utils.js";
import GetCurrentUserDTO from "../dto/currentuser.dto.js";

export const register = async (req, res, next) => {
  try {
    const userData = {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    };

    const currentUser = new GetCurrentUserDTO(userData);

    logger.info("User registered");
    return res.send({ status: "success", message: "User registered", currentUser });
  } catch (error) {
    const customError = CustomError({
      name: errorsName.INTERNAL_SERVER_ERROR,
      message: errorsMessage.INTERNAL_SERVER_ERROR,
      cause: errorsCause.INTERNAL_SERVER_ERROR,
      originalError: error.message,
    });
    logger.error("Internal Server Error", customError);
    next(customError);
  }
};

export const failRegister = async (req, res, next) => {
  try {
    throw CustomError({
      name: errorsName.AUTHENTICATION_ERROR,
      message: errorsMessage.AUTHENTICATION_ERROR,
      cause: errorsCause.AUTHENTICATION_ERROR,
    });
  } catch (error) {
    logger.error("Authentication error", error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await usersService.getUserById({ email });
    const currentDateTime = new Date();

    if (!user) {
      logger.warning("Invalid user.");
      throw CustomError({
        name: errorsName.INVALID_CREDENTIALS,
        message: errorsMessage.INVALID_CREDENTIALS,
        cause: errorsCause.INVALID_CREDENTIALS,
      });
    }

    if (!isValidPassword(user, password)) {
      logger.warning("Invalid password.");
      throw CustomError({
        name: errorsName.INVALID_CREDENTIALS,
        message: errorsMessage.INVALID_CREDENTIALS,
        cause: errorsCause.INVALID_CREDENTIALS,
      });
    }

    const userData = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: user.role,
      thumbnails: user.thumbnails,
      cart: user.cart,
      last_connection: currentDateTime,
    };

    const currentUser = new GetCurrentUserDTO(userData);

    req.session.user = currentUser;

    logger.info("User login successful");
    return res.send({
      status: "sucess",
      message: "Login sucessful",
      currentUser,
    });
  } catch (error) {
    logger.error("Login error", error);
    next(error);
  }
};

export const gitHubLogin = (req, res, next) => {
  try {
    const user = req.user;
    req.session.user = user;
    logger.info("User logged in with GitHub");
    res.redirect("/profile");
  } catch (error) {
    logger.error("GitHub login error", error);
    next(error);
  }
};

export const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        logger.error("Logout error", err);
        return res.status(500).send({ status: "error", message: "Logout error", error: err });
      }
      res.clearCookie("connect.sid");
      logger.info("User logged out");
      res.redirect("/login");
    });
  } catch (error) {
    logger.error("Internal Server Error", error);
    res.status(500).send({ status: "error", error: "Internal Server Error" });
  }
};

export async function changeRole(req, res) {
  try {
    const { id } = req.params;
    const result = await usersService.changeRole(id);
    logger.info("Ok");
    return res.send({
      status: "success",
      result,
    });
  } catch (error) {
    logger.error(error.message);
  }
}

export async function uploadDocuments(req, res) {
  try {
    const userId = req.params.uid;
    const files = req.files;

    if (!files) {
      return res.status(400).json({ status: "error", message: "No files were uploaded." });
    }

    const createdDocuments = [];

    await Promise.all(
      files.map(async (file) => {
        const documentUrl = `http://localhost:8080/uploads/documents/${file.filename}`;
        const documentData = {
          name: file.originalname,
          size: file.size,
          docReference: documentUrl,
          user: userId,
        };

        const createdDocument = await documentService.createDocument(documentData);
        createdDocuments.push(createdDocument);
      })
    );

    logger.info("Documents created successfully.");
    res.json({ status: "success", message: "Documents created successfully." });
  } catch (error) {
    logger.error("Failed to create documents:", error);
    next(error);
  }
}

export async function getDocumentsByUser(req, res) {
  try {
    const userId = req.params.uid;

    const documents = await documentService.findDocsById({ user: userId });
    logger.info("Documents rendered successfully.");
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error("Failed to render documents:", error);
  }
}

export async function deleteDocumentsById(req, res) {
  try {
    const userId = req.params.uid;
    const documentId = req.params.did;

    const document = await documentService.findDocsById({ _id: documentId });

    if (!document) {
      return res.status(404).json({ error: "Document not found." });
    }

    if (document.user && document.user.toString() !== userId) {
      return res.status(403).json({ error: "You are not authorized to delete this document." });
    }

    await documentService.deleteDocumentById(documentId);
    logger.info("Documents deleted successfully.");
    res.status(200).json({ message: "Document deleted successfully." });
  } catch (error) {
    logger.error("Failed to delete documents:", error);
    res.status(500).json({ error: error.message });
  }
}

import { Router } from "express";
import { changeRole, uploadDocuments, getDocumentsByUser, deleteDocumentsById, uploadProfileImage } from "../controllers/users.controller.js";
import { authorize, authentication } from "../middlewares/auth.js";
import { uploader } from "../utils/utils.js";

const router = Router();

router.get("/:uid/documents", authentication(), getDocumentsByUser);
router.post("/:uid/documents", authentication(), uploader.array("document"), uploadDocuments);
router.post("/:uid/update", authentication(), uploader.single("profile"), uploadProfileImage);
router.post("/premium/:id", authentication(), authorize(["admin"]), changeRole);
router.delete("/:uid/documents/:did", deleteDocumentsById);

export default router;

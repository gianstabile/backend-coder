import { Router } from "express";
import { changeRole, uploadDocuments, getDocumentsByUser, deleteDocumentsById } from "../controllers/users.controller.js";
import { authorize, authentication } from "../middlewares/auth.js";
import { uploader } from "../utils/utils.js";

const router = Router();

router.post("/premium/:id", authentication(), authorize(["admin"]), changeRole);
router.post("/:uid/documents", authentication(), uploader.array("document"), uploadDocuments);
router.get("/:uid/documents", authentication(), getDocumentsByUser);
router.delete("/:uid/documents/:did", deleteDocumentsById);

export default router;

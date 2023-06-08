import { Router } from "express";
import { checkLogged, checkLogin } from "../middlewares/auth.js";
import ViewsController from "../controllers/views.controller.js";
import { authorizeRole } from "../middlewares/auth.js";

const router = Router();
const viewsController = new ViewsController();

router.get("/products", viewsController.getProducts);
router.get("/product/:pid", viewsController.getProductById);
router.get("/cart", viewsController.getCart);
router.get("/login", checkLogged, viewsController.getLogin);
router.get("/register", checkLogged, viewsController.getRegister);
router.get("/profile", authorizeRole(["user"]), checkLogin, viewsController.getProfile);
router.get("/logout", viewsController.logout);
router.get("/recovery", viewsController.getRecovery);
router.get("/current", viewsController.getCurrentUser);
router.get("/purchase", viewsController.purchase);

export default router;

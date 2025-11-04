import UsuarioController from "../controllers/UsuarioController.js";
import {Router} from "express";

const router = Router();

//Crear usuario
router.post("/", UsuarioController.createUser);

//obtener todos los usuarios
router.get("/", UsuarioController.getUsuarios);
router.get("/:id", UsuarioController.getUserById);

//Actualizar usuario
router.put("/:id", UsuarioController.updateUser);
//Eliminar usuario
router.delete("/:id", UsuarioController.deleteUser);

router.post("/bulk", UsuarioController.bulkCreateUsuarios);


export default router;
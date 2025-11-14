import UserService from "../services/userServices.js";

class UserController{
    async  loginController(req, res) {
        try{
            const { correo, contrasenia} = req.body
            if(!correo || !contrasenia){
                return res.status(400).json({ message: "Correo y contraseña requeridos" });
            }

            const result = await UserService.login(correo, contrasenia);

            res.json(result);

        }catch (error) {
        // mensajes claros para front
        const msg = error.message || "Error en login";
        // 401 si credenciales, 500 si otra cosa
        const status = msg.includes("Contraseña") || msg.includes("no encontrado") ? 401 : 500;
        return res.status(status).json({ message: msg });
    }
    
    }
}

export default new UserController();

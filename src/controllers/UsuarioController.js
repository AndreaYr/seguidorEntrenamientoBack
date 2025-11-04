import UsuarioServices from "../services/UsuarioServices.js";

class UsuarioController {

    async createUser(req, res) {
        try{
            const newUser = await UsuarioServices.createUsuario(req.body);
            res.status(201).json(newUser);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }

    async getUsuarios(req, res) {
        try{
            const users = await UsuarioServices.listAll();
            res.json(users);
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async getUserById(req, res) {
        try{
            const user = await UsuarioServices.getById(req.params.id);
            res.json(user);
        }catch(error){
            res.status(404).json({error: error.message});
        }
    }

    async updateUser(req, res) {
        try{
            const updatedUser = await UsuarioServices.updateUsuario(req.params.id, req.body);
            res.json(updatedUser);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }

    async deleteUser(req, res) {
        try{
            const result = await UsuarioServices.deleteUsuario(req.params.id);
            res.json(result);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }

    async bulkCreateUsuarios(req, res) {
        try {
            const usuarios = await UsuarioServices.bulkCreate(req.body);
            res.status(201).json(usuarios);
        } catch (error) {
            console.error("Error en bulkCreateUsuarios:", error);
            res.status(500).json({ error: error.message });
        }
    }
}

export default new UsuarioController();
// controllers/DeportistaController.js
import DeportistaServices from "../services/DeportistaService.js";

class DeportistaController {

    async getDeportistas(req, res) {
        try{
            const deportistas = await DeportistaServices.getDeportistas();
            res.json(deportistas);
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async getDeportistaById(req, res) {
        try{
            const deportista = await DeportistaServices.getDeportistaById(req.params.id);
            res.json(deportista);
        }catch(error){
            res.status(404).json({error: error.message});
        }
    }

    async createDeportista(req, res) {
        try{
            const newDeportista = await DeportistaServices.createDeportista(req.body);
            res.status(201).json(newDeportista);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }

    async updateDeportista(req, res) {
        try{
            const updatedDeportista = await DeportistaServices.updateDeportista(req.params.id, req.body);
            res.json(updatedDeportista);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }

    async deleteDeportista(req, res) {
        try{
            const result = await DeportistaServices.deleteDeportista(req.params.id);
            res.json(result);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }

    async bulkCreateDeportista(req, res) {
        try {
            const deportista = await DeportistaService.bulkCreate(req.body);
            res.status(201).json(deportista);
        } catch (error) {
            console.error("Error en bulkCreateRetos:", error);
            res.status(500).json({ error: error.message });
        }
    }
}

export default new DeportistaController();
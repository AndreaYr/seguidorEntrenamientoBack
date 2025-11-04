import EntrenamientoServices from "../services/EntrenamientoServices.js";
import { validationResult } from "express-validator";

class EntrenamientoController {
    async createEntrenamiento(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            const data = await EntrenamientoServices.createEntrenamiento(req.body);
            res.status(201).json(data); 
        }catch(error){
            res.status(400).json({ error: error.message });
        }
    }

    async getAllEntrenamientos(req, res) {
        try{
            const data = await EntrenamientoServices.getAllEntrenamientos(req.query);
            res.status(200).json(data);
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    }

    async getEntrenamientoById(req, res) {
        try{
            const data = await EntrenamientoServices.getEntrenamientoById(req.params.id);
            res.json(data);
        }catch(error){
            res.status(404).json({ error: error.message });
        }
    }

    async updateEntrenamiento(req, res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            const data = await EntrenamientoServices.updateEntrenamiento(req.params.id, req.body);
            res.json(data);
        }catch(error){
            res.status(400).json({ error: error.message });
        }
    }

    async deleteEntrenamiento(req, res) {
        try{
            await EntrenamientoServices.deleteEntrenamiento(req.params.id);
            res.status(204).send();
        }catch(error){
            res.status(404).json({ error: error.message });
        }
    }
}

export default new EntrenamientoController();
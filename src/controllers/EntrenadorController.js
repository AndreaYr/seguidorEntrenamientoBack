import EntrenadorService from "../services/EntrenadorService.js";
import { validationResult } from "express-validator";   

class EntrenadorController {
    

    async createEntrenador(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }   
        try{
            const data = await EntrenadorService.createEntrenador(req.body);
            res.status(201).json(data); 
        }   
        catch(error){
            res.status(400).json({ error: error.message });
        }
    }


    async getEntrenadores(req, res) {
        try{
            const data = await EntrenadorService.getEntrenadores(req.query);        
            res.status(200).json(data);
        }
        catch(error){
            console.error('❌ Error en getEntrenadores controller:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor',
                details: error.message 
            });
        }
    }   

    async getEntrenadorById(req, res) {
        try{
            const data = await EntrenadorService.getEntrenadorById(req.params.id);
            if (!data) {
                return res.status(404).json({ error: 'Entrenador no encontrado' });
            }
            res.status(200).json(data);
        }
        catch(error){
            console.error('❌ Error en getEntrenadorById controller:', error);
            if (error.message.includes('no encontrado') || error.message.includes('not found')) {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ 
                error: 'Error interno del servidor',
                details: error.message 
            });
        }
    }   

    async updateEntrenador(req, res) {
        const errors = validationResult(req);       
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }   
        try{
            const data = await EntrenadorService.updateEntrenador(req.params.id, req.body);
            res.status(200).json(data);
        }
        catch(error){
            console.error('❌ Error en updateEntrenador controller:', error);
            if (error.message.includes('no encontrado') || error.message.includes('not found')) {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({
                error: 'Error interno del servidor',
                details: error.message 
            });
        }
    }

    async deleteEntrenador(req, res) {
        try{
            const result = await EntrenadorService.deleteEntrenador(req.params.id);
            if (result === 0) {
                return res.status(404).json({ error: 'Entrenador no encontrado' });
            }
            res.status(200).json({ message: 'Entrenador eliminado exitosamente' });
        }
        catch(error){
            console.error('❌ Error en deleteEntrenador controller:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor',
                details: error.message 
            });
        }
    }
    async bulkCreateEntrenador(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try{
            const data = await EntrenadorService.bulkCreateEntrenador(req.body);
            res.status(201).json(data); 
        }
        catch(error){
            res.status(400).json({ error: error.message });
        }
    }
}
export default new EntrenadorController();
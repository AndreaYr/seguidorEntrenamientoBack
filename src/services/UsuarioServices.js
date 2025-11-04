import UsuarioRepository from '../repositories/UsuarioRepository.js';
import bcrypt from 'bcrypt';

class UsuarioServices {

    async createUsuario(data) {
        if(!data.correo || !data.contrasenia || !data.primerNombre || !data.primerApellido){
            throw new Error('Faltan campos obligatorios');
        }

        const usuarioExistente = await UsuarioRepository.findAll();
        if(usuarioExistente.some(user => user.correo === data.correo)){
            throw new Error('El correo ya está registrado');
        }

        //encriptar la contraseña
        const saltRounds = 10; //Nivel de complejidad 
        const hash = await bcrypt.hash(data.contrasenia, saltRounds);

        //Reemplazar la contraseña por el hash
        data.contrasenia = hash;

        return await UsuarioRepository.create(data);
    }

    async listAll() {
        return UsuarioRepository.findAll();
    }

    async getById(req, res) {
        const user = await UsuarioRepository.findById(req.params.id);
        if(!user){
            throw new Error('Usuario no encontrado');   
        }
        return user;
    }

    async updateUsuario(id, data) {
        const updated = await UsuarioRepository.update(id, data);
        if(!updated){
            throw new Error('Usuario no encontrado o no se pudo actualizar');
        }
        return updated;
    }

    async deleteUsuario(id) {
        const deleted = await UsuarioRepository.delete(id);
        if(!deleted){
            throw new Error('Usuario no encontrado o no se pudo eliminar');
        }
        return deleted;
    }

    async bulkCreate(data) {
     return await UsuarioRepository.bulkCreate(data);
    }
}

export default new UsuarioServices();

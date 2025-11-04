import Usuario from "../models/Usuario.js";

class UsuarioRepository {
    async create(data) {
        return await Usuario.create(data);
    }

    async findAll() {
        return await Usuario.findAll({attributes: { exclude: ['contrasenia'] }});
    }

    //Busca usuario por Id
    async findById(id) {
        return await Usuario.findById(id, {attributes: { exclude: ['contrasenia'] }});
    }

    //Busca usuario por correo
    async findByEmail(correo) {
        return await Usuario.findOne({ where: { correo } });
    }

    async update(id, data){
       const usuario = await this.findById(id);
       if(usuario){
           return await usuario.update(data);
       }
       return null;
    }

    async delete(id){
       const deleted = await Usuario.destroy({  
              where: { id_usuario: id }
        });
        return deleted > 0;
    }
}

export default new UsuarioRepository();
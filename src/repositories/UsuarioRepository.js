import Usuario from "../models/Usuario.js";

class UsuarioRepository {
    async create(data) {
        return await Usuario.create(data);
    }

    async findAll() {
        return await Usuario.findAll({attributes: { exclude: ['contrasenia'] }});
    }

    //Busca usuario por Id
    async findByPK(id) {
        return await Usuario.findByPk(id, {attributes: { exclude: ['contrasenia'] }});
    }

    //Busca usuario por correo
    async findByEmail(correo) {
        return await Usuario.findOne({ where: { correo } });
    }

    async update(id, data){
       const usuario = await Usuario.findByPk(id, data);
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

    async bulkCreate(usuarios) {
        return await Usuario.bulkCreate(usuarios);
    }

    
}

export default new UsuarioRepository();
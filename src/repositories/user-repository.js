import Usuario from '../models/Usuario.js';
import Entrenador from '../models/Entrenador.js';
import Deportista from '../models/Deportista.js';
import Administrador from '../models/Administrador.js';

class UserRepository {

  async findByEmail(correo){
    //Trae el usuario y sus relaciones
    return await Usuario.findOne({where: {correo},
    include: [
      {model: Entrenador, required: false},
      {model: Deportista, required: false},
      {model: Administrador, required: false}
    ]});
  }
}

export default new UserRepository();
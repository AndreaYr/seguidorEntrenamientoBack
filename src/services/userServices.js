import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import UserRepository from '../repositories/user-repository.js';
import Usuario from '../models/Usuario.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || "8h";

class UserService{
    async  login(correo, contrasenia) {
    const user = await UserRepository.findByEmail(correo);
    if(!user){
        throw new Error("Usuario no encontrado");
    }

    const match = await bcrypt.compare(contrasenia, user.contrasenia);
    if(!match){
        throw new Error("Contraseña incorrecta");

    }

    // Construir payload del token
    const payload = {
        id_usuario: user.id_usuario,
        rol: user.rol
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    //Añadir datos al perfil según el rol
    let perfil = null;
    if(user.rol === "deportistas" && user.Deportista){
        perfil = {
            id_deportista: user.Deportista.id_deportista,
            peso: user.Deportista.peso,
            altura: user.Deportista.altura,
            id_entrenador: user.Deportista.id_entrenador
        };
    }else if(user.rol === "entrenador" && user.Entrenador){
        perfil = {
            id_entrenador: user.Entrenador.id_entrenador,
            experiencia: user.Entrenador.experiencia
        };
    }else if(user.rol === "administrador" && user.Administrador){
        perfil = {
            id_administrador: user.Administrador.id_administrador,
            cargo: user.Administrador.cargo,
            permisos: user.Administrador.permisos
        }
    }

    return {
        token,
        usuario: {
            id_usuario: user.id_usuario,
            correo: user.correo,
            primerNombre: user.primerNombre,
            primerApellido: user.primerApellido,
            rol: user.rol,
            perfil
        }
    }

    }
}

export default new UserService();
import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';


export const newUser = async (req: Request, res: Response) => {

    const { alias, contrasenia } = req.body;

    // Validamos si el usuario ya existe en la base de datos
    const user = await User.findOne({where: {alias}});

    if(user){
        return res.status(400).json({
            msg: 'Ya existe un usuario en Artesanoterapeuta con el nombre "'+alias+'"'
        })
    }

    const hashedPassword = await bcrypt.hash(contrasenia, 10);
    
    try {
        // Guardamos usuario en la base de datos
        await User.create({
            alias: alias,
            contrasenia: hashedPassword
        })
    
        res.json({
            msg: 'Ya te has registrado en Artesanoterapeuta,'+ alias,
        })
    } catch (error) {
        res.status(400).json({
            msg: 'No se ha podido conectar a la base de datos',
            error
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {

    const { id, alias, contrasenia, gmail, rol} = req.body;
    
    //Validamos si el usuario existe en la base de datos
    const user: any = await User.findOne({ where: { alias: alias}})

    if(!user){
        return res.status(400).json({
            msg: "No hay ningún usuario registrado con el nombre "+alias
        })
    }
    //Validamos password

    const contraseniaValida = await bcrypt.compare(contrasenia, user.contrasenia)
    
    if(!contraseniaValida){
        return res.status(400).json({
            msg: "Contraseña introducida erronea, pruebe de nuevo"
        })
    }

    //Generamos token
    const token = jwt.sign({
        id: id,
        alias: alias,
        rol: user.rol,
        gmail: user.gmail
    }, process.env.SECRET_KEY || 'pepito123', {
       expiresIn: '900000' //Esto equivale a 15 minutos
    });

    res.json(token);
}

//Recogemos los usuarios para comprobar sí el que se loguea es el admin o no
export const getUsers = async (req: Request, res: Response) => {

      const listaUsuarios = await User.findAll();
  
      res.json(listaUsuarios)
}


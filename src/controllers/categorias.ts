import { Request, Response } from 'express'
import { Obra } from '../models/obra'
import sequelize from 'sequelize/types/sequelize';

export const getCategorias = async (req: Request, res: Response) => {
  try {
        const categoriasDistintas  = await Obra.findAll({   
            attributes: [
                [sequelize.fn('DISTINCT', sequelize.col('categoria')), 'categoria']
            ],
        });
    
        res.json(categoriasDistintas)  
}catch (error) {
    // Maneja errores apropiadamente
    res.status(500).json({ error: 'Ha ocurrido un error al obtener las categorías.' });
}
};
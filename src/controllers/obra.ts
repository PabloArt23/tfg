import { Request, Response } from 'express'
import { Obra } from '../models/obra'
import sequelize from '../db/connection';
//import sequelize from 'sequelize/types/sequelize';

//OBTENER TODAS LAS OBRAS
export const getObras = async (req: Request, res: Response) => {
      const orden = req.query.orden; // Obtén el valor de orden desde los parámetros de consulta
     
    if (typeof orden === 'string') {
        const listObras = await Obra.findAll({
            order: [['id', orden || 'asc']],   
        });
    
        res.json(listObras)
    }
}



//INSERTAR NUEVA OBRA
export const newObra = async (req: Request, res: Response) => {

    const { titulo, anio, precio, categoria, tecnica, imagen, alt, disposicion, reciente, descripcion, direccion} = req.body;

    const datos = req.body;

    console.log(datos)
    // Validamos si la obra ya existe en la base de datos
    const obra = await Obra.findOne({where: {titulo}});

    if(obra){
        return res.status(400).json({
            msg: 'Ya existe una obra con el nombre"'+obra+'"'
        })
    }

    try {
        // Guardamos obra en la base de datos
      await Obra.create({
            titulo: titulo,
            anio: anio,
            precio: precio,
            categoria: categoria,
            tecnica: tecnica,
            imagen: imagen,
            alt: alt,
            disposicion: disposicion,
            reciente: reciente,
            descripcion: descripcion,
            direccion: direccion
        })
    
        res.json({
            msg: 'La obra "'+ titulo + '", ya está registrada',
        })
    } catch (error) {
        res.status(400).json({
            msg: 'No se ha podido conectar a la base de datos',
            error
        })
    }
}



//SELECCIONAR OBRA A ACTUALIZAR
export const getObraAEditar = async (req: Request, res: Response) => {
    const obraId = req.params.id;

    try {
        const obra = await Obra.findByPk(obraId);

        if (!obra) {
            return res.status(404).json({ error: 'Obra no encontrada' });
          }
      
          return res.json(obra);
    } catch (error) {
        return res.status(500).json({ error: 'Error al buscar la obra' });
      }
}



//ACTUALIZAR OBRA SELECCIONADA
export const actualizarObra = async (req: Request, res: Response) => {

    const obraId = req.params.id; // Obtiene el ID de la obra de los parámetros de la URL
    const nuevosDatos = req.body; // Los nuevos datos a actualizar deben enviarse en el cuerpo de la solicitud
  
    try {
      // Busca la obra por su ID en la base de datos
      const obra = await Obra.findByPk(obraId);

      console.log(obraId)
      console.log(nuevosDatos)
  
      if (!obra) {
        return res.status(404).json({ error: 'Obra no encontrada' });
      }
  
      // Actualiza los datos de la obra con los nuevos datos
      await obra.update(nuevosDatos);
  
      return res.status(200).json({ message: 'Obra actualizada con éxito' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar la obra' });
    }
}



//BORRAR OBRA
export const borrarObra = async (req: Request, res: Response) => {

    const obraId = req.params.id; // Obtiene el ID de la obra de los parámetros de la URL
  
    try {
      // Busca la obra por su ID en la base de datos
      const obra = await Obra.findByPk(obraId);
  
      console.log(obraId);
      console.log(obra)

      await  obra?.destroy();
  
      return res.status(200).json({ message: 'Obra actualizada con éxito' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar la obra' });
    }
}


//OBTNER LAS DISTINTAS CATEGORIAS 
export const obtenerCategorias = async (req: Request, res: Response) => {
  try {
      const categoriasDistintas = await Obra.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('categoria')), 'categoria']]
      });

      // Extrae los valores de la respuesta de la base de datos
      const categorias = categoriasDistintas.map((obra) => obra.getDataValue('categoria'));

      res.json(categorias);
  } catch (error) {
      // Maneja errores apropiadamente
      res.status(500).json({ error: 'Ha ocurrido un error al obtener las categorías.' });
  }
};

//OBTENER LAS DISTINTAS CATEGORIAS Y DIRECCIONES:
export const obtenerCategoriasYDirecciones = async (req: Request, res: Response) => {
  try {
    const categoriasDirecciones = await Obra.findAll({
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.col('categoria')), 'categoria'],
        [sequelize.fn('GROUP_CONCAT', sequelize.col('direccion')), 'direcciones']
      ],
      group: ['categoria']
    });

    // Mapea los valores de la respuesta de la base de datos
    const categoriasConDireccion = categoriasDirecciones.map((obra) => ({
      categoria: obra.getDataValue('categoria'),
      direcciones: obra.getDataValue('direcciones').split(',') // Separa las direcciones en un array
    }));

    res.json(categoriasConDireccion);

} catch (error) {
    // Maneja errores apropiadamente
    res.status(500).json({ error: 'Ha ocurrido un error al obtener las categorías.' });
}
};

export const obtenerObrasRecientes = async (req: Request, res: Response) => {
  
      const listObras = await Obra.findAll({
          where: {
              reciente: "true" // Agrega la condición para seleccionar solo obras recientes
          },
      });

      res.json(listObras);
};


export const obtenerRetratos = async (req: Request, res: Response) => {
  
  const listRetratos = await Obra.findAll({
      where: {
          categoria: "Retratos"
      },
  });

  res.json(listRetratos);
}

export const obtenerCarteles = async (req: Request, res: Response) => {
  
  const listRetratos = await Obra.findAll({
      where: {
          categoria: "Carteles"
      },
  });

  res.json(listRetratos);
}


//RECIBIR OBRAS PARA LA GALERÍA SEGÚN LA CATEGORÍA SELECCIONADA
export const obtenerObrasGaleria = async (req: Request, res: Response) => {
  const categoria = req.params.categoria;

  const listObrasGaleria = await Obra.findAll({
    where: {
        categoria: categoria
    },
});

res.json(listObrasGaleria);
}
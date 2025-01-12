import { v4 as uuidv4 } from "uuid"

function getUUID() {
    return uuidv4();
}

async function paginate(model, page = 1, limit = 10, populateOptions = []){

    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    try {
        // Obtener los datos con paginación
        let query = model.find().skip(skip).limit(limitNumber);

        // Aplica las opciones de populate si existen
        if (populateOptions.length > 0) {
            populateOptions.forEach((option) => {
                query = query.populate(option);
            });
        }

        const data = await query;
        // Contar el total de documentos
        const total = await model.countDocuments();

        // Calcular el total de páginas
        const totalPages = Math.ceil(total / limitNumber);

        // Retornar la información paginada
        return { data, total, totalPages, currentPage: pageNumber};
    } catch (error) {
        throw new Error(`Error en la paginación: ${error.message}`);
    }
}
  
  
export {getUUID, paginate};
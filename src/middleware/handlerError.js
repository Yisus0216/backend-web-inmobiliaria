function handlerError(error,request,response,next){
    console.error(error)
    response.status(error.estatus || 500).json({
        succes: false,
        message: error.message || 'Error inesperado'
    }) // respondiendo con un mensaje de error generico 

   
}


export default handlerError
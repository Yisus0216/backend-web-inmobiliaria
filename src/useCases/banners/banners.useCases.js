import { isValidObjectId } from "mongoose";
import { Banner } from "../../models/index.js";
import {StatusHttp } from "../../lib/statusHttp.js"

//CRUD

// Crear Banner

async function createBanner(bannerData){
    const {title} = bannerData

    const existingBanner = await Banner.findOne({title})

    if(existingBanner){
        throw new StatusHttp(`Ya existe un banner con el nombre ${title}`)
    }


    const newBanner = await Banner.create(bannerData)

    return newBanner

    
}


// Obtener Banners

async function getAllBanners(){
    const banner = await Banner.find({})
    return banner
}

// Obtner Banner por Id 

async function getBannerById(id){

    // aqui ya no se valida si es un object id mongoose lo hace internamente 
     const getBanner = await Banner.findById(id)
    

    if(!getBanner){
        throw new StatusHttp(`No se encontro ningun banner con el identificador ${id}`,404)
    }

    return getBanner
}


// Actualizar un banner
async function updateBanner (id, newBannerData, file) {
  const banner = await Banner.findById(id)
  if (!banner) {
    throw new StatusHttp(`no existe un banner conel identificador ${id}`, 404)
  }
  if (file) {
    // Aquí podrías agregar la lógica para manejar el archivo multimedia, como guardarlo en un servicio de almacenamiento
    // y luego asignar su ID al campo `image` del newBannerData.
    // Por ejemplo:
    // const multimedia = await Multimedia.create({ file: file.path })
    // newBannerData.image = multimedia._id
  }
  const updatedBanner = await Banner.findByIdAndUpdate(id, newBannerData, { new: true }).populate('image', 'url')
  if (!updatedBanner) {
    throw new StatusHttp(`no existe un banner con el identificador ${id}`, 404)
  }
  return updatedBanner
}

// Eliminar un banner
async function deleteBanner (id) {
  const banner = await Banner.findByIdAndDelete(id)
  if (!banner) {
    throw new StatusHttp(`No existe un banner con el identificador ${id}`, 404)
  }
  return banner
}
export{
    createBanner,
    getAllBanners,
    getBannerById,
    updateBanner,
    deleteBanner


}
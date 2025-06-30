import { Characteristic } from "../../models/index.js";
import { StatusHttp } from "../../lib/statusHttp.js";
import { isValidObjectId } from "mongoose";


// CRUD crear caracteristicas 

async function createCharacteristic (characteristicData){
    const {name} = characteristicData

    const existingCharacteristic = await Characteristic.findOne({name})

    if(existingCharacteristic){
        throw new StatusHttp(`Ya existe una caracteristica con el nombre ${name}`, 400)
    }

    // Sino existe se tiene que crear 

    const newCharacteristic = await Characteristic.create(characteristicData)

    return newCharacteristic
}


//Obtenrr todas las caracteristicas 

async function getAllCharacteristics(){
    const characteristic = await Characteristic.find()

    return characteristic
}

// obtener caracteristicas por id o slug

async function getCharacteristicByIdOrSlug(identifier){
    const isObjectId = isValidObjectId(identifier)

    let characteristic 

    if(isObjectId){
        characteristic = await Characteristic.findById(identifier)
    }else{
        characteristic = await Characteristic.findOne({slug: identifier})
    }

    if(!characteristic){
        throw new StatusHttp(`No se encontro ninguna caracteristica con el identificador ${identifier}`,404)
    }

    return characteristic
}


// Actualizar caracteristica 

async function updateCharacteristic(newData,identifier){
    const isObjectId = isValidObjectId(identifier)

    let updatedCharacteristic
    if(isObjectId){
        updatedCharacteristic = await Characteristic.findByIdAndUpdate(identifier,newData,{new:true})
    }else{
         updatedCharacteristic = await Characteristic.findOneAndUpdate({slug: identifier},newData, {new:true})
    }

    if(!updatedCharacteristic){
        throw new StatusHttp(`no se encontro ninguna caracteristica con el identificador ${identifier}`, 404)
    }
    return updatedCharacteristic
}

// Eliminar una Caracteristica 

async function deleteCharacteristic(identifier){
    const isObjectId = isValidObjectId(identifier)

    let deletedCharacteristic

    if(isObjectId){
        deletedCharacteristic = await Characteristic.findByIdAndDelete(identifier)
    }else{
        deleteCharacteristic = await Characteristic.findOneAndDelete({slug:identifier})
    }

    if(!deletedCharacteristic){
        throw new StatusHttp (`No se encontro ninguna caracteristica con el identificador ${identifier}`, 404)
    }

    return deletedCharacteristic
}

export{
    createCharacteristic,
    getAllCharacteristics,
    getCharacteristicByIdOrSlug,
    updateCharacteristic,
    deleteCharacteristic
}
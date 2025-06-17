import { isValidObjectId } from "mongoose";
import { Amenity } from "../../models/index.js";


//CRUD

async function createAmenity(amenityData){
    const {name} = amenityData

    const existingAmenity = await Amenity.findOne({name})

    if(existingAmenity){
        throw new Error(`Ya existe una amenidad con el nombre ${name}`)
    }

    const newAmenity = await Amenity.create(amenityData)
    return newAmenity
}

async function getAllAmenities(){
    const amenities =await Amenity.find({})
    return amenities
}



export {
    createAmenity,
    getAllAmenities,
}
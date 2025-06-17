import { model } from 'mongoose'
import { Schema } from 'mongoose'

const amenitySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type:String,
        required:true,
        trim:true
    },

    image:{
        type: Schema.Types.ObjectId,
        ref: 'Multimedia'
    },
        
    
},{
    timestamps:true
})

export const Amenity = model('Amenity', amenitySchema  )
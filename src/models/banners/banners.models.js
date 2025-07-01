import { model, Schema } from "mongoose";

const bannersShema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },

    text:{
        type:String,
        required:true,
        trim:true
    },
    
    image:{
        type: Schema.Types.ObjectId,
        ref: 'Multimedia'
    },

    linkCta:{
        type:String,
        trim:true
    }
},{
    timestamps:true
})

export const Banner = model('Banner', bannersShema)
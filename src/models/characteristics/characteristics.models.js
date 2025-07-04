import { model, Schema } from "mongoose";

const characteristicsSchema = new Schema({
    name:{
        type:String,
        rquired:true,
        trim:true
    },

    description:{
        type:String,
        required:true,
        trim:true
    },

    image:{
         type: Schema.Types.ObjectId,
         ref: 'Multimedia'
    }
},{
    timestamps:true
})

export const Characteristic = model('Characteristic', characteristicsSchema)
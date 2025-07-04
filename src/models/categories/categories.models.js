import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        required:[true,'la Categoria es Obligatoria'],
        unique:true,
        trim: true
    },
    description:{
        type:String,
        required:[true,'la Descripcion es Obligatoria'],
        trim:true
    },
    image:{
        type: Schema.Types.ObjectId,
        ref: 'Multimedia'
    },
       
},{
    timestamps:true
})


export const Category = model('Category', categorySchema)
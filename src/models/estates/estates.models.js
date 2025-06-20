import { model, Schema } from "mongoose"

const estateSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
       
    },
    slug:{
        type: String,
        
        trim: true
       
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    prices:{
        type: Number,
        required: true,
        min: 0 
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'MXN'],
        default: 'MXN'
    },
    type: {
        type: String,
        
        enum: ['house', 'apartment', 'land', 'commercial'],
        default: 'house'
    },
    location_map: {
        //Todo: Especificar la forma en la que se va a guardar
        latitud:{
            type: String,
            
        },
        longitude: {
            type: Number,
        
        }
    },
    adress: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    state:{
        type: String,
        trim: true
    },
    country:{
        type: String,
        trim: true
    },
    postal_code:{
        type: String,
        trim: true
    },
    neightborhood:{
        type: String,
        trim: true
    },
    status:{
        type: String,
        trim: true,
       
        enum: ['available', 'sold', 'rented'],
        deafult: 'available'
    },
    show_adress: {
        type:  Boolean,
        default: true
    },
    amenities:[{
        type: Schema.Types.ObjectId,
        ref:'Amenities'
    }],
    category_id:[{
        type:Schema.Types.ObjectId,
        ref:'Category'
    }],
    related_estates: [{
        type:Schema.Types.ObjectId,
        ref: 'Estate'
    }],
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Multimedia',
    }],
    image_cover:{
        type: Schema.Types.ObjectId,
        ref:'Multimedia',
    },
}, {
    timestamps:true
})

//Esta línea crea un modelo de Mongoose a partir de un schema, y lo exporta para que puedas usarlo en otras partes del proyecto.


export const Estate = model('Estate', estateSchema)
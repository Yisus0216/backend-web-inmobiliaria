import { model, Schema } from "mongoose";

const multimediasSchema = new Schema({
    type:{
        type: String,
        trim:true
    },
    url:{
        type:String,
        trim:true
    },
    key:{
        type:String,
        trim:true
    },
    name:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
      entityId: {
    model: String,
    modelId: {
      type: Schema.Types.ObjectId,
      refPath: 'entityId.model'
    }
  }
},{
    timestamps:true
})

export const Multimedia = model('Multimedia',multimediasSchema)
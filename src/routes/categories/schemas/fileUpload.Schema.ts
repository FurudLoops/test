import { model, Schema } from "mongoose";
//var mongoose = require("mongoose");
//var Schema = mongoose.Schema;


const categorie_schema= new Schema({
    categorieID: Number,
    categorieName: String
});

const SchemaModel= model('SchemaModel', categorie_schema);

export default SchemaModel;
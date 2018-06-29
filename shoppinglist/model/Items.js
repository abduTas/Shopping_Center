var mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/sampleshoppingapp",function(err){
  if(err){
    console.log("Error connecting to Mongodb:")
    console.log(err)
  }else{
    console.log("Connected to MongoDB")
  }
})

var Schema = mongoose.Schema;

var ItemsListSchema = new Schema({
handle:String,
title:String,
body:String,
vendor:String,
type:String,
tags:{
	type:Array
},
imageSrc:String,
published:Boolean,
variants:{
	type:Array
},
quantity:Number,
price:Number,
sku:Number

});
var ItemsList = mongoose.model('itemslist',ItemsListSchema);


module.exports=mongoose.model('ItemsList',ItemsListSchema);

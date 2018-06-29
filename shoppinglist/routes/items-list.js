
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var csv = require("csvtojson")

var Items = require('../model/Items')

exports.convertCSVtoJSON = function(csvFilePath){
	return function(req,res){
		csv()
		  .fromFile(csvFilePath)
		  .then(function(list){ //when parse finished, result will be emitted here.
		  	var i=0;
		  	console.log("list",list[0])
		  	list.forEach(function(item){
		  			var shopping_item = {
		  				handle:item.Handle,
		  				title:item.Title,
		  				vendor:item.Vendor,
		  				type:item.Type,
		  				published:item.Published

		  			}
		  			var variants = []
		  			var variant ={}
		  			variant['quantity']= item["Variant Inventory Qty"]
		  			variant['imageSrc']= item["Image Src"]
		  			variant['sku']= item["Variant Price"]
		  			variant['price']= parseInt(item["Variant SKU"].slice(1))
		  			variant['color'] = item["Option1 Value"]
		  			variant['size'] = item["Option2 Value"]
		  			variants.push(variant)
		  			shopping_item['quantity']= item["Variant Inventory Qty"]
		  			shopping_item['imageSrc']= item["Image Src"]
		  			shopping_item['sku']= parseInt(item["Variant SKU"].slice(1))
		  			shopping_item['price']= item["Variant Price"]
		  			shopping_item['color'] = item["Option1 Value"]
		  			shopping_item['size'] = item["Option2 Value"]	
		  			shopping_item['tags'] = item.Tags.split(",")

		  			Items.findOne({handle:item.Handle},function(err,doc){
		  				if(doc){
			  				Items.update({handle:item.Handle},{$push:{variants:variant}},function(er,num){
			  					console.log("updated",doc)
			  				})
		  				}
		  				if(!doc){
		  					shopping_item['variants'] = variants
				  			var _item = new Items(shopping_item)
				  			_item.save(function(err) {
	                      if (err){
	                        console.log('Error Inserting doc :'+err);
	                        //res.send(err);
	                      }
	                      else {
	                      }
	                    })
		  				}
		  			})	  			
		  			console.log('saved :');

		  	})
  		 })

	}
}




exports.sendList = function(){
	return function(req,res){
		var finalResponse = {
			itemslist:[]
		}
		var products =[]
		Items.find({},function(err,list){

			list.forEach(function(item){
				finalResponse.itemslist.push(item)
			})
			res.json({
				message:"succes",
				items:finalResponse
			})
		})
	}
}


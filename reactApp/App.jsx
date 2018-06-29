   import React from 'react';
   import ReactDOM from 'react-dom';
    
    export default class App extends React.Component {

		constructor(props){
			super(props)

			this.state={
				items:[],
				nextPage:20,
				sku:'',
				searchmode:false,
				searchedObj:{}
			}
			this.getList();

		}
		getList(){
				  $.ajax({
				    url: 'http://localhost:5000/api/getlists',
				    type: 'GET',
				    success: function(rdata) {
				    console.log(rdata);
				    this.setState({items:rdata.items.itemslist})
				    }.bind(this),
				  })			
		}

		nextPage(nextPage){
			nextPage+=20
			this.setState({nextPage})
		}
		getProductForSku(sku){
			var items = this.state.items
			console.log("skus",items[0].sku)
			sku = parseInt(sku)
			let obj = items.find(o => o.sku === sku);
			console.log("obj",obj)
			this.setState({searchedObj:obj,searchmode:true})
		}

		changeSku(event){
			this.setState({sku:event.target.value})
		}

		render(){
			var items = this.state.items
			var offset = (this.state.nextPage>20)?this.state.nextPage-20:0;
			var initialitems= items.slice(offset,this.state.nextPage)
			var renderItems = initialitems.map(function(item){
				return(
					<li key={item.imageSrc}>
					<h4> {item.title}</h4>
					<h5>Price:{item.price?item.price:560}</h5>
					<img src = {item.imageSrc} height="300" width="300" />
					<hr />
					
					</li>
					)
			})
			var renderItem=[];
			if(this.state.searchmode){
				if(this.state.searchedObj){
				renderItem.push(
					<li key={this.state.searchedObj.imageSrc}>
					<h4> {this.state.searchedObj.title}</h4>
					<h5>Price:{this.state.searchedObj.price?this.state.searchedObj.price:560}</h5>
					<img src = {this.state.searchedObj.imageSrc} height="300" width="300" />
					<hr />
					
					</li>
					)
			}else{
				renderItem.push(<li>Product not found</li>)
			}
			}


			return(
				<div>
				<input value={this.state.sku} onChange={this.changeSku.bind(this)} />
				<button value="Search" onClick={this.getProductForSku.bind(this,this.state.sku)}>Search </button>
				<h3>Products</h3>
				<ul>{(!this.state.searchmode)?renderItems:renderItem}</ul>
				<button value="Next" onClick={this.nextPage.bind(this,this.state.nextPage)}>Next</button>
			</div>
			)

		}
    }
    
  
ReactDOM.render(<App />, document.getElementById('app'));
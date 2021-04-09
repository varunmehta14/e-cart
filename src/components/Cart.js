import React from 'react';

//Calling Bootstrap 4.5 css

//Calling Firebase config setting to call the data
import firebase from '../firebase';
const userId=1;



class Cart extends React.Component {
constructor(props) {
    
    super(props);
   
    this.state = {cartslist : [],productsDetail:[],total:0}

    }
    
    
  componentDidMount() {
   
   
     
      firebase.database().ref(`cart/${userId}`).on("value", snapshot => {
        let cartlist = [];
        let productDetail=[];
        snapshot.forEach(snap => {
            // snap.val() is the dictionary with all your keys/values from the 'students-list' path
            cartlist.push(snap.val());
            firebase.database().ref(`product/${snap.val()}`).on("value", snapshot => {
              
              productDetail.push(snapshot.val())
               console.log(productDetail);
               let total = 0;
               cartlist.forEach((data,key) => {
                 if(productDetail&&productDetail[key]&&productDetail[key].price){
                  total = total+productDetail[key].price;
                   
                   }
             }); 
              this.setState({productsDetail:productDetail, total});
         
  
        
             
        });});
        
        this.setState({ cartslist: cartlist });
       // console.log(snapshot);
       
      });
    
    
 }



 
  
  render(){
    console.log(this.state.productsDetail)  
    const{total}=this.state;
  return (
    <div className="MainDiv">
      <div class="jumbotron text-center bg-sky">
          <h3>Cart</h3>
      </div>
    
      <div className="container">
          <table id="example" class="display table">
            <thead class="thead-dark">
                <tr>
                    <th>User Id</th>
                    <th>Product Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    
                </tr>
            </thead>
           
            <tbody>
           
            {this.state.cartslist.map((data,key) => {
               
               // console.log(key);
               
              
               
                return (
                    <tr>
                    <td>{userId}</td>
                    <td>{data}</td>
                    
                    <td>{this.state.productsDetail&&this.state.productsDetail[key]&&this.state.productsDetail[key].name}</td>
                    <td>{this.state.productsDetail&&this.state.productsDetail[key]&&this.state.productsDetail[key].price }</td>
                    
                   
                   
                    </tr>
                   
                    
                );
               
                })}
           

        
               
            </tbody>
            
      
       
         </table>
         <h2>Total:{this.state.total}</h2>
          <a class="btn btn-primary" href="/">Back</a>
     </div>
    </div>
  );
}
}
export default Cart;
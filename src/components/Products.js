import React from 'react';

//Calling Bootstrap 4.5 css

//Calling Firebase config setting to call the data
import firebase from '../firebase';
class Products extends React.Component {
constructor(props) {
    
    super(props);
   
    this.state = {productslist : []}
    }
    
    
  componentDidMount() {
   
   
     
      firebase.database().ref("product").on("value", snapshot => {
        let productlist = [];
        snapshot.forEach(snap => {
            // snap.val() is the dictionary with all your keys/values from the 'students-list' path
            productlist.push(snap.val());
        });
        this.setState({ productslist: productlist });
        console.log(snapshot);
       
      });
    
    
 }
 
  
  render(){
    const handleAdd=(key)=>{
        let userCart=[key.toString()]
        firebase.database().ref("cart").on("value", snapshot => {
         console.log(snapshot.val()[1])
            // let cartlist = 
            // snapshot.map(snap => {console.log(snap.val())
            //   snap.val().toString()  
            // });
            // console.log(cartlist)
            // userCart=[...userCart,cartlist]
            // console.log(snapshot);
            snapshot.val()[1].forEach(o=>{
                userCart.push(o.toString())
            })
           
          });
        
        firebase.database().ref('cart/1').set(
            userCart
           
          );    
    console.log(key);
    }  
    const handleDelete=(key)=>{
        let userCart
        firebase.database().ref("cart").on("value", snapshot => {
         console.log(snapshot.val()[1])

            // let cartlist = 
            // snapshot.map(snap => {console.log(snap.val())
            //   snap.val().toString()  
            // });
            // console.log(cartlist)
            // userCart=[...userCart,cartlist]
            // console.log(snapshot);
            var idx = snapshot.val()[1].indexOf(key.toString());
            console.log(idx);
        //    // snapshot.val()[1].forEach(o=>{
        //         userCart.push(o.toString())
        //     })
        if(idx>-1){
            console.log(idx,snapshot.val()[1])
            userCart=snapshot.val()[1]
            userCart.splice(idx,1);
            console.log(userCart)
            firebase.database().ref('cart/1').set(
               userCart
               
              ); 
        }
          });
        
       
    }    
  return (
    <div className="MainDiv">
      <div class="jumbotron text-center bg-sky">
          <h3>List of Product</h3>
      </div>
    
      <div className="container">
          <table id="example" class="display table">
            <thead class="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Add</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {this.state.productslist.map((data,key) => {
                console.log(key);
                return (
                    <tr>     
                    <td>{data.name}</td>
                    <td>{data.price}</td>
                    <td><button onClick={()=>handleAdd(key+1)}>Add</button></td>
                    <td><button onClick={()=>handleDelete(key+1)}>Delete</button></td>
                    </tr>
                    
                );
               
                })}
        
               
            </tbody>
            
         </table>
          <a class="btn btn-primary" href="/cart">View Cart</a>
     </div>
    </div>
  );
}
}
export default Products;
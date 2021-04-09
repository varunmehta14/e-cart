import React from 'react';
import './App.css';
//Calling Bootstrap 4.5 css
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from './components/Products';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Cart from './components/Cart';
//Calling Firebase config setting to call the data

class App extends React.Component {

  
  render(){
    
  return (
    <Router >
    <Switch>
        <Route path="/" exact component={Products} />
        <Route path="/cart" component={Cart} />
       
       
    </Switch>
</Router>
  );
}
}
export default App;
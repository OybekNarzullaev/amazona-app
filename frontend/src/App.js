import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import CardScreen from './screens/CardScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
      <div className='grid-container'>
        <header class="row">
          <div>
            <a class="brand" href="/">amazona</a>
          </div>
          <div>
            <a href="/card">Card</a>
            <a href="/signin">Sign In</a>
          </div>
        </header>
        <main>
          <Route path='/card/:id?' component={CardScreen}></Route>
          <Route path='/product/:id' component={ProductScreen}></Route>
          <Route path='/' component={HomeScreen} exact></Route>
        </main>
        <footer class="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

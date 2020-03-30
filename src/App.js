import React from "react";
import "./App.css";
import { CounterBody, reducer } from './components/counter';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

function App() {
  let store = createStore(reducer);
  return (
    <div className="App">
      <Provider store ={store}>
        <CounterBody />
      </Provider>
    </div>
  );
}

export default App;
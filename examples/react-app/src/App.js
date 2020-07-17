import React from 'react';
import './App.css';
import './gifbox';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <gif-box className="App-logo" keyword="happiness"></gif-box>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'


import React, { useState, useEffect } from 'react';

function App() {
   const [data, setData] = useState('');

   useEffect(() => {
       fetch('http://localhost:3000/')
           .then(response => response.text())
           .then(data => setData(data));
   }, []);

   return (
       <div className="App">
           <h1>{data}</h1>
       </div>
   );
}

export default App;

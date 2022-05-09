// import "../css/global.css";
// import "../css/home.css";
import "../css/listaProductos.css";

import React from "react";
import ListaProductos from "./ListaProductos";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <h2> Productos</h2>
        </header>
        <ListaProductos />
      </div>
    </React.Fragment>
  );
}

export default App;

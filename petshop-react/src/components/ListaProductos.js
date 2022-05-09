import React, { Component } from "react";
import TarjetaProducto from "./TarjetaProducto";

class ListaProductos extends Component {
  constructor() {
    super();
    this.state = {
      productos: [],
    };
  }
  componentDidMount() {
    fetch("/api/productos")
      .then((response) => {
        return response.json();
      })
      .then((productos) => {
        // console.log(productos);
        this.setState({ productos: productos.data });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <React.Fragment>
        <div className="listaProductos-wrapper">
          <h2>Todos los productos de la Base de datos</h2>
          <section>
            <table>
              <thead>
                <tr>
                  <td>Imagen</td>
                  <td>Nombre</td>
                  <td>Descripcion</td>
                  <td>Precio</td>
                </tr>
              </thead>
              <tbody>
                {this.state.productos.map((producto, index) => {
                  return <TarjetaProducto {...producto} key={index} />;
                })}
              </tbody>
            </table>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default ListaProductos;

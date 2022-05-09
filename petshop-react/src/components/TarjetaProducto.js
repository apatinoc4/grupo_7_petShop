import React from "react";

function TarjetaProducto(props) {
  return (
    <React.Fragment>
      <tr>
        <td>
          <img src="" className="imgProducto"></img>
        </td>
        <td>{props.nombre}</td>
        <td>{props.descripcion}</td>
        <td>{props.precio}</td>
      </tr>
    </React.Fragment>
  );
}

export default TarjetaProducto;

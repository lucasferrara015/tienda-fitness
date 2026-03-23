import React from "react";
import { useCarrito } from "../hooks/useCarrito";
import "./Carrito.css";

const Carrito: React.FC = () => {
  const { carrito, removeItem, increaseQuantity, decreaseQuantity } =
    useCarrito();

  // Calcular monto acumulado
  const total = carrito.reduce(
    (acc, item) => acc + (Number(item.precio) || 0) * (item.cantidad || 1),
    0
  );

  return (
    <div id="carrito" className="carrito-container">
      <h2>Tu Carrito</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        carrito.map((item) => (
          <div key={item.id} className="carrito-item">
            <span>{item.nombre}</span>
            <span>${item.precio}</span>
            <div className="carrito-actions">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.cantidad}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
              <button onClick={() => removeItem(item.id)}>Quitar</button>
            </div>
          </div>
        ))
      )}
      <hr />
      <h3>Total: ${total}</h3>
    </div>
  );
};

export default Carrito;

import React, { useState, useEffect } from "react";
import { useCarrito } from "../hooks/useCarrito";
import "./Carrito.css";

const Carrito: React.FC = () => {
  const { carrito, increaseQuantity, decreaseQuantity, removeItem, total } =
    useCarrito();
  const [mensajePago, setMensajePago] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    if (status === "approved")
      setMensajePago("✅ Pago aprobado. Tu pedido fue registrado.");
    if (status === "failure")
      setMensajePago("❌ Pago rechazado. Intenta nuevamente.");
    if (status === "pending") setMensajePago("⏳ Pago pendiente.");
  }, []);

  const pagar = async () => {
    try {
      const pedidoRes = await fetch(
        "https://lucasferrara015dev.pythonanywhere.com/api/crear-pedido",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "cliente@test.com",
            nombre: "Cliente Test",
            direccion: "Calle Falsa 123",
            carrito: carrito.map((item) => ({
              id: item.id,
              nombre: item.nombre,
              precio: item.precio,
              cantidad: item.cantidad,
            })),
          }),
        }
      );
      const pedidoData = await pedidoRes.json();
      const pedidoId = pedidoData.pedido_id;

      const prefRes = await fetch(
        "https://lucasferrara015dev.pythonanywhere.com/api/crear-preferencia",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pedido_id: pedidoId,
            carrito: carrito.map((item) => ({
              nombre: item.nombre,
              cantidad: item.cantidad,
              precio: item.precio,
            })),
          }),
        }
      );
      const prefData = await prefRes.json();

      if (prefData.init_point) {
        window.location.href = prefData.init_point;
      } else {
        alert("Error al iniciar el pago");
      }
    } catch (error) {
      console.error("Error en el flujo de pago:", error);
      alert("Hubo un problema al procesar el pago");
    }
  };

  return (
    <div id="carrito" className="carrito-container">
      <h2>🛒 Tu Carrito</h2>

      {mensajePago && <div className="aviso">{mensajePago}</div>}

      {carrito.length === 0 && <p>No hay productos en el carrito.</p>}

      {carrito.map((item) => (
        <div key={item.id} className="carrito-item">
          <span className="item-nombre">{item.nombre}</span>
          <span className="item-precio">${item.precio}</span>
          <div className="cantidad-control">
            <button
              className="btn-cantidad"
              onClick={() => decreaseQuantity(item.id)}
            >
              -
            </button>
            <span className="cantidad-numero">{item.cantidad}</span>
            <button
              className="btn-cantidad"
              onClick={() => increaseQuantity(item.id)}
            >
              +
            </button>
          </div>
          <button className="btn-quitar" onClick={() => removeItem(item.id)}>
            Quitar
          </button>
        </div>
      ))}

      {carrito.length > 0 && (
        <>
          <hr />
          <h3>
            Total:{" "}
            <span className="total">
              ${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
            </span>
          </h3>
          <button onClick={pagar} className="btn-pagar">
            Finalizar compra
          </button>
        </>
      )}
    </div>
  );
};

export default Carrito;

import React, { useState } from "react";

const Formulario: React.FC = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://lucasferrara015dev.pythonanywhere.com/api/suscribir",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      setMensaje(data.mensaje); // guarda el mensaje en el estado
    } catch (error) {
      console.error("Error en la suscripción:", error);
      setMensaje("Hubo un problema al suscribirte");
    }
  };

  return (
    <div className="subscribe container-fluid my-5 py-5 text-center">
      <h4 className="display-4 text-white font-weight-bold mt-5 mb-3">
        Suscríbete a FitShop
      </h4>
      <p className="text-white mb-4">
        Recibe ofertas exclusivas, lanzamientos de productos y consejos fitness
        directamente en tu correo
      </p>
      <form
        className="form-inline justify-content-center mb-5"
        onSubmit={handleSubmit}
      >
        <div className="input-group">
          <input
            type="email"
            className="form-control-lg"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              Suscribirme
            </button>
          </div>
        </div>
      </form>

      {/* Mensaje estilizado */}
      {mensaje && (
        <p className="mt-3" style={{ color: "#28a745", fontWeight: "bold" }}>
          {mensaje}
        </p>
      )}
    </div>
  );
};

export default Formulario;

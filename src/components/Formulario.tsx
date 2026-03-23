import React from "react";

const Formulario: React.FC = () => {
  return (
    <div className="subscribe container-fluid my-5 py-5 text-center">
      <h4 className="display-4 text-white font-weight-bold mt-5 mb-3">
        Suscríbete a FitShop
      </h4>
      <p className="text-white mb-4">
        {" "}
        Recibe ofertas exclusivas, lanzamientos de productos y consejos fitness
        directamente en tu correo
      </p>
      <form className="form-inline justify-content-center mb-5">
        <div className="input-group">
          <input
            type="email"
            className="form-control-lg"
            placeholder="Tu correo electrónico"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              Suscribirme
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Formulario;

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string;
  descripcion: string;
}

export interface ProductoCarrito extends Producto {
  cantidad: number;
}

interface CarritoContextType {
  carrito: ProductoCarrito[];
  addItem: (producto: Producto) => void;
  removeItem: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

export const CarritoContext = createContext<CarritoContextType | undefined>(
  undefined
);

export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Estado inicial: leer de localStorage
  const [carrito, setCarrito] = useState<ProductoCarrito[]>(() => {
    const saved = localStorage.getItem("carrito");
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const addItem = (producto: Producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const removeItem = (id: number) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const increaseQuantity = (id: number) => {
    setCarrito((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p))
    );
  };

  const decreaseQuantity = (id: number) => {
    setCarrito((prev) => {
      const producto = prev.find((p) => p.id === id);
      if (!producto) return prev;

      if (producto.cantidad === 1) {
        // eliminar el producto si llega a 0
        return prev.filter((item) => item.id !== id);
      } else {
        // reducir cantidad normalmente
        return prev.map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        );
      }
    });
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }
  return context;
};

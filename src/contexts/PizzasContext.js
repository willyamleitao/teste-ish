import React, { createContext, useState, useEffect } from 'react';
import pizzasData from '../data/pizzasData';

const PizzasContext = createContext();

const PizzasProvider = ({ children }) => {
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
      setPizzas(pizzasData);
    }, []);

  return (
    <PizzasContext.Provider value={pizzas}>
      {children}
    </PizzasContext.Provider>
  );
};

export { PizzasProvider, PizzasContext };
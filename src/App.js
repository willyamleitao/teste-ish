import './App.scss';
import pizzaImg from './assets/pizza.jpg'
import React, { useState, useEffect } from 'react'
import pizzasData from './data/pizzasData';
import Modal from './components/modal'

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderTime, setOrderTime] = useState(0);
  

  useEffect(() => {
    setPizzas(pizzasData);
  }, []);

  useEffect(() => {
    let sum = 0;  
    order.forEach((item) => {
      sum += item.quantity * item.price;
    });
    setTotalPrice(sum);
  }, [order]);

  const selectPizza = (key) => {
    const selected = pizzas.find((item) => item.name === key);
    const existingPizza = order.find((pizza) => pizza.name === key);

    if (existingPizza) {
      const updatedOrder = order.map((pizza) =>
        pizza.name === key ? { ...pizza, quantity: pizza.quantity + 1 } : pizza
      );
      setOrder(updatedOrder);
    } else {
      setOrder([...order, { ...selected, quantity: 1 }]);
    }
  };

  const handleAddRemove = (key, operation) => {
    if (operation === 'add') {
      const updatedOrder = order.map((pizza) =>
        pizza.name === key ? { ...pizza, quantity: pizza.quantity + 1 } : pizza
      );
      setOrder(updatedOrder);
    } else {
      const updatedOrder = order.map((pizza) =>
        pizza.name === key
          ? { ...pizza, quantity: pizza.quantity - 1 }
          : pizza
      ).filter((pizza) => pizza.quantity > 0);
      setOrder(updatedOrder);
    }
  };

  const orderPizzas = async () => {
    try {
      const response = await fetch(process.env.PUBLIC_URL + '/server/order.json');  
      const orderData = await response.json();
      setOrderTime(orderData.deliveryTime/ (1000 * 60));
      setOrder([]);
    } catch (error) {
      console.error(error.message);
    }
  }; 

  return (
    <div className="App">
      <div className='pizza-section'>
        <h1>Pizzas</h1>
      <div className='pizza-holder'>
        {pizzas.map((pizza) => (
          <div className='pizza' key={pizza.name}>
              <img src={pizzaImg} alt='pizza'></img>
              <h2>{pizza.name}</h2>
              <p>Price: ${pizza.price}</p>
              <p>Ingredients: {pizza.ingredients.join(', ')}</p>
              <button onClick={() => selectPizza(pizza.name)}>add to order</button>
          </div>
        ))}
      </div>
      </div>
      <div className='orders'>
      <h1>Order Summary</h1>
        {order.map((item) => (
          <div key={item.name} className='pizzasQnt'>

            <span>{item.quantity}x {item.name}</span>
            <button onClick={() => handleAddRemove(item.name, 'remove')} className='addRemove'>-</button>
            <button onClick={() => handleAddRemove(item.name, 'add')} className='addRemove'>+</button>
          </div>
        ))}
        {order.length>0 ? (
          <div>
          <div className='total'>your total: ${totalPrice}</div>
          <button className='order-btn' onClick={() => orderPizzas()}>Order</button>
          </div>
        ):(
          <div>empty, add a pizza.</div>
        )}                
      </div>

      {orderTime>0 && (
          <Modal orderTime={orderTime} onClose={()=>setOrderTime(0)} />
        )}
    </div>
  );
}

export default App;

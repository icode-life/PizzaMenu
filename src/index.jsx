import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];


function App(){
    return (
    <div>
        <Header />
        <Menu />
        <Footer />
    </div>
    );
}

const Header = () => {
    //put style in a variable
    //const style = {color: "red", fontSize: "48px", textTransform: "uppercase"}
    //then I can change the tag to include my style : <h1 style={style}>Fast React pizza co.</h1>

    return (
    <header className="header">
        <h1>Fast React pizza co.</h1>
    </header>
    )
}

const Menu = () => {
  const stockAvailable = pizzaData.length;
    return (
        <main className="menu">
            <h2>Our Menu:</h2>
            {stockAvailable > 0 ? (
              <> {/*this <> represent teh beginning of a jsx fragment. 
              it ends with </>. and is used to wrap several divs in a parent with adding a div which might mess up the css applied.
              Now, if for some reason we iterate on an array with map, we would need a key,
              then the fragments has to be fully named <React.Fragment key="..."></React.Fragment> */}
              <p>
                Authentic Italian cuisine. 6 creative dishesto choose from. 
                All from our stone oven, all organic, all delicious.
              </p>
              <ul className="pizzas">{pizzaData.map(pizza => <Pizza pizzaObj={pizza} key={pizza.name} />)}</ul> </>
              ) : (
              <p>Sorry, we're out of stock for the moment, please come back later</p>)}
        </main>);
}

// props are destructured here so it's shorter to call the different props in jsx
const Pizza = ({pizzaObj}) => {
    return (
        <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}> {/**here we conditionally add a classname if the pizza is sold out.
         *  so it renders the grey-out effect thanks to the added css */}
            <img src={pizzaObj.photoName} alt={pizzaObj.name}/>
            <div>
              <h3>{pizzaObj.name}</h3>
              <p>{pizzaObj.ingredients}</p>
              {pizzaObj.soldOut ? <span>"SOLD OUT"</span> : <span>price: {pizzaObj.price + 2}</span>}
            </div>
        </li>
    );
}

const Footer = () => {
    const hour = new Date().getHours();
    const openTime = 8;
    const closeTime = 22;
    const isOpen = (hour >= openTime && hour <= closeTime);

    if (!isOpen){
      return (<footer className="footer"><div className="order"><p>Sorry, we're closed at this time, come back later!</p></div></footer>);
    }

    return (
      <footer className="footer">
        {isOpen && (
        <div className="order">
          <p>We're open until {closeTime}:00. Come visit us!</p>
          <button className="btn">Order</button>
        </div>)}
      </footer>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
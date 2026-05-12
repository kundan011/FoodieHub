import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FoodCard from "../components/FoodCard";
import Categories from "../components/Categories";
import Services from "../components/Services";
import Footer from "../components/Footer";
import foodData from "../data/foodData";

function Home() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("foodCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [category, setCategory] = useState("All");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("foodUser");

    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);
      } catch (error) {
        console.log("Invalid user data");

        localStorage.removeItem("foodUser");
      }
    }
  }, []);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem,
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...item,
          quantity: 1,
        },
      ];
    }

    setCart(updatedCart);

    localStorage.setItem("foodCart", JSON.stringify(updatedCart));
  };

  const filteredFoods =
    category === "All"
      ? foodData
      : foodData.filter((item) => item.category === category);

  return (
    <>
      <Navbar cartCount={cart} />

      <Hero />

      <Categories setCategory={setCategory} />

      <div className="food-grid">
        {filteredFoods.map((item) => (
          <FoodCard key={item.id} item={item} addToCart={addToCart} />
        ))}
      </div>

      {/* <Services /> */}

      <Footer />
    </>
  );
}

export default Home;

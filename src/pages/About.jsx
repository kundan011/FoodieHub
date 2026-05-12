import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";

function About() {
  return (
    <>
      <Navbar cartCount={[]} user={null} />
      <div className="about-page">
        <BackButton />
        <h1>About FoodieHub</h1>
        <p>
          FoodieHub is a modern online food delivery platform built for people
          who refuse to compromise on taste or speed. We partner with the best
          local restaurants to bring fresh, delicious meals straight to your
          doorstep — in under 30 minutes.
        </p>
        <br />
        <p>
          Founded in 2024, our mission is simple: make great food accessible to
          everyone, everywhere. Whether it's a late-night craving or a family
          dinner, FoodieHub has you covered.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default About;

import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const About = () => {
  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <div className="banner">
            <div className="top">
              <h1 className="heading">ABOUT US</h1>
              <p>Our passion for authentic South Indian cuisine is unmatched.</p>
            </div>
            <p className="mid">
              Welcome to our South Indian restaurant, where tradition and taste come together to create a delightful culinary experience. We are committed to serving you the finest and freshest dishes, from crispy dosas to rich sambar, all made with the highest quality ingredients. Whether you're a fan of the spicy flavors of Chettinad cuisine or the creamy goodness of coconut-based gravies, our menu offers a variety of dishes that reflect the diverse flavors of South India. Come indulge in a meal that will transport your taste buds to the heart of the South!
            </p>
            <Link to={"/"}>
              Explore Menu{" "}
              <span>
                <HiOutlineArrowRight />
              </span>
            </Link>
          </div>
          <div className="banner">
            <img src="about.png" alt="about" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

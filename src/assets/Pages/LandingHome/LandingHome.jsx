import React, { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from "./LandingHome.module.css";
import Loader from "../../Components/Loader/Loader";

// Lazy-loaded sections
const CodeSection = lazy(() => import("./section/CodeSection"));
const GrowSection = lazy(() => import("./section/GrowSection"));
const FindSection = lazy(() => import("./section/FindSection"));
const BotPromo = lazy(() => import("./section/BotPromo"));

function LandingHome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);

  const heroImages = [
    "/img/i-have-Question.webp",
    "/img/ask_Q.webp",
    "/img/ask-get-answer.webp",
  ];

  // Preload hero images
  useEffect(() => {
    Promise.all(
      heroImages.map((src) => {
        const img = new Image();
        img.src = src;
        return new Promise((res) => (img.onload = res));
      })
    ).then(() => setLoading(false));
  }, []);

  useEffect(() => { 
    const timer = setTimeout(() => setLoading(false), 2000); return () => clearTimeout(timer); }, []);

  if (loading) return (<div className="loader-container">
      <Loader />
    </div>);

  return (
    <div className={style.all_landing}>
      {/* HERO SECTION */}
      <div
        className={style.hero_container_bg}
        style={{
          backgroundImage: `
            linear-gradient(rgba(249,150,10,0.27), rgba(35,85,185,0.27)),
            url(${heroImages[active]})
          `,
        }}
      >
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={3000}
          onChange={(i) => setActive(i)}
        >
          {heroImages.map((_, i) => (
            <div key={i} className={style.emptySlide}></div>
          ))}
        </Carousel>

        <div className={style.hero_container_title}>
          <div>
            <p>A community built on curiosity and shared knowledge</p>
            <h2>Ask Boldly.</h2>
            <h2>Get Answers, Instantly</h2>
          </div>
          <button onClick={() => navigate("/login")}>Join Us</button>
        </div>
      </div>

      {/* LAZY LOADED SECTIONS */}
      <Suspense fallback={<Loader />}>
        <CodeSection />
        <GrowSection />
        <FindSection />
        <BotPromo />
      </Suspense>

      {/* FOOTER */}
      <footer className={style.footer}>
        <small>
          Developed by <span>Mohamed Abdu</span> • © {new Date().getFullYear()} Gc
          <br />
    Feedback? Reach me on {""}
    <a href="https://t.me/Methiopy" target="_blank" rel="noopener noreferrer" style={{ color: "#4f6ef7", fontWeight: "bold" }} >
      Telegram
    </a>
        </small>
      </footer>
    </div>
  );
}

export default LandingHome;

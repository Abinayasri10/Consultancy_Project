import React from "react";
import { ArrowRight, Leaf, Brain, TrendingUp, Shield, Users, Award, Target, Beaker, Sprout, ShieldCheck, Microscope } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import "../styles/home.css";

function HomePage() {
  const carouselImages = [
    { url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2000", title: "Smart Crop Protection", sub: "Data-driven solutions for healthier yields." },
    { url: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=2000", title: "Advanced Formulations", sub: "Scientifically proven pesticides for maximum impact." },
    { url: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=2000", title: "Sustainable Future", sub: "Eco-conscious farming with intelligent pest control." },
    { url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000", title: "Expert Support", sub: "24/7 AI-powered agricultural assistance." },
    { url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2000", title: "Trusted Quality", sub: "Anand Agro Agencies: Your partner in growth." }
  ];

  const categories = [
  { 
    title: "Herbicides", 
    image: "https://eu-images.contentstack.com/v3/assets/bltdd43779342bd9107/blt7190e338d3ec90cf/685306dc3dba2319ce3d32dc/0623M-3738A-1800x1012.jpg?width=1280&auto=webp&quality=80&disable=upscale", 
    count: "45+ Products", 
    description: "Selective weed control to protect crop nutrients." 
  },
  { 
    title: "Fungicides", 
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800", 
    count: "30+ Products", 
    description: "Advanced protection against blight and fungal diseases." 
  },
  { 
    title: "Insecticides", 
    image: "https://static.vecteezy.com/system/resources/thumbnails/042/234/557/small/ai-generated-person-using-plant-based-insecticide-spray-for-eco-friendly-gardening-and-pest-control-in-agriculture-photo.jpeg", 
    count: "50+ Products", 
    description: "Highly effective solutions for pest-free harvests." 
  },
  { 
    title: "Growth Promoters", 
    image: "https://img.4imz.com/media/A5A57I3L/upload/plant-growth-promoter-gujarat-1713346281.jpeg", 
    count: "20+ Products", 
    description: "Bio-stimulants to maximize your yield potential." 
  },
  { 
    title: "Research & R&D", 
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=800", 
    count: "Innovation Hub", 
    description: "Our scientists work 24/7 to develop safer agro-chemicals." 
  },
  { 
    title: "Our Network", 
    image: "https://www.panna.org/wp-content/uploads/2025/08/overhead-pesticide-spray-768x482.jpg", 
    count: "Pan India", 
    description: "Supplying high-quality products to over 10,000+ dealers." 
  }
];

  return (
    <div className="home-page">
      {/* 1. HERO SLIDER */}
      <section className="hero-carousel">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          navigation
          className="mySwiper"
        >
          {carouselImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="slide-inner" style={{ backgroundImage: `url(${img.url})` }}>
                <div className="slide-overlay">
                  <div className="container">
                    <div className="slide-text">
                      <span className="badge">Anand Agro Intelligence</span>
                      <h1>{img.title}</h1>
                      <p>{img.sub}</p>
                      <div className="hero-cta">
                        <button className="btn btn-success">
                          Find Solution <ArrowRight size={18} style={{ color: 'white',marginLeft: '8px' }} />
                        </button>
                        <button className="btn btn-outline">
                          <a href="/products">Our Products</a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 2. CATEGORY QUICK-GRID */}
      <section className="category-section-container">
        <div className="section-header">
          <span className="subtitle">OUR EXPERTISE</span>
          <h2>Specialized <span className="text-green">Solutions</span></h2>
          <p>Explore our research-backed chemical categories for every crop stage</p>
        </div>
  
        <div className="category-grid">
          {categories.map((cat, i) => (
            <div className="cat-card-modern" key={i}>
              <div className="cat-image-wrapper">
                <img src={cat.image} alt={cat.title} />
                <div className="cat-overlay">
                  <div className="overlay-content">
                    <h4>{cat.title}</h4>
                    <p>{cat.description}</p>
                    <button className="btn-mini">View Range <ArrowRight size={14} /></button>
                  </div>
                </div>
              </div>
              <div className="cat-info-bottom">
                <h4>{cat.title}</h4>
                <span className="count-tag">{cat.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      

      {/* 3. ABOUT & VISION (Company Centric) */}
      <section className="about-modern container">
        <div className="about-wrapper">
          <div className="about-images">
            <img src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=800" alt="Laboratory" className="img-main" />
            <div className="experience-badge">
              <h3 style={{ color: "white", fontWeight: "bold" }}>25+</h3>
              <p style={{ color: "white", fontWeight: "bold" }}>Years of Trust</p>
            </div>
          </div>
          <div className="about-content">
            <span className="pre-title">WHO WE ARE</span>
            <h2>Empowering Farmers Through <span className="text-green">Innovation</span></h2>
            <p>At <strong>Anand Agro Agencies</strong>, we don't just sell pesticides; we provide a shield for your livelihood. Our integration of AI pest detection with world-class chemical engineering ensures your crops get exactly what they need.</p>
            <ul className="check-list">
              <li><ShieldCheck className="text-green"/> Government Certified Formulations</li>
              <li><ShieldCheck className="text-green"/> Precision Dosage Calculations</li>
              <li><ShieldCheck className="text-green"/> Environmentally Conscious Shipping</li>
            </ul>
            <button className="btn btn-second">Learn Our History</button>
          </div>
        </div>
      </section>
      

      {/* 4. INNOVATIVE SECTION: SEASONAL CALENDAR */}
      <section className="seasonal-advisory">
        <div className="container">
          <div className="glass-card">
            <div className="advisory-text">
              <TrendingUp size={48} className="text-green" />
              <h2>Current Seasonal Advisory</h2>
              <p>Our AI has detected a high risk of <strong>Bollworm</strong> in South Karnataka due to recent humidity levels. Check recommended sprays now.</p>
            </div>
            <button className="btn btn-primary">View Risk Map</button>
          </div>
        </div>
      </section>

      {/* 5. TRUSTED BY SECTION */}
      <section className="partners container">
        <p className="text-center">Authorized Distributors for Global Brands</p>
        <div className="logo-flex">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f7/Bayer_logo.svg" alt="Bayer" />
          <img src="https://upload.wikimedia.org/wikipedia/en/d/d3/Syngenta_Logo.svg" alt="Syngenta" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/40/BASF-Logo_bw.svg" alt="BASF" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/UPL_logo.png" alt="UPL" />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
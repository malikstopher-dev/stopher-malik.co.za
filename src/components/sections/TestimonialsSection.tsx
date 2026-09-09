"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    quote: "Stopher delivered our website in record time and it looked absolutely amazing. We've been getting enquiries ever since we launched. Highly recommend to any business owner.",
    author: "Salem Home Innovation",
    role: "Home Services, Johannesburg",
    avatar: "SH",
  },
  {
    quote: "Stopher criou um site profissional, limpo e fácil de entender para o nosso negócio. O trabalho ficou bem organizado, moderno e ajudou a apresentar melhor os nossos serviços aos clientes.",
    author: "JMOTO Electrical",
    role: "Serviços Elétricos, Gauteng",
    avatar: "JM",
  },
  {
    quote: "Professional, fast, and understood exactly what we needed. Our restaurant site has made bookings so much easier. Very pleased with the result and the whole experience.",
    author: "101 On Fraser",
    role: "Restaurant, Johannesburg",
    avatar: "101",
  },
  {
    quote: "From zero online presence to qualified leads every day. The SEO work alone has been worth every rand. Highly recommend SMK Web Design.",
    author: "John K.",
    role: "Solar Company Director",
    avatar: "JK",
  },
];

export function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mobileQuery.matches);
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      setCurrentSlide((slide) => Math.min(slide, testimonials.length - (e.matches ? 1 : 2)));
    };
    mobileQuery.addEventListener("change", handler);
    return () => mobileQuery.removeEventListener("change", handler);
  }, []);

  const visibleSlides = isMobile ? 1 : 2;
  const maxSlide = testimonials.length - visibleSlides;

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, maxSlide)));
  };

  return (
    <section className="testimonials py-5xl" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="testimonials__header mb-12">
          <h2 id="testimonials-heading" className="section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
            Testimonials
          </h2>
        </div>

        <div className="testimonials__slider" data-reveal>
          <div 
            className="testimonials__track flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-slide flex-shrink-0 w-full" style={{ width: `${100 / visibleSlides}%` }} aria-hidden={index < currentSlide || index >= currentSlide + visibleSlides}>
                <article className="testimonial-card card p-6 h-full" data-tilt>
                  <p className="testimonial-card__quote text-white text-body-lg leading-relaxed mb-6">
                    {testimonial.quote}
                  </p>
                  <div className="testimonial-card__author flex items-center gap-4">
                    <div className="testimonial-card__avatar w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-display font-bold text-lg" aria-hidden="true">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="testimonial-card__name text-white font-display font-semibold">{testimonial.author}</p>
                      <p className="testimonial-card__role text-white-muted text-sm">{testimonial.role}</p>
                      <div className="testimonial-card__stars flex gap-1 mt-2" aria-label="5 out of 5 stars">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="testimonial-card__star w-5 h-5 text-accent-gold" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <polygon points="10,1 12.8,6.7 19,7.6 14.5,12 15.6,18.2 10,15.2 4.4,18.2 5.5,12 1,7.6 7.2,6.7" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <div className="testimonials__nav flex justify-center gap-4 mt-8">
            <button
              className="testimonials__btn p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => goToSlide(currentSlide - 1)}
              disabled={currentSlide === 0}
              aria-label="Previous testimonial"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="testimonials__btn p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => goToSlide(currentSlide + 1)}
              disabled={currentSlide >= maxSlide}
              aria-label="Next testimonial"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import Header from '../components/Header';
import BannerCarousel from '../components/BannerCarousel';
import AboutSection from '../components/AboutSection';
import CoursesSection from '../components/CoursesSection';
import InstructorsSection from '../components/InstructorsSection';
import TestimonialSection from '../components/TestimonialSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <BannerCarousel />
        <AboutSection />
        <CoursesSection />
        <InstructorsSection />
        <TestimonialSection />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;

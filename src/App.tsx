/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  WashingMachine, 
  Waves, 
  Clock, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Star, 
  Calendar, 
  CheckCircle2, 
  Menu, 
  X,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useState, useEffect } from 'react';

const colors = {
  purple: {
    base: '#5A1DBA',
    light: '#7B2FF7',
    dark: '#3A0CA3',
  },
  gold: {
    base: '#F4A100',
    light: '#FFC300',
  },
  neutral: {
    white: '#FFFFFF',
    grey: '#F5F5F7',
    dark: '#1A1A1A',
  }
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const services = [
    {
      id: 'washing',
      title: 'Washing',
      description: 'Expert cleaning using premium detergents and high-tech machines to preserve fabric quality.',
      icon: <WashingMachine className="w-8 h-8 text-brand-gold" />,
      image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'ironing',
      title: 'Ironing & Folding',
      description: 'Professional steam ironing and expert folding for that crisp, fresh look every time.',
      icon: <Waves className="w-8 h-8 text-brand-gold" />,
      image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'delivery',
      title: 'Pickup & Delivery',
      description: 'Convenient doorstep service. We pick up your dirty clothes and return them clean and fresh.',
      icon: <Truck className="w-8 h-8 text-brand-gold" />,
      image: '/src/assets/images/regenerated_image_1777868553467.png'
    }
  ];

  const features = [
    {
      title: 'Fast Turnaround',
      description: 'Get your clothes back in record time without compromising on quality.',
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: 'Affordable Pricing',
      description: 'Premium service at competitive rates that fit your budget.',
      icon: <Star className="w-6 h-6" />,
    },
    {
      title: 'Professional Care',
      description: 'Our experienced staff handles every garment with specialized attention.',
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      title: 'Doorstep Delivery',
      description: 'Hassle-free service that brings professional cleaning right to your home.',
      icon: <MapPin className="w-6 h-6" />,
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Schedule Pickup',
      description: 'Call us or book online to set a time that works for you.',
    },
    {
      step: '02',
      title: 'We Clean',
      description: 'Our team treats your clothes to a professional cleaning process.',
    },
    {
      step: '03',
      title: 'Quick Delivery',
      description: 'Fresh, neat clothes delivered back to your doorstep.',
    }
  ];

  const phoneNumbers = ["08126325016", "08143805610"];

  return (
    <div className="min-h-screen bg-surface-white selection:bg-brand-purple-light selection:text-white">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-surface-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <nav className="container max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white shadow-lg shadow-brand-purple/20">
              <span className="font-display font-bold text-xl">MJ</span>
            </div>
            <span className={`font-display font-bold text-xl hidden sm:block ${isScrolled ? 'text-text-dark' : 'text-white md:text-text-dark'}`}>
              Laundry
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('services')} className="text-sm font-medium hover:text-brand-purple transition-colors">Services</button>
            <button onClick={() => scrollTo('why-us')} className="text-sm font-medium hover:text-brand-purple transition-colors">Why Choose Us</button>
            <button onClick={() => scrollTo('how-it-works')} className="text-sm font-medium hover:text-brand-purple transition-colors">How It Works</button>
            <button onClick={() => scrollTo('contact')} className="text-sm font-medium hover:text-brand-purple transition-colors">Contact</button>
            <button 
              onClick={() => scrollTo('contact')}
              className="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-text-dark font-semibold rounded-full transition-all shadow-md active:scale-95"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden p-2 rounded-lg ${isScrolled ? 'text-text-dark hover:bg-surface-grey' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white shadow-xl border-t md:hidden py-8 px-6 flex flex-col gap-6"
            >
              <button onClick={() => scrollTo('services')} className="text-left py-2 hover:text-brand-purple transition-colors font-medium">Services</button>
              <button onClick={() => scrollTo('why-us')} className="text-left py-2 hover:text-brand-purple transition-colors font-medium">Why Choose Us</button>
              <button onClick={() => scrollTo('how-it-works')} className="text-left py-2 hover:text-brand-purple transition-colors font-medium">How It Works</button>
              <button onClick={() => scrollTo('contact')} className="text-left py-2 hover:text-brand-purple transition-colors font-medium">Contact</button>
              <button 
                onClick={() => scrollTo('contact')}
                className="w-full mt-2 px-5 py-3 bg-brand-gold text-text-dark font-bold rounded-xl shadow-lg"
              >
                Book a Pickup
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden">
          <div className="absolute top-0 right-0 w-full md:w-2/3 h-full z-0 gradient-bg rounded-bl-[100px] md:rounded-bl-[200px] hidden md:block opacity-10"></div>
          
          <div className="container max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-purple/10 text-brand-purple rounded-full text-sm font-bold mb-6">
                <CheckCircle2 size={16} />
                #1 Premium Laundry in Ibadan
              </div>
              <h1 className="text-4xl md:text-7xl font-display font-extrabold leading-[1.1] mb-6">
                Premium <span className="text-brand-purple italic">Laundry</span> & Cleaning Services
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
                We've got you covered — fast, reliable, and professional care for your clothes. Experience the luxury of cleanliness without the stress.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollTo('contact')}
                  className="px-8 py-4 bg-brand-purple hover:bg-brand-purple-light text-white font-bold rounded-2xl shadow-xl shadow-brand-purple/30 transition-all flex items-center gap-2 group"
                >
                  Book a Pickup
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollTo('services')}
                  className="px-8 py-4 bg-surface-grey hover:bg-gray-200 text-text-dark font-bold rounded-2xl transition-all"
                >
                  View Services
                </button>
              </div>
              
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex text-brand-gold items-center gap-0.5">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                  <p className="font-semibold">500+ Happy Customers in Eleyele</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-full md:w-1/2 relative"
            >
              <div className="relative aspect-square md:aspect-[4/5] lg:aspect-square w-full bg-surface-grey rounded-[40px] md:rounded-[60px] overflow-hidden border-[8px] md:border-[12px] border-white shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Modern laundry room" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/60 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex items-end justify-center p-6 md:p-10">
                  <div className="relative z-10 text-center">
                    <div className="p-6 glass rounded-3xl text-white max-w-sm">
                      <h3 className="font-display font-bold text-xl mb-2">Impeccable Cleaning</h3>
                      <p className="text-white/80 text-sm">We use premium eco-friendly detergents and gentle processes to make your fabrics look brand new.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 p-4 md:p-6 bg-white rounded-3xl shadow-2xl z-20 flex items-center gap-4 max-w-[240px]"
              >
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Truck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Fast Delivery</h4>
                  <p className="text-xs text-gray-500">Same day pickup available</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -right-5 md:-right-10 p-4 bg-white rounded-3xl shadow-2xl z-20 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-2xl flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="font-bold text-sm pr-4">100% Insured</h4>
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 md:py-32 bg-surface-grey">
          <div className="container max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-purple font-bold tracking-widest uppercase text-sm mb-4 block">Our Expertise</span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-6">Service designed for you</h2>
              <p className="text-sm md:text-base text-gray-600">We offer a comprehensive range of laundry solutions tailored to meet your busy lifestyle, ensuring your clothes get the care they deserve.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[32px] shadow-sm hover:shadow-xl hover:shadow-brand-purple/10 transition-all group overflow-hidden flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-brand-purple/20 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg">
                      {service.icon}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed italic flex-grow">
                      {service.description}
                    </p>
                    <button onClick={() => scrollTo('contact')} className="flex items-center gap-2 text-brand-purple font-bold group">
                      Book Service
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why-us" className="py-24 md:py-32 overflow-hidden relative">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-purple/5 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="container max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2">
                <span className="text-brand-purple font-bold tracking-widest uppercase text-sm mb-4 block">Quality First</span>
                <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-8">Why hundreds of families trust MJ Laundry</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col gap-4"
                    >
                      <div className="w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center text-brand-purple">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-base md:text-lg mb-2">{feature.title}</h4>
                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 p-8 bg-brand-purple rounded-3xl text-white flex flex-col sm:flex-row items-center gap-8 shadow-2xl shadow-brand-purple/20">
                  <div className="text-center sm:text-left">
                    <h3 className="text-4xl font-display font-extrabold mb-1">99%</h3>
                    <p className="text-white/70 text-sm uppercase font-bold tracking-wider">Customer Satisfaction</p>
                  </div>
                  <div className="w-px h-12 bg-white/20 hidden sm:block"></div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-4xl font-display font-extrabold mb-1">24h</h3>
                    <p className="text-white/70 text-sm uppercase font-bold tracking-wider">Avg. Response Time</p>
                  </div>
                  <div className="w-px h-12 bg-white/20 hidden sm:block"></div>
                  <div className="text-center sm:text-left font-bold italic">
                    Ibadan's Best choice
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 relative">
                <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl">
                  <div className="aspect-video lg:aspect-square bg-surface-grey relative flex items-center justify-center overflow-hidden">
                    <img 
                      src="/src/assets/images/regenerated_image_1777868562241.png" 
                      alt="Ironing clothes professionally" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-brand-purple/20"></div>
                    
                    <div className="relative z-20 text-center p-8 md:p-12">
                      <div className="w-20 h-20 rounded-full bg-brand-gold flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <ShieldCheck size={40} className="text-text-dark" />
                      </div>
                      <h3 className="text-3xl font-display font-bold mb-4 text-white">Your fabrics are safe with us</h3>
                      <p className="text-white/80 italic font-medium">"Cleanliness is next to Godliness, and we take it very seriously."</p>
                    </div>
                  </div>
                </div>
                {/* Abstract shape */}
                <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-brand-purple/20 rounded-[40px] -z-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 md:py-32 bg-surface-white relative">
          <div className="container max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-brand-purple font-bold tracking-widest uppercase text-sm mb-4 block">Process</span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-6">Laundry magic in 3 steps</h2>
              <p className="text-sm md:text-base text-gray-600 italic">We simplified our workflow so you can spend your time on what truly matters.</p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
              {/* Connector Lines */}
              <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-0.5 bg-dashed border-t-2 border-dashed border-gray-200 -z-0"></div>
              
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative z-10 text-center flex flex-col items-center"
                >
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-brand-purple/5 shadow-xl flex items-center justify-center mb-8 relative group">
                    <div className="absolute inset-2 rounded-full border-2 border-brand-purple/20 group-hover:scale-110 group-hover:border-brand-purple transition-transform duration-500"></div>
                    <span className="font-display font-extrabold text-3xl text-brand-purple">{step.step}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-[280px]">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Working Hours & CTA */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="container max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="gradient-bg rounded-[40px] md:rounded-[60px] p-10 md:p-20 text-white relative flex flex-col lg:flex-row items-center justify-between gap-12 shadow-3xl shadow-brand-purple/40">
              <div className="absolute top-0 right-0 p-8 opacity-20 hidden md:block">
                <AnimatePresence>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  >
                    <Waves size={200} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="max-w-2xl text-center lg:text-left">
                <h2 className="text-3xl md:text-6xl font-display font-extrabold mb-6 leading-tight">Ready for Fresh, Clean Clothes?</h2>
                <p className="text-lg md:text-xl text-white/80 mb-10 italic">Working Hours: <span className="text-brand-gold font-bold">8:00 AM – 6:00 PM (Everyday)</span></p>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <a 
                    href={`tel:${phoneNumbers[0]}`}
                    className="px-8 py-4 bg-brand-gold hover:bg-brand-gold-light text-text-dark font-bold rounded-2xl shadow-xl transition-all flex items-center gap-2"
                  >
                    <Phone size={20} />
                    Call Now
                  </a>
                  <button 
                    onClick={() => scrollTo('contact')}
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl transition-all flex items-center gap-2 border border-white/20"
                  >
                    <Calendar size={20} />
                    Book Service
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-auto flex flex-col gap-6">
                <div className="p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                    <ShieldCheck size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">Trusted in Benjamin</h4>
                    <p className="text-white/60 text-sm">Most rated laundry service</p>
                  </div>
                </div>
                <div className="p-8 bg-brand-gold text-text-dark rounded-3xl flex items-center gap-6 shadow-lg">
                  <div className="w-16 h-16 rounded-2xl bg-black/10 flex items-center justify-center">
                    <Truck size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">Express Pickup</h4>
                    <p className="text-text-dark/60 text-sm">Within 30 mins in Eleyele</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Background visuals */}
          <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-brand-purple blur-[150px] opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-brand-gold blur-[150px] opacity-5"></div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32 container max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/2">
              <span className="text-brand-purple font-bold tracking-widest uppercase text-sm mb-4 block">Get In Touch</span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-8">We're here to help</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-brand-purple/5 text-brand-purple rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base md:text-lg mb-1">Our Location</h4>
                    <p className="text-sm md:text-base text-gray-500">Benjamin, Eleyele, Ibadan, Oyo State, Nigeria</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-brand-purple/5 text-brand-purple rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base md:text-lg mb-1">Call Us</h4>
                    <div className="flex flex-col gap-1 text-sm md:text-base">
                      {phoneNumbers.map(num => (
                        <a key={num} href={`tel:${num}`} className="text-gray-500 hover:text-brand-purple transition-colors">{num}</a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-brand-purple/5 text-brand-purple rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base md:text-lg mb-1">Chat With Us</h4>
                    <a 
                      href={`https://wa.me/234${phoneNumbers[0].substring(1)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-base text-gray-500 hover:text-brand-purple transition-colors"
                    >
                      WhatsApp Support Available
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 grayscale hover:grayscale-0 transition-all duration-500">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15822.428454238714!2d3.8569!3d7.3917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398d0000000001%3A0x0!2zN8KwMjMnMzAuMSJOIDPCsDUxJzI0LjgiRQ!5e0!3m2!1sen!2sng!4v1651584000000!5m2!1sen!2sng" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <div className="w-full lg:w-1/2 p-10 bg-surface-grey rounded-[40px] shadow-inner border border-white">
              <h3 className="text-2xl font-display font-bold mb-8">Send us a message</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full p-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-brand-purple transition-all outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Phone Number</label>
                    <input type="tel" placeholder="0812..." className="w-full p-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-brand-purple transition-all outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">What service do you need?</label>
                  <select className="w-full p-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-brand-purple transition-all outline-none appearance-none">
                    <option>Washing</option>
                    <option>Ironing & Folding</option>
                    <option>Full Cleaning Package</option>
                    <option>Pickup & Delivery</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Message</label>
                  <textarea rows={4} placeholder="Tell us about your laundry needs..." className="w-full p-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-brand-purple transition-all outline-none resize-none"></textarea>
                </div>
                <button className="w-full py-4 bg-brand-purple hover:bg-brand-purple-light text-white font-bold rounded-2xl shadow-xl shadow-brand-purple/20 transition-all active:scale-95">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-text-dark text-white pt-24 pb-12">
        <div className="container max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-purple flex items-center justify-center text-white">
                  <span className="font-display font-bold text-xl">MJ</span>
                </div>
                <span className="font-display font-bold text-xl">Laundry</span>
              </div>
              <p className="text-white/60 mb-8 max-w-xs leading-relaxed italic">
                Benjamin, Eleyele's most reliable premium laundry partner. Dedicated to professional fabric care and doorstep convenience.
              </p>
              <div className="flex items-center gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-purple hover:border-brand-purple transition-all cursor-pointer">
                    {i === 1 && <MessageCircle size={18} />}
                    {i === 2 && <Star size={18} />}
                    {i === 3 && <MapPin size={18} />}
                    {i === 4 && <ArrowRight size={18} />}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-6 h-px bg-brand-gold"></span>
                Quick Links
              </h4>
              <ul className="space-y-4 text-white/60">
                <li><button onClick={() => scrollTo('services')} className="hover:text-brand-gold transition-colors">Services</button></li>
                <li><button onClick={() => scrollTo('how-it-works')} className="hover:text-brand-gold transition-colors">How It Works</button></li>
                <li><button onClick={() => scrollTo('why-us')} className="hover:text-brand-gold transition-colors">Why Choose Us</button></li>
                <li><button onClick={() => scrollTo('contact')} className="hover:text-brand-gold transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-6 h-px bg-brand-gold"></span>
                Services
              </h4>
              <ul className="space-y-4 text-white/60">
                <li><button className="hover:text-brand-gold transition-colors">Washing</button></li>
                <li><button className="hover:text-brand-gold transition-colors">Ironing</button></li>
                <li><button className="hover:text-brand-gold transition-colors">Folding</button></li>
                <li><button className="hover:text-brand-gold transition-colors">Express Delivery</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-6 h-px bg-brand-gold"></span>
                Location
              </h4>
              <p className="text-white/60 mb-4 italic leading-relaxed">
                Benjamin Area, Eleyele Road, <br />
                Ibadan, Oyo State.
              </p>
              <div className="space-y-2">
                {phoneNumbers.map(n => (
                  <p key={n} className="text-brand-gold font-bold">{n}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-white/40 text-sm">
            <p>© 2024 MJ Laundry and Cleaning Services. All rights reserved.</p>
            <div className="flex items-center gap-8">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <a 
        href={`https://wa.me/234${phoneNumbers[0].substring(1)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-white text-text-dark px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}

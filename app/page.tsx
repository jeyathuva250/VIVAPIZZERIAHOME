"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Star, Instagram, Facebook, ArrowRight, MapPin, Phone, Clock, Plus, GlassWater, Wine, Pizza as PizzaIcon, Utensils } from "lucide-react";
import Link from "next/link";

type Category = "Pizza" | "Pasta" | "Beverages" | "Cocktails";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("Pizza");

  // Mouse parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for parallax
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Move image based on spring values
  const imageX = useTransform(springX, [-0.5, 0.5], ["-1%", "1%"]);
  const imageY = useTransform(springY, [-0.5, 0.5], ["-1%", "1%"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Filtered dishes
  const filteredDishes = menuItems.filter(item => item.category === activeCategory);

  // Stagger variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.4 } }
  };

  return (
    <main className="min-h-screen bg-white font-sans text-[#1A1A1A] selection:bg-[#FDE8E8] selection:text-[#E53E3E]">
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-4" : "bg-transparent py-10"
        }`}
      >
        <div className="container mx-auto px-8 md:px-16 flex justify-between items-center">
          <Link href="/" className={`font-serif text-3xl font-bold tracking-tight transition-colors duration-700 relative z-10 ${isScrolled ? "text-[#1A1A1A]" : "text-white"}`}>
            VIVA<span className="text-[#E53E3E] ml-0.5">PIZZERIA</span>
          </Link>
          
          <nav className="hidden xl:flex items-center gap-16">
            {["The Gallery", "Our Story", "Reservations", "Contact"].map((item) => (
              <Link 
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`} 
                className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-all relative group ${isScrolled ? "text-[#6B6B6B]" : "text-white/80"} hover:text-[#E53E3E]`}
              >
                {item}
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-px bg-[#E53E3E] transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
          
          <Link 
            href="#reservation" 
            className={`hidden md:inline-flex items-center justify-center border px-10 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98] ${
              isScrolled 
                ? "border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white" 
                : "border-white text-white hover:bg-white hover:text-black"
            }`}
          >
            Reserve a Table
          </Link>
        </div>
      </header>

      {/* SECTION 1 - HERO (MASKED) */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-white">
        <div 
          className="relative min-h-[85vh] w-full bg-[#0A0A0A] flex items-center"
          style={{
            WebkitMaskImage: "url('/rugged-brush.svg'), linear-gradient(to bottom, black, black)",
            maskImage: "url('/rugged-brush.svg'), linear-gradient(to bottom, black, black)",
            WebkitMaskSize: "100% 200px, 100% calc(100% - 200px)",
            maskSize: "100% 200px, 100% calc(100% - 200px)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "bottom, top",
            maskPosition: "bottom, top",
          }}
        >
          <div className="absolute inset-0 bg-royal-pattern opacity-10 -z-10"></div>
          <div className="absolute inset-0 bg-grunge mix-blend-overlay -z-10"></div>
          
          {/* Top Legibility Gradient */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/80 to-transparent z-0 pointer-events-none"></div>
          
          <div className="container mx-auto px-8 md:px-16 grid lg:grid-cols-2 gap-20 items-center pt-40 pb-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="mb-8 flex flex-col gap-2">
                <motion.span 
                  initial={{ rotate: -3, scale: 0.9 }}
                  animate={{ rotate: -2, scale: 1 }}
                  transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                  className="font-brush text-[#E53E3E] text-2xl md:text-3xl tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
                >
                  HOT & FRESH
                </motion.span>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-[#E53E3E]"></span>
                  <span className="text-[#E53E3E] text-[11px] font-black uppercase tracking-[0.5em] font-sans-alt">Est. 1994 • Napoli</span>
                </div>
              </div>
              
              <h1 className="font-poster text-8xl md:text-[140px] leading-[0.8] mb-8 tracking-tighter text-white drop-shadow-[10px_10px_0px_rgba(229,62,62,0.3)]">
                CHEESE <br />
                <span className="text-[#E53E3E]">PIZZA</span>
              </h1>
              
              <p className="font-sans-alt text-xl text-gray-300 mb-12 leading-relaxed max-w-lg font-medium tracking-wide">
                LIMITED TIME OFFER: <span className="text-white font-bold border-b-2 border-[#E53E3E]">50% OFF</span> ALL SIGNATURE CRUSTS
              </p>
              
              <div className="flex flex-wrap gap-8 items-center">
                <Link href="#reservation" className="bg-[#E53E3E] text-white px-14 py-6 text-[13px] font-black uppercase tracking-[0.25em] hover:bg-[#C53030] transition-all shadow-[0_10px_40px_rgba(229,62,62,0.4)] active:scale-95 font-sans-alt">
                  Order Now
                </Link>
                <Link href="#thegallery" className="group border-b-2 border-white/10 pb-1 text-[12px] font-black uppercase tracking-[0.3em] flex items-center gap-3 transition-all hover:border-[#E53E3E] hover:text-[#E53E3E] text-white font-sans-alt">
                  View Menu <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
            style={{ x: imageX, y: imageY }}
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10"
          >
            <div className="royal-border p-3 md:p-6 bg-[#1A1A1A] shadow-[30px_30px_60px_rgba(0,0,0,0.5)] border-white/10">
              <div className="relative aspect-[4/5] md:aspect-square overflow-hidden bg-[#0A0A0A]">
                  <Image 
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200"
                    alt="Signature Pizza"
                    fill
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - THE GALLERY (FILTERED) */}
      <section id="thegallery" className="py-40 bg-white">
        <div className="container mx-auto px-8 md:px-16">
          <div className="text-center mb-24">
            <span className="text-[#E53E3E] text-[10px] font-black uppercase tracking-[0.6em] mb-6 block">The Curated Selections</span>
            <h2 className="font-serif text-6xl font-bold mb-12">Gastronomic Exhibits</h2>
            
            {/* Category Navigation */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {[
                { name: "Pizza", icon: PizzaIcon },
                { name: "Pasta", icon: Utensils },
                { name: "Beverages", icon: GlassWater },
                { name: "Cocktails", icon: Wine }
              ].map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name as Category)}
                  className={`flex flex-col items-center gap-4 group transition-all ${
                    activeCategory === cat.name ? "text-[#E53E3E]" : "text-[#B0B0B0] hover:text-[#1A1A1A]"
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-500 ${
                    activeCategory === cat.name ? "border-[#E53E3E] bg-[#FDE8E8]" : "border-[#F0F0F0] group-hover:border-[#1A1A1A]"
                  }`}>
                    <cat.icon className={`w-6 h-6 ${activeCategory === cat.name ? "text-[#E53E3E]" : "text-gray-400 group-hover:text-[#1A1A1A]"}`} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">{cat.name}</span>
                  {activeCategory === cat.name && (
                    <motion.div layoutId="activeUnderline" className="h-0.5 w-full bg-[#E53E3E] mt-2" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Filtered Gallery Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[600px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredDishes.map((dish, index) => (
                <motion.div 
                  key={dish.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="group relative overflow-hidden bg-white shadow-lg"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image 
                      src={dish.image} 
                      alt={dish.name} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Royal Labeling */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500"></div>
                    
                    <div className="absolute inset-0 p-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <span className="text-[#E53E3E] text-[9px] font-black uppercase tracking-[0.5em] mb-2 block">Premium Selection</span>
                      <h3 className="text-white font-serif text-3xl font-bold mb-4">{dish.name}</h3>
                      <p className="text-gray-300 text-xs font-serif italic leading-relaxed mb-8">
                        {dish.desc}
                      </p>
                      <button className="self-start text-[9px] font-black uppercase tracking-[0.3em] text-white border-b border-white/40 pb-1 hover:border-white transition-all">
                        Reserve Item
                      </button>
                    </div>
                  </div>
                  
                  {/* Outer Frame Decoration */}
                  <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 pointer-events-none transition-all duration-500"></div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-32 text-center">
            <button className="bg-royal-pattern border border-[#F0F0F0] px-16 py-6 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#1A1A1A] hover:text-white transition-all shadow-sm">
              View Complete Signature Menu
            </button>
          </div>
        </div>
      </section>


      {/* SECTION 3 - STORY */}
      <section id="ourstory" className="py-40 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-royal-pattern opacity-5"></div>
        <div className="container mx-auto px-8 md:px-16 grid lg:grid-cols-2 gap-32 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="royal-border bg-white p-4 md:p-8 shadow-2xl">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=1200" alt="Master Chef" fill className="object-cover" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <span className="text-[#E53E3E] text-[10px] font-black uppercase tracking-[0.5em] mb-10 block">Heritage & Passion</span>
            <h2 className="font-serif text-6xl md:text-7xl font-bold mb-10 leading-tight">
              Legacy Born <br />from <span className="italic font-normal serif text-[#E53E3E]">Passion.</span>
            </h2>
            <p className="text-[#6B6B6B] text-lg leading-relaxed font-serif italic mb-10">
              "Since 1994, our ovens have never gone cold. We believe that true Neapolitan pizza is not just food—it's a dialogue between the ingredients, the fire, and the hands that knead the dough."
            </p>
            <div className="grid grid-cols-2 gap-12 mt-16">
              <div>
                <span className="block font-serif text-5xl font-bold text-[#E53E3E] mb-3">12k+</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B6B6B]">Satisfied Guests</span>
              </div>
              <div>
                <span className="block font-serif text-5xl font-bold text-[#E53E3E] mb-3">25y</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B6B6B]">Culinary Tradition</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-[#1A1A1A] text-white pt-32 pb-16">
        <div className="container mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-32">
            <div className="md:col-span-2">
              <Link href="/" className="font-serif text-4xl font-bold mb-10 block tracking-tight">
                VIVA<span className="text-[#E53E3E] ml-1">PIZZERIA</span>
              </Link>
              <div className="flex gap-8">
                {[Instagram, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="text-white hover:text-[#E53E3E] transition-colors">
                    <Icon className="w-5 h-5 stroke-[1.5px]" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-[#E53E3E]">Explore</h4>
              <ul className="space-y-6">
                {["Private Dining", "Gift Vouchers", "The Kitchen", "Career"].map(item => (
                  <li key={item}>
                    <Link href="#" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-[#E53E3E]">The Estate</h4>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300">
                123 Via della Tradizione <br /> Napoli, Italy 80100 <br /><br />
                reservations@vivapizzeria.it
              </p>
            </div>
          </div>
          
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-bold uppercase tracking-[0.4em] text-gray-500">
            <p>© 2024 Viva Pizzeria Group — The Art of Fire.</p>
            <div className="flex gap-12">
              <Link href="#" className="hover:text-white transition-colors">Legal</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

const menuItems = [
  // PIZZA
  {
    name: "Margherita Reale",
    desc: "A royal interpretation with hand-crushed San Marzano tomatoes, rare Buffalo Mozzarella, and cold-pressed olive oil.",
    price: "$24",
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800"
  },
  {
    name: "Diavola d'Oro",
    desc: "Artisanal spicy salami from Calabria, paired with locally sourced fiery honey and house-smoked provolone.",
    price: "$28",
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800"
  },
  {
    name: "Tartufo Bianco",
    desc: "White truffle cream, roasted wild mushrooms, fior di latte, and shaved black truffles.",
    price: "$34",
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800"
  },
  // PASTA
  {
    name: "Linguine al Tartufo",
    desc: "Bespoke pasta ribbons tossed in a decadent emulsion of Umbrian black truffles and aged Parmigiano Reggiano.",
    price: "$32",
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=800"
  },
  {
    name: "Pappardelle al Ragu",
    desc: "12-hour slow-cooked wild boar ragu, handmade wide pasta, and aged pecorino.",
    price: "$29",
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
  },
  {
    name: "Gnocchi alla Sorrentina",
    desc: "Pillow-soft gnocchi, San Marzano tomato sauce, fresh basil, and melting mozzarella di bufala.",
    price: "$26",
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=800"
  },
  // BEVERAGES
  {
    name: "San Pellegrino Essenza",
    desc: "Sparkling natural mineral water with a hint of citrus and Mediterranean herbs.",
    price: "$9",
    category: "Beverages",
    image: "/menu/san_pellegrino.png"
  },
  {
    name: "Espresso Riserva",
    desc: "Dark roast artisanal blend, served with a side of dark chocolate and lemon zest.",
    price: "$7",
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800"
  },
  {
    name: "Limonata della Casa",
    desc: "Freshly squeezed Sicilian lemons, organic cane sugar, and fresh garden mint.",
    price: "$10",
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800"
  },
  // COCKTAILS
  {
    name: "Negroni Classico",
    desc: "London dry gin, Campari, and sweet vermouth, garnished with a flame-scorched orange twist.",
    price: "$18",
    category: "Cocktails",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800"
  },
  {
    name: "Aperol Royale",
    desc: "Aperol, Prosecco Superiore, and a dash of soda, topped with a fresh strawberry and gold leaf.",
    price: "$20",
    category: "Cocktails",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=800"
  },
  {
    name: "Espresso Martini",
    desc: "Small-batch vodka, house espresso, and coffee liqueur, shaken to a silky finish.",
    price: "$19",
    category: "Cocktails",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800"
  }
];

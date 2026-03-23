import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, CreditCard, Heart, Copy, Check, Wifi, Phone } from 'lucide-react';

const WEDDING_DATE = new Date('2026-08-15T18:00:00');

const GiftCard = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('8600 1234 5678 9012');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-[380px] mx-auto aspect-[1.586] rounded-2xl p-5 md:p-6 flex flex-col justify-between text-white shadow-2xl overflow-hidden group transition-transform hover:scale-[1.02] duration-500">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-800 via-rose-600 to-rose-900"></div>
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-400/20 rounded-full blur-2xl"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-20 mix-blend-overlay"></div>

      <div className="relative z-10 flex justify-between items-start">
        {/* Chip */}
        <div className="w-10 h-8 md:w-12 md:h-9 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-md opacity-90 shadow-inner flex items-center justify-center overflow-hidden relative">
           <div className="w-full h-[1px] bg-yellow-700/40 absolute top-1/2 -translate-y-1/2"></div>
           <div className="w-[1px] h-full bg-yellow-700/40 absolute left-1/3"></div>
           <div className="w-[1px] h-full bg-yellow-700/40 absolute right-1/3"></div>
           <div className="w-full h-[1px] bg-yellow-700/40 absolute top-1/4"></div>
           <div className="w-full h-[1px] bg-yellow-700/40 absolute bottom-1/4"></div>
        </div>
        {/* Contactless */}
        <Wifi className="w-6 h-6 md:w-7 md:h-7 rotate-90 opacity-70" />
      </div>

      <div className="relative z-10 mt-auto">
        <p className="text-[8px] md:text-[10px] text-rose-100 uppercase tracking-widest mb-1 opacity-80">Karta Raqami</p>
        <div className="flex items-center justify-between bg-black/20 rounded-xl p-2 md:p-3 -mx-2 md:-mx-3 mb-4 backdrop-blur-sm border border-white/10">
          <p className="text-xl sm:text-2xl md:text-3xl font-mono tracking-widest font-medium drop-shadow-md">8600 1234 5678 9012</p>
          <button 
            onClick={handleCopy} 
            className="p-2 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
            title="Nusxa olish"
          >
            {copied ? <Check className="w-4 h-4 md:w-5 md:h-5 text-green-400" /> : <Copy className="w-4 h-4 md:w-5 md:h-5 text-white" />}
          </button>
        </div>
        <div className="flex justify-between items-end">
          <div className="text-left">
            <p className="text-[8px] md:text-[10px] text-rose-100 uppercase tracking-widest mb-1 opacity-80">Qabul Qiluvchi</p>
            <p className="font-medium text-xs sm:text-sm md:text-base tracking-wide uppercase">Sardorbek Aliyev</p>
          </div>
          <div className="text-lg sm:text-xl md:text-2xl font-bold italic opacity-90 tracking-tighter">UZCARD</div>
        </div>
      </div>
    </div>
  );
};

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 25 + 10,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-100px]"
          style={{ left: `${heart.left}%` }}
          animate={{
            y: ['0vh', '-120vh'],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            rotate: [0, Math.random() * 360],
            scale: [1, Math.random() * 0.5 + 0.8, 1],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="url(#heart-gradient)"
            className="drop-shadow-xl"
            style={{ filter: 'drop-shadow(0px 10px 8px rgba(251, 113, 133, 0.4))' }}
          >
            <defs>
              <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>
            </defs>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = WEDDING_DATE.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-2 sm:gap-3 md:gap-6 my-8 md:my-12 w-full max-w-lg mx-auto px-2">
      {[
        { label: 'Kun', value: timeLeft.days },
        { label: 'Soat', value: timeLeft.hours },
        { label: 'Daqiqa', value: timeLeft.minutes },
        { label: 'Soniya', value: timeLeft.seconds },
      ].map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center flex-1"
        >
          <div className="w-full aspect-square bg-white/60 backdrop-blur-md rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center border border-rose-100 mb-2 md:mb-3">
            <span className="text-2xl sm:text-3xl md:text-5xl font-serif text-rose-600">{item.value}</span>
          </div>
          <span className="text-[8px] sm:text-[10px] md:text-xs font-sans text-rose-800 uppercase tracking-widest font-medium">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-rose-50 font-sans text-stone-800 relative overflow-hidden selection:bg-rose-200 selection:text-rose-900">
      <FloatingHearts />
      
      <main className="relative z-10 max-w-4xl mx-auto px-5 py-16 md:py-24 flex flex-col items-center text-center">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-12 w-full flex flex-col items-center"
        >
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-rose-400 mb-8"
          >
            <Heart className="w-10 h-10 md:w-14 md:h-14" fill="currentColor" />
          </motion.div>
          
          <h2 className="text-xs md:text-sm font-sans uppercase tracking-[0.4em] text-rose-500 mb-8 font-medium">
            To'y Taklifnomasi
          </h2>
          
          <h1 className="text-6xl sm:text-7xl md:text-9xl font-script text-rose-600 mb-8 leading-tight drop-shadow-sm">
            Sardor <br className="md:hidden" />
            <span className="text-4xl sm:text-5xl md:text-7xl text-rose-400 mx-2 md:mx-6">&</span> <br className="md:hidden" />
            Malika
          </h1>
          
          <p className="text-lg md:text-2xl font-serif italic text-stone-600 max-w-2xl mx-auto leading-relaxed px-4">
            Sizlarni hayotimizdagi eng quvonchli kunimiz – nikoh to'yimizga lutfan taklif etamiz.
          </p>
        </motion.div>

        {/* Countdown */}
        <Countdown />

        {/* Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full bg-white/70 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-14 shadow-2xl border border-white mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-300 via-rose-400 to-rose-300"></div>
          
          <h3 className="text-3xl md:text-4xl font-serif text-rose-600 mb-10">Tantanalar Dasturi</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            <div className="flex items-start gap-5">
              <div className="p-4 bg-rose-50 rounded-2xl text-rose-500 shadow-sm border border-rose-100">
                <Calendar className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-stone-800 text-lg mb-1">Sana</h4>
                <p className="text-stone-600 text-lg">15 - Avgust, 2026</p>
                <p className="text-stone-400 text-sm mt-1">Shanba kuni</p>
              </div>
            </div>
            
            <div className="flex items-start gap-5">
              <div className="p-4 bg-rose-50 rounded-2xl text-rose-500 shadow-sm border border-rose-100">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-stone-800 text-lg mb-1">Vaqt</h4>
                <p className="text-stone-600 text-lg">18:00 dan boshlab</p>
                <p className="text-stone-400 text-sm mt-1">Tashrifingizni kutamiz</p>
              </div>
            </div>

            <div className="flex items-start gap-5 md:col-span-2">
              <div className="p-4 bg-rose-50 rounded-2xl text-rose-500 shadow-sm border border-rose-100">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-stone-800 text-lg mb-1">Manzil</h4>
                <p className="text-stone-600 text-lg">"Humo" To'yxonasi</p>
                <p className="text-stone-500 mt-1">Toshkent shahri, Yunusobod tumani, Amir Temur ko'chasi 12-uy</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Location Map */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-serif text-rose-600 mb-8">Xaritada Ko'rish</h3>
          <div className="w-full h-72 md:h-96 rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white/80 relative">
            <div className="absolute inset-0 bg-rose-100 animate-pulse -z-10"></div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.666162231908!2d69.28292831542426!3d41.33789497926831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b534175ed31%3A0x52a8f9d9414a2ad8!2sAmir%20Temur%20Avenue%2C%20Tashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1629800000000!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy"
              title="Wedding Location"
              className="relative z-10"
            ></iframe>
          </div>
        </motion.div>

        {/* Gift Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600 rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-14 shadow-2xl text-white relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 opacity-10 rotate-12">
            <Heart className="w-80 h-80" fill="currentColor" />
          </div>
          <div className="absolute -bottom-20 -left-20 opacity-10 -rotate-12">
            <Heart className="w-64 h-64" fill="currentColor" />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="p-4 md:p-5 bg-white/20 rounded-full backdrop-blur-md shadow-inner">
                <CreditCard className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-serif mb-4 md:mb-6">To'yona Uchun</h3>
            <p className="text-rose-50 mb-8 md:mb-10 max-w-lg mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
              Agar siz bizni masofadan turib tabriklashni yoki to'yona yuborishni istasangiz, quyidagi karta raqamidan foydalanishingiz mumkin.
            </p>
            
            <GiftCard />
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 text-stone-500 font-serif text-center flex flex-col items-center w-full"
        >
          <p className="text-xl md:text-2xl mb-4 text-rose-400 italic">Tashrifingizdan bag'oyat xursand bo'lamiz!</p>
          <div className="flex justify-center gap-2 text-rose-300 mb-8">
            <Heart className="w-4 h-4" fill="currentColor" />
            <Heart className="w-4 h-4" fill="currentColor" />
            <Heart className="w-4 h-4" fill="currentColor" />
          </div>
          
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent mb-6"></div>
          
          <div className="font-sans not-italic text-xs md:text-sm text-stone-400 space-y-3 flex flex-col items-center">
            <p className="tracking-widest uppercase mb-1">© 2026 Sardor & Malika</p>
            <div className="bg-white/50 backdrop-blur-sm px-6 py-4 rounded-2xl border border-rose-100 shadow-sm flex flex-col items-center gap-2">
              <p className="font-medium text-stone-600">Taklifnoma xizmati: ISoqov Og'abek</p>
              <a href="tel:+998886998878" className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-600 font-semibold transition-colors bg-rose-50 px-4 py-2 rounded-full">
                <Phone className="w-4 h-4" />
                +998 88 699 88 78
              </a>
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  );
}


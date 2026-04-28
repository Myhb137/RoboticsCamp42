import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Rocket, Users, Calendar, MapPin, Trophy, Brain, Network, Sparkles, ChevronDown } from 'lucide-react';
import RegistrationForm from './components/RegistrationForm';

export default function App() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);

  return (
    <div className="min-h-screen bg-[#020817] text-white overflow-x-hidden" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#020817] via-[#020817]/95 to-transparent backdrop-blur-md border-b border-cyan-500/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center overflow-hidden border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                  <img src="/logo.png" alt="Robotics Camp Logo" className="w-full h-full object-cover" />
                </div>
                <div className="text-right flex flex-col justify-center">
                  <div className="text-xs md:text-sm text-cyan-300" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 600 }}>
                    الجمهورية الجزائرية الديمقراطية الشعبية
                  </div>
                  <div className="text-sm md:text-base font-bold text-white mt-0.5" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    وزارة الشباب
                  </div>
                  <div className="text-xs md:text-sm text-cyan-100" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 600 }}>
                    مديرية الشباب والرياضة لولاية تيبازة
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden md:flex items-center gap-6"
            >
              <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors">عن المخيم</a>
              <a href="#registration" className="text-gray-300 hover:text-cyan-400 transition-colors">التسجيل</a>
              <a
                href="#registration"
                className="px-6 py-2 bg-gradient-to-l from-cyan-500 to-blue-600 rounded-full hover:scale-105 transition-transform"
                style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 600 }}
              >
                سجل الآن
              </a>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: heroScale }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-cyan-900/50 to-[#020817] z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/3141211/3141211-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <div className="relative z-20 container mx-auto px-4 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-6 py-2 inline-block">
                <span className="text-cyan-300" style={{ fontFamily: "'Orbitron', sans-serif" }}>2026</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl mb-6 leading-tight"
              style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 900 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="block text-white drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                المخيم الوطني للأنشطة العلمية
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 via-blue-400 to-purple-400 mt-2">
                الروبوتيك 2026
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-cyan-100 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              فرصتك لعرض مشروعك، تطوير مهاراتك، والانضمام لنخبة المبدعين
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <a
                href="#registration"
                className="group relative px-8 py-4 bg-gradient-to-l from-cyan-500 to-blue-600 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]"
              >
                <span className="relative z-10 flex items-center gap-2" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700 }}>
                  <Rocket className="w-5 h-5" />
                  سجل الآن
                </span>
                <div className="absolute inset-0 bg-gradient-to-l from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              <a
                href="#about"
                className="px-8 py-4 border-2 border-cyan-400/50 rounded-full hover:bg-cyan-500/10 transition-all duration-300 hover:border-cyan-400"
                style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 600 }}
              >
                اكتشف المزيد
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-cyan-400" />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 bg-gradient-to-b from-[#020817] to-[#0a1628]">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800 }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-blue-400">
                ما هو المخيم؟
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              هذا المخيم يجمع الشباب المهتمين بالعلوم والتكنولوجيا لعرض مشاريع مبتكرة في مجال الروبوتيك.
              خمسة أيام من التعلم، الإبداع، والتواصل مع أفضل المواهب الجزائرية.
              فرصة لتطوير مهاراتك التقنية، عرض أفكارك، والحصول على تقييم من خبراء متخصصين.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who Can Apply Section */}
      <section className="py-24 px-4 bg-[#0a1628]">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            className="text-4xl md:text-5xl text-center mb-16"
            style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-blue-400">
              من يمكنه المشاركة؟
            </span>
          </motion.h2>

          {/* Three participation category cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Sparkles,
                titleAr: 'معرض',
                titleEn: 'Exhibition',
                desc: 'عرض مشاريع الروبوتيك أمام لجنة الخبراء والجمهور',
                age: '17 سنة فما فوق',
                color: 'from-cyan-500 to-blue-600',
                glow: 'rgba(34,211,238,0.35)'
              },
              {
                icon: Trophy,
                titleAr: 'مسابقة',
                titleEn: 'Competition',
                desc: 'تنافس مع أفضل المواهب في مجال الروبوتيك',
                age: '17 سنة فما فوق',
                color: 'from-purple-500 to-pink-600',
                glow: 'rgba(168,85,247,0.35)'
              },
              {
                icon: Users,
                titleAr: 'قرية الأطفال',
                titleEn: "Children's Village",
                desc: 'بيئة تعليمية ممتعة مخصصة للفئة الشبانية الناشئة',
                age: '10 - 16 سنة',
                color: 'from-emerald-500 to-teal-600',
                glow: 'rgba(16,185,129,0.35)'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -8, boxShadow: `0 24px 48px ${item.glow}` }}
                className="relative group cursor-default"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 rounded-2xl blur-xl group-hover:opacity-20 transition-all duration-300`} />
                <div className="relative bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center h-full flex flex-col items-center">
                  <div className={`w-16 h-16 mx-auto mb-5 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl mb-1" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800 }}>
                    {item.titleAr}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3 italic">{item.titleEn}</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">{item.desc}</p>
                  <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-l ${item.color} text-white shadow`}>
                    {item.age}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* General eligibility pills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Brain, title: 'الاهتمام', desc: 'مهتم بالروبوتيك والتكنولوجيا' },
              { icon: Network, title: 'المشاركة', desc: 'فردي أو ضمن فريق' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(34, 211, 238, 0.3)' }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-gradient-to-br from-cyan-950/40 to-blue-950/40 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 text-center h-full">
                  <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl mb-2" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700 }}>
                    {item.title}
                  </h3>
                  <p className="text-cyan-100">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#0a1628] to-[#020817]">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="text-4xl md:text-5xl text-center mb-16"
            style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-blue-400">
              تفاصيل الحدث
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Calendar, title: 'التاريخ', desc: '4 - 9 جويلية 2026', color: 'from-cyan-500 to-blue-600' },
              { icon: MapPin, title: 'المكان', desc: 'تيبازة', color: 'from-blue-500 to-purple-600' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-gradient-to-br from-cyan-950/40 to-blue-950/40 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
                  <div className={`w-14 h-14 mb-4 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl mb-2" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700 }}>
                    {item.title}
                  </h3>
                  <p className="text-lg text-cyan-100">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 bg-gradient-to-br from-purple-950/40 to-pink-950/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 text-center"
          >
            <div className="text-4xl mb-4">🤖</div>
            <p className="text-lg text-purple-100">تنظيم رسمي بإشراف جمعية متخصصة في الروبوتيك (روبوتات) على مدى 6 أيام</p>
          </motion.div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="registration" className="py-24 px-4 bg-[#020817]">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800 }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-blue-400">
                التسجيل
              </span>
            </h2>
            <p className="text-lg text-gray-300">املأ النموذج للمشاركة في المخيم</p>
          </motion.div>

          <RegistrationForm />
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#020817] to-[#0a1628]">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            className="text-4xl md:text-5xl text-center mb-16"
            style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-blue-400">
              لماذا تنضم؟
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '🚀', title: 'تطوير المهارات', desc: 'ورشات عمل متخصصة وتدريبات عملية' },
              { emoji: '🤝', title: 'بناء العلاقات', desc: 'تواصل مع نخبة من الشباب المبدعين' },
              { emoji: '🏆', title: 'فرصة للتميز', desc: 'عرض مشروعك أمام لجنة من الخبراء' },
              { emoji: '🧠', title: 'تعلم عملي', desc: 'تجربة حقيقية في عالم الروبوتيك' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-gradient-to-br from-cyan-950/30 to-blue-950/30 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 text-center"
              >
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-xl mb-2" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700 }}>
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-[#0a1628]">
        <div className="container mx-auto max-w-3xl">
          <motion.h2
            className="text-4xl md:text-5xl text-center mb-16"
            style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-blue-400">
              الأسئلة الشائعة
            </span>
          </motion.h2>

          <div className="space-y-4">
            {[
              { q: 'ما هي فئات المشاركة المتاحة؟', a: 'ثلاث فئات: المعرض (17+)، المسابقة (17+)، وقرية الأطفال (10-16 سنة)' },
              { q: 'ما هي شروط المشاركة في قرية الأطفال؟', a: 'خاصة بالفئة العمرية من 10 إلى 16 سنة، لتعلم الروبوتيك في بيئة ممتعة وتفاعلية' },
              { q: 'هل يجب أن يكون لدي مشروع جاهز؟', a: 'لا، يكفي أن تكون لديك فكرة مبتكرة في مجال الروبوتيك يمكن تطويرها' },
              { q: 'هل التسجيل مجاني؟', a: 'نعم، التسجيل مجاني والتنظيم على عاتق الجمعية المنظِّمة' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-gradient-to-br from-cyan-950/30 to-blue-950/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6"
              >
                <h3 className="text-lg mb-2 text-cyan-300" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700 }}>
                  {item.q}
                </h3>
                <p className="text-gray-300">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-[#0a1628] to-[#020817] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),transparent_70%)]" />

        <motion.div
          className="container mx-auto max-w-4xl text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl mb-6" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 900 }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 via-blue-400 to-purple-400">
              مستقبلك يبدأ من هنا
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            انضم الآن إلى المخيم الوطني للروبوتيك واصنع الفرق
          </p>
          <motion.a
            href="#registration"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-12 py-5 bg-gradient-to-l from-cyan-500 to-blue-600 rounded-full text-xl shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:shadow-[0_0_80px_rgba(34,211,238,0.7)] transition-all duration-300"
            style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700 }}
          >
            <span className="flex items-center gap-3">
              <Rocket className="w-6 h-6" />
              سجل الآن
            </span>
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-[#020817] border-t border-cyan-500/20">
        <div className="container mx-auto text-center text-gray-400">
          <p>المخيم الوطني للأنشطة العلمية - روبوتيك تيبازة 2026 © جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}

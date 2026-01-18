import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentIdea, setCurrentIdea] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const menuContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.08 },
    },
  } as const;

  const menuItemVariants = {
    hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 320, damping: 24 },
    },
  } as const;

  const categories = [
    { 
      id: 'date', 
      label: 'Идеи для свидания', 
      emoji: '💕'
    },
    { 
      id: 'weekend', 
      label: 'Идеи для выходного', 
      emoji: '🏖️'
    },
    { 
      id: 'group', 
      label: 'Идеи для компаний', 
      emoji: '👥'
    },
  ];

  const ideas = {
    date: [
      'Романтический ужин при свечах дома 🕯️',
      'Прогулка по парку с пикником 🌳',
      'Посещение художественной выставки 🎨',
      'Вечер в караоке-баре 🎤',
      'Кулинарный мастер-класс для двоих 👨‍🍳',
      'Прогулка на закате по набережной 🌅',
      'Посещение планетария 🌌',
      'Домашний киновечер с попкорном 🍿',
      'Прогулка на велосипедах 🚴',
      'Винная дегустация 🍷'
    ],
    weekend: [
      'Отправиться в поход на природу 🏔️',
      'Посетить местный рынок или ярмарку 🛒',
      'Организовать барбекю с друзьями 🍖',
      'Поехать в соседний город на экскурсию 🚗',
      'Провести день на пляже или у озера 🏖️',
      'Записаться на мастер-класс 🎨',
      'Устроить домашний SPA-день 💆',
      'Сходить в театр или на концерт 🎭',
      'Изучить новое хобби 📚',
      'Организовать фотосессию на природе 📸'
    ],
    group: [
      'Настольные игры вечером 🎲',
      'Квест-комната с друзьями 🔍',
      'Совместная готовка ужина 👨‍🍳',
      'Поход в боулинг 🎳',
      'Пикник в парке с активностями 🧺',
      'Совместная поездка на природу 🚗',
      'Киновечер с обсуждением 🎬',
      'Выходные в арендованном доме 🏠',
      'Спортивные игры в парке ⚽',
      'Выход в ресторан большой компанией 🍽️'
    ]
  };

  const handleCategoryClick = (categoryId: string) => {
    setIsGenerating(true);
    setSelectedCategory(categoryId);
    
    // Имитация обработки
    setTimeout(() => {
      const categoryIdeas = ideas[categoryId as keyof typeof ideas];
      const randomIdea = categoryIdeas[Math.floor(Math.random() * categoryIdeas.length)];
      setCurrentIdea(randomIdea);
      setIsGenerating(false);
    }, 900);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setCurrentIdea(null);
    setIsGenerating(false);
  };

  const handleTryAgain = () => {
    if (!selectedCategory) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      const categoryIdeas = ideas[selectedCategory as keyof typeof ideas];
      const randomIdea = categoryIdeas[Math.floor(Math.random() * categoryIdeas.length)];
      setCurrentIdea(randomIdea);
      setIsGenerating(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_30%_20%,#FFF3E0_0%,transparent_60%),radial-gradient(900px_700px_at_80%_30%,#FFEFD5_0%,transparent_55%),linear-gradient(135deg,#FFF7E8_0%,#FFF1DB_50%,#FFEED6_100%)] relative overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute top-1/2 -right-1/4 w-80 h-80 bg-rose-200/35 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 4 }}
          className="absolute -bottom-1/4 left-1/3 w-96 h-96 bg-orange-200/35 rounded-full blur-3xl"
        />
      </div>

      <div className="z-10 w-full flex flex-col items-center gap-10">
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div
              key="menu"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="text-center"
            >
              <h1 className="text-5xl font-black tracking-tight mb-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-rose-700">Randomiser</span>
              </h1>
              <p className="font-script text-4xl font-semibold text-[#5B3A29]">Что будем делать сегодня?</p>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="text-center w-full max-w-md"
            >
              <h1 className="text-4xl font-black tracking-tight mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-rose-700">Randomiser</span>
              </h1>
              
              {isGenerating ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8"
                >
                  <div className="flex items-center justify-center gap-2 mb-4">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="block h-2.5 w-2.5 rounded-full bg-stone-700/70"
                        animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.6] }}
                        transition={{
                          duration: 0.7,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.12,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-stone-700/90 text-2xl font-semibold">Подбираю идею…</p>
                </motion.div>
              ) : currentIdea ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-8"
                >
                  <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-white/70 shadow-xl mb-6">
                    <p className="text-2xl text-stone-800 font-semibold leading-relaxed">
                      {currentIdea}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-[2mm] items-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleTryAgain}
                      className="inline-flex items-center gap-3 px-10 py-6 rounded-full bg-[#EAD7C1] hover:bg-[#E4CFB6] text-[#5B3A29] font-semibold text-2xl transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus-visible:outline-none focus-visible:ring-0"
                    >
                      <span className="text-2xl">🔄</span>
                      <span>Попробовать ещё</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleBack}
                      className="inline-flex items-center gap-3 px-8 py-5 rounded-full bg-white/50 hover:bg-white/70 text-[#5B3A29] font-medium text-xl transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus-visible:outline-none focus-visible:ring-0"
                    >
                      <span className="text-2xl">←</span>
                      <span>Назад</span>
                    </motion.button>
                  </div>
                </motion.div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedCategory && (
          <motion.div
            className="flex flex-col items-center gap-[2mm]"
            variants={menuContainerVariants}
            initial="hidden"
            animate="show"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                variants={menuItemVariants}
                whileHover={{ scale: 1.03, translateY: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-4 px-10 py-6 rounded-full bg-[#EAD7C1] hover:bg-[#E4CFB6] text-[#5B3A29] font-semibold text-2xl transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus-visible:outline-none focus-visible:ring-0"
                onClick={() => handleCategoryClick(category.id)}
              >
                <span className="text-3xl">{category.emoji}</span>
                <span>{category.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
      
      {!selectedCategory && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 font-script text-3xl font-semibold text-center text-[#5B3A29]"
        >
          Создано для ярких впечатлений ✨
        </motion.p>
      )}
    </div>
  );
}

export default App;

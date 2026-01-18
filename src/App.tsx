import { motion } from 'framer-motion';
import PhaserGame from './game/PhaserGame';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
      >
        Life Randomiser
      </motion.h1>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="border-4 border-gray-700 rounded-lg overflow-hidden shadow-2xl"
      >
        <PhaserGame />
      </motion.div>

      <p className="mt-4 text-gray-400 text-sm">
        React + Vite + Tailwind + Framer Motion + Phaser
      </p>
    </div>
  );
}

export default App;

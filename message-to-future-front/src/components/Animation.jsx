// src/components/Animation.jsx
import React from 'react';
import { motion } from 'framer-motion';

function Animation({ narrative }) {
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 2 } },
  };

  // Personalize as animações de acordo com a narrativa
  const renderContent = () => {
    switch (narrative) {
      case 'space':
        return <p>🚀 Sua mensagem está vindo do espaço!</p>;
      case 'bottle':
        return <p>🧴 Sua mensagem veio em uma garrafa!</p>;
      default:
        return <p>📨 Aqui está a sua mensagem!</p>;
    }
  };

  return (
    <motion.div
      className={`animation ${narrative}`}
      initial="initial"
      animate="animate"
      variants={variants}
    >
      {renderContent()}
    </motion.div>
  );
}

export default Animation;

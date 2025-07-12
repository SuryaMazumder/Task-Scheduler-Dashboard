import React from 'react';
import { motion } from 'framer-motion';

const facts = [
  {
    title: 'JavaScript is Single-Threaded',
    description:
      'JavaScript uses a single-threaded event loop model to handle asynchronous operations like network requests and timers.'
  },
  {
    title: 'React Uses Virtual DOM',
    description:
      'React creates a virtual representation of the UI and only updates real DOM nodes that change, improving performance.'
  },
  {
    title: 'JS Was Created in 10 Days!',
    description:
      'Brendan Eich created the first version of JavaScript in just 10 days at Netscape in 1995.'
  },
  {
    title: 'React is Maintained by Meta',
    description:
      'React was developed and is maintained by Meta (formerly Facebook), and powers sites like Facebook and Instagram.'
  },
  {
    title: 'React Hooks Revolutionized Code',
    description:
      'Hooks like useState and useEffect allow functional components to manage state and side effects.'
  },
   {
    "title": "typeof null is 'object'",
    "description": "Due to a legacy bug in JavaScript, `typeof null` returns `'object'`, even though null is a primitive."
  },
  {
    "title": "React Re-renders Don’t Always Mean DOM Updates",
    "description": "Thanks to React's virtual DOM diffing, many re-renders don’t touch the real DOM if nothing has visually changed."
  },
  {
    "title": "NaN is Not Equal to Itself",
    "description": "`NaN === NaN` returns false in JavaScript. It's the only value that is not equal to itself."
  },
  {
    "title": "React Keys Improve Reconciliation",
    "description": "Keys in React lists help identify which items changed, preventing unnecessary DOM manipulation and improving performance."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
};

const FactCard = ({ title, description }) => (
  <motion.div
    variants={cardVariants}
    className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
  >
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-sm text-blue-100">{description}</p>
  </motion.div>
);

const FactsPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4 text-center">
      <h1 className="text-4xl font-bold text-white mb-10">
        🤯 Fun Facts About JavaScript & React
      </h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {facts.map((fact, index) => (
          <FactCard key={index} {...fact} />
        ))}
      </motion.div>
    </div>
  );
};

export default FactsPage;

// import React from 'react';
// import { FaWhatsapp } from 'react-icons/fa';

// const WhatsAppButton = ({ phoneNumber }) => {
//   return (
//     <a
//       href={`https://wa.me/${phoneNumber}`}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="flex items-center justify-center gap-1 bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-md text-sm transition-colors"
//     >
//       <FaWhatsapp className="h-4 w-4" />
//       <span>WhatsApp</span>
//     </a>
//   );
// };

// export default WhatsAppButton;

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ phoneNumber }) => {
  return (
    <div className="fixed bottom-4 left-6 z-50 animate-bounce-slow">
      <a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-blueLogo text-white px-4 py-3 rounded-full shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        <FaWhatsapp className="h-6 w-6 animate-pulse" />
        <span className="font-semibold hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
};

export default WhatsAppButton;


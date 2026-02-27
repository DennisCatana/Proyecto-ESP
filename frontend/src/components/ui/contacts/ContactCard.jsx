import { FiPhone } from "react-icons/fi";
import { motion } from "framer-motion";

const ContactCard = ({ icon: Icon, title, description, phone, link, color }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl p-6 text-center shadow-lg text-white ${color}`}
    >
      
      {/* Icono */}
      <div className="flex justify-center mb-4">
        {Icon && <Icon size={40} />}
      </div>

      {/* Título */}
      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>

      {/* Descripción */}
      <p className="text-sm mb-4 opacity-90">
        {description}
      </p>

      {/* Teléfono */}
      <div className="flex items-center justify-center mb-4">
        <FiPhone className="mr-2" />
        <span>{phone}</span>
      </div>

      {/* Botón */}
      <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-white text-gray-800 px-5 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
      >
        Contactar
      </a>

    </motion.div>
  );
};

export default ContactCard;
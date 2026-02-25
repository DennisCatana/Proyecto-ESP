const ContactCard = ({ icon, title, description, phone }) => {
  return (
    <div 
      className="text-white p-5 rounded-lg"
      style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
    >
      <h3 className="text-xl font-bold mb-3 text-center">
        <span className="text-3xl mr-2">{icon}</span>
        {title}
      </h3>
      <p className="mb-2">{description}</p>
      <p className="font-bold"><strong>Número:</strong> {phone}</p>
    </div>
  );
};

export default ContactCard;

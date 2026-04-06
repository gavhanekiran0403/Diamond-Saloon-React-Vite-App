const ServiceCard = ({ title, price }) => {
  return (
    <div className="service-card">
      <h3>{title}</h3>
      <p>{price}</p>
    </div>
  );
};

export default ServiceCard;

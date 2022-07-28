import "./price.styles.scss";

const Price = ({price}) => {
  return(
    <p className="price-container">&#8369; {price}</p>
  )
};

export default Price;
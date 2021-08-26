import Cards from "react-credit-cards";

import "./styles.scss";

const CreditCardVisual = ({
  cardNumber,
  cardName,
  expirationMonth,
  expirationYear,
  cvc,
  focused,
}) => {
  let expiry = expirationMonth + "/" + expirationYear;

  return (
    <div className="container--creditCard">
      <Cards
        cvc={cvc}
        focused={focused}
        expiry={expiry}
        name={cardName}
        number={cardNumber}
      />
    </div>
  );
};

export default CreditCardVisual;

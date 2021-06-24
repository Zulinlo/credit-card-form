import { useState } from "react";

import { DataStore } from "@aws-amplify/datastore";
import { CreditCard } from "./models";
import Cleave from "cleave.js/react";

import CreditCardVisual from "./components/CreditCardVisual";

import "./styles.scss";

const App = () => {
  // States
  const [form, setForm] = useState({
    cardNumber: "",
    cardName: "",
    expirationMonth: "00",
    expirationYear: "00",
    cvv: "",
    focused: "",
  });

  // Rendering selects in form
  const renderMonths = () => {
    let res = [];

    for (let i = 1; i < 13; ++i) {
      let formatted = ("0" + i).slice(-2);
      res.push(
        <option key={i} value={formatted}>
          {formatted}
        </option>
      );
    }

    return res;
  };

  const renderYears = () => {
    let res = [];

    for (
      let i = new Date().getFullYear();
      i < new Date().getFullYear() + 30;
      ++i
    ) {
      res.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return res;
  };

  // Handling form input changes
  const handleFieldChange = (event) => {
    const { className, value } = event.target;

    // Error handling and focus assigning
    let focus = "";
    switch (className) {
      case "cardNumber": {
        if (
          !value.length === 0 &&
          (!/^[0-9]+$/.test(value) || value.length > 16)
        )
          return;

        focus = "number";
        break;
      }

      case "cardName": {
        if (
          !value.length === 0 &&
          (!/^[a-zA-Z ]+$/.test(value) || value.length > 26)
        )
          return;

        focus = "name";
        break;
      }

      case "expirationMonth" || "expirationYear": {
        focus = "expiry";
        break;
      }

      case "cvv": {
        if (
          !value.length === 0 &&
          (!/^[0-9]+$/.test(value) || value.length > 4)
        )
          return;

        focus = "cvc";
        break;
      }
    }

    setForm((prevState) => ({ ...prevState, [className]: value }));
    setForm((prevState) => ({ ...prevState, ["focused"]: focus }));
  };

  // Handling form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    let expiry = form.expirationMonth + "/" + form.expirationYear;

    //if (!validator.isCreditCard(form.cardNumber)) {
    //alert("Invalid credit card number");
    //return;
    //}

    await DataStore.save(
      new CreditCard({
        name: form.cardName,
        number: form.cardNumber,
        expiry: expiry,
        cvc: form.cvv,
      })
    );

    setForm({
      cardNumber: "",
      cardName: "",
      expirationMonth: "00",
      expirationYear: "00",
      cvv: "",
      focused: "",
    });
  };

  return (
    <div className="container">
      <CreditCardVisual
        cardNumber={form.cardNumber}
        cardName={form.cardName}
        expirationMonth={form.expirationMonth}
        expirationYear={form.expirationYear}
        cvc={form.cvv}
        focused={form.focused}
      />
      <form onSubmit={handleSubmit}>
        <div>
          Card Number
          <br />
          <Cleave
            className="cardNumber"
            value={form.cardNumber}
            options={{ creditCard: true }}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          Card Name
          <br />
          <input
            type="text"
            className="cardName"
            value={form.cardName}
            onChange={handleFieldChange}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="item">
            Expiration Date
            <br />
            <select
              className="expirationMonth"
              value={form.expirationMonth}
              onChange={handleFieldChange}
            >
              <option>Month</option>
              {renderMonths()}
            </select>
            <select
              className="expirationYear"
              value={form.expirationYear}
              onChange={handleFieldChange}
            >
              <option>Year</option>
              {renderYears()}
            </select>
          </div>
          <div className="item cvv">
            CVV
            <br />
            <input
              type="text"
              className="cvv"
              value={form.cvv}
              onChange={handleFieldChange}
            />
          </div>
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default App;

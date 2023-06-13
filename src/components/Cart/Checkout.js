import { useState } from "react";
import useInput from "../../hooks/use-input";

import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

export default function Checkout(props) {
  const [invalidFormPrompt, setInvalidFormPrompt] = useState("");

  const {
    value: nameValue,
    hasError: nameHasError,
    isValid: nameIsValid,
    inputChangeHandler: nameChange,
    inputBlurHandler: nameBlur,
    reset: nameReset,
  } = useInput(isNotEmpty);

  const {
    value: streetValue,
    hasError: streetHasError,
    isValid: streetIsValid,
    inputChangeHandler: streetChange,
    inputBlurHandler: streetBlur,
    reset: streetReset,
  } = useInput(isNotEmpty);

  const {
    value: postalCodeValue,
    hasError: postalCodeHasError,
    isValid: postcalCodeIsValid,
    inputChangeHandler: postcalCodeChange,
    inputBlurHandler: postcalCodeBlur,
    reset: postcalCodeReset,
  } = useInput(isFiveChars);

  const {
    value: cityValue,
    hasError: cityHasError,
    isValid: cityIsValid,
    inputChangeHandler: cityChange,
    inputBlurHandler: cityBlur,
    reset: cityReset,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (nameIsValid && streetIsValid && postcalCodeIsValid && cityIsValid) {
    formIsValid = true;
  }

  function confirmHandler(event) {
    event.preventDefault();

    if (!formIsValid) {
      setInvalidFormPrompt("Insufficient Data");
      return;
    }

    props.onConfirm({
      name: nameValue,
      street: streetValue,
      postalCode: postalCodeValue,
      city: cityValue,
    });

    nameReset();
    streetReset();
    postcalCodeReset();
    cityReset();
  }

  const nameClasses = `${classes.control} ${
    nameHasError ? classes.invalid : ""
  }`;

  const streetClasses = `${classes.control} ${
    streetHasError ? classes.invalid : ""
  }`;

  const postalCodeClasses = `${classes.control} ${
    postalCodeHasError ? classes.invalid : ""
  }`;

  const cityClasses = `${classes.control} ${
    cityHasError ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameValue}
          onChange={nameChange}
          onBlur={nameBlur}
        />
        {nameHasError && (
          <p className={classes.invalid}>Name must no be empty.</p>
        )}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetValue}
          onChange={streetChange}
          onBlur={streetBlur}
        />
        {streetHasError && (
          <p className={classes.invalid}>Street must no be empty.</p>
        )}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalCodeValue}
          onChange={postcalCodeChange}
          onBlur={postcalCodeBlur}
        />
        {postalCodeHasError && (
          <p className={classes.invalid}>
            Postal Code must no be empty (5 characeters)
          </p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={cityValue}
          onChange={cityChange}
          onBlur={cityBlur}
        />
        {cityHasError && (
          <p className={classes.invalid}>City must no be empty</p>
        )}
      </div>
      <div className={classes.actions}>
        {formIsValid ? (
          ""
        ) : (
          <p className={classes.invalid}>{invalidFormPrompt}</p>
        )}
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}

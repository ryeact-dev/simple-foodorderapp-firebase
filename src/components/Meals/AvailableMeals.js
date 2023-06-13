import { useState, useEffect } from "react";

import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
// require("dotenv").config();

export default function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    async function fetchMealsHandler() {
      setIsLoading(true);
      setHttpError(null);

      try {
        const response = await fetch(
          process.env.REACT_APP_FIREBASE_URL + "meals.json"
        );
        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();

        // transform data to an arrays
        const loadMeals = [];
        for (const key in data) {
          loadMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMeals(loadMeals);
      } catch (error) {
        setHttpError(error.message);
      }
      setIsLoading(false);
    }

    fetchMealsHandler();
  }, []);

  let content = <p>Found no meals</p>;

  if (meals.length > 0) {
    content = meals.map((meal) => {
      return (
        <MealItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
        />
      );
    });
  }

  if (httpError) {
    content = <p className={classes.error}>{httpError}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
}

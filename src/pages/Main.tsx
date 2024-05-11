import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCats, resetCats } from "../store/catsSlice";
import { nextPage } from "../store/pageSlice";
import { Button } from "../components/Button/Button";
import styles from "./Page.module.css";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const catsArray = useAppSelector((state) => state.cats.cats);

  useEffect(() => {
    dispatch(resetCats());
    dispatch(getCats());
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(nextPage());
    dispatch(getCats());
  };

  return (
    <div className={styles["flex-container"]}>
      {catsArray.map((cat) => (
        <div key={cat.id} className={styles["flex-item"]}>
          <img src={cat.url} alt={`${cat.id}. Cat`} />
        </div>
      ))}
      {catsArray.length > 0 && (
        <Button onClick={handleLoadMore}>Load more...</Button>
      )}
    </div>
  );
};

export default Main;

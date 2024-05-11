import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCats, resetCats } from "../store/catsSlice";
import { nextPage, resetPage } from "../store/pageSlice";
import { Button } from "../components/Button/Button";
import styles from "./Page.module.css";

const Category: React.FC = () => {
  const { category } = useParams();
  const categories = useAppSelector((state) => state.categories.categories);
  const catsArray = useAppSelector((state) => state.cats.cats);
  const page = useAppSelector((state) => state.page.activePage);
  const dispatch = useAppDispatch();

  const currentCategory = categories.find((cat) => cat.name === category);

  useEffect(() => {
    dispatch(resetCats());
    dispatch(resetPage());
    if (currentCategory) {
      dispatch(getCats({ categoryId: currentCategory.id, page }));
    }
  }, [dispatch, currentCategory]);

  const handleLoadMore = () => {
    dispatch(nextPage());
    if (currentCategory) {
      dispatch(getCats({ categoryId: currentCategory.id, page: page + 1 }));
    }
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

export default Category;

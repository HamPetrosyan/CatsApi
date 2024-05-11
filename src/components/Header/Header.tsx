import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleMenu } from "../../store/catsSlice";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((state) => state.cats.isActive);

  const handleMenuClick = () => {
    dispatch(toggleMenu(!isActive));
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.burgerBtn} onClick={handleMenuClick}>
        <span />
      </div>
      <Link to="/" className={styles.title}>
        KittyStore
      </Link>
    </nav>
  );
};

export { Header };

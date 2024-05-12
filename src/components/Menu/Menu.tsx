import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";

import styles from "./Menu.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCategories } from "../../store/categorySlice";
import { toggleMenu } from "../../store/catsSlice";

import boxes from "../../assets/images/boxes.svg";
import clothes from "../../assets/images/clothes.svg";
import hats from "../../assets/images/hats.svg";
import sinks from "../../assets/images/sinks.svg";
import space from "../../assets/images/space.svg";
import sunglasses from "../../assets/images/sunglasses.svg";
import ties from "../../assets/images/ties.svg";

const Menu: React.FC = () => {
  const isActive = useAppSelector((state) => state.cats.isActive);
  const items = useAppSelector((state) => state.categories.categories);
  const dispatch = useAppDispatch();

  const images = [boxes, clothes, hats, sinks, space, sunglasses, ties];

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  function toCapitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div
      className={cn(styles.menu, {
        [styles.active]: isActive,
      })}
      onClick={() => dispatch(toggleMenu(false))}
    >
      <div className={styles.blur} />
      <div className={styles.menuContent} onClick={(e) => e.stopPropagation()}>
        <ul className={styles.linksList}>
          {items.map((item) => (
            <li key={item.id}>
              <NavLink
                to={`/${item.name}`}
                className={styles.link}
                onClick={() => dispatch(toggleMenu(false))}
              >
                <img src={images[items.indexOf(item)]} alt={item.name} />
                <span>{toCapitalize(item.name)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Menu };

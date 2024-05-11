import React from "react";
import styles from "./Button.module.css";

export interface IButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = (props) => {
  return (
    <button className={styles.btn} {...props}>
      {props.children}
    </button>
  );
};

export { Button };

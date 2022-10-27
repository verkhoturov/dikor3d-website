import classnames from "classnames";
import styles from "./index.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  isSharp?: boolean;
  isSecondary?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  children,
  onClick,
  isSharp,
  isSecondary,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classnames(styles.button, {
        [styles.sharp]: isSharp,
        [styles.secondary]: isSecondary,
      })}
      type={type}
    >
      {children}
    </button>
  );
};

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CrossIcon } from "./cross-icon";

import styles from "./index.module.css";

const Portal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.querySelector("#myportal"))
    : null;
};

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <Portal>
      <div onClick={onClose} className={styles.wrapper}>
        <div onClick={(e) => e.stopPropagation()} className={styles.inner}>
          <button onClick={onClose} className={styles.btnClose}>
            <CrossIcon />
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
};


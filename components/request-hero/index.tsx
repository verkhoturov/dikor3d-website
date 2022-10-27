import React from "react";
import { Hero } from "../common";
import { FeedbackModal } from "../feedback";
import requestImg from "./img/request.png";

import styles from "./index.module.css";

export const RequestHero = () => {
  const [showModal, setShowModal] = React.useState(false);

  const onClick = () => {
    setShowModal(true);
  };
  return (
    <div className={styles.wrapper}>
      <Hero
        title={
          <>
            Бесплатный выезд замерщика <br /> с образцами и каталогами
          </>
        }
        subtitle={
          <>
            если заказ не подтверждается, выезд <br /> замерщика оплачивается -
            300 лей
          </>
        }
        bgImg={requestImg.src}
        button={{ text: "Оставить заявку", onClick }}
        isWhiteText
        tag="div"
      />
      {showModal && <FeedbackModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

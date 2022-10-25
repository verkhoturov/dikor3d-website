import { Hero } from "../common";
import requestImg from "./img/request.png";

import styles from "./index.module.css";

export const RequestHero = () => {
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
        isWhiteText
        tag="div"
      />
    </div>
  );
};

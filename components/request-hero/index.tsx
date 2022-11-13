import React from "react";
import { Hero } from "../common";
import { FeedbackModal } from "../feedback";

import { useRouter } from "next/router";
import { useLang } from "../../utils/useLang";

import requestImg from "./img/request.jpg";

import styles from "./index.module.css";

export const RequestHero = () => {
  const router = useRouter();
  const t = useLang(router.locale);
  const [showModal, setShowModal] = React.useState(false);

  const onClick = () => {
    setShowModal(true);
  };
  return (
    <div className={styles.wrapper}>
      <Hero
        title={t.requestHero.title}
        bgImg={requestImg.src}
        button={{ text: t.common.request, onClick }}
        isWhiteText
        tag="div"
        height={441}
      />
      {showModal && <FeedbackModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

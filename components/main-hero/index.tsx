import React from "react";
import { Hero } from "../common";
import { FeedbackModal } from "../feedback";
import heroImg from "./img/main-hero.png";
import { useRouter } from "next/router";
import { useLang } from "../../utils/useLang";

export const MainHero = () => {
  const router = useRouter();
  const t = useLang(router.locale);

  const [showModal, setShowModal] = React.useState(false);

  const onClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <Hero
        title={t.mainHero.title}
        subtitle={t.mainHero.subtitle}
        bgImg={heroImg.src}
        button={{ text: t.mainHero.button, onClick }}
        isWhiteText
      />

      {showModal && <FeedbackModal onClose={() => setShowModal(false)} />}
    </>
  );
};

import React from "react";
import { Modal } from "../common/modal";
import { Paragraph } from "../common/headings";
import { Button } from "../common/button";
import { EmailIcon } from "./email-icon";
import { useRouter } from "next/router";
import { useLang } from "../../utils/useLang";

import styles from "./index.module.css";

interface FeedbackModalProps {
  onClose: () => void;
}

export const FeedbackModal = ({ onClose }: FeedbackModalProps) => {
  const router = useRouter();
  const t = useLang(router.locale);

  const formRef = React.useRef(null);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState("");
  const [isSucces, setIsSucces] = React.useState<boolean>(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      setError("Заполните все поля");
      return;
    }

    const body = JSON.stringify({ name, email, phone });
    const res = await fetch("/api/contact", { method: "POST", body });
    const data = await res.json();

    if (data.error || data.status == "error") {
      setError(
        "При отправке сообщения произошла ошибка. Пожалуйста, попробуйте ещё раз позже."
      );
    }

    if (data.status === "succes") {
      setIsSucces(true);
      setName("");
      setEmail("");
      setPhone("");
    }
  };

  return (
    <Modal onClose={onClose}>
      {isSucces ? (
        <div className={styles.succesWrapper}>
          <i className={styles.icon}>
            <EmailIcon />
          </i>
          <Paragraph>Заявка успешно отправлена!</Paragraph>
          <Paragraph>В ближайшее внемя с вами свяжется менеджер</Paragraph>
        </div>
      ) : (
        <form ref={formRef} onSubmit={onSubmit} className={styles.form}>
          <label className={styles.label}>
            <Paragraph>{t.feedback.name}</Paragraph>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />
          </label>
          <label className={styles.label}>
            <Paragraph>{t.feedback.email}</Paragraph>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </label>
          <label className={styles.label}>
            <Paragraph>{t.feedback.phone}</Paragraph>
            <input
              className={styles.input}
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError("");
              }}
            />
          </label>

          <div className={styles.error}>
            {error && <Paragraph>{error}</Paragraph>}
          </div>

          <Button type="submit" isSharp>
            {t.feedback.button}
          </Button>
        </form>
      )}
    </Modal>
  );
};

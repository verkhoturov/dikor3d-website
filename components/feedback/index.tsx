import React from "react";
import { Modal } from "../common/modal";
import { Paragraph } from "../common/headings";
import { Button } from "../common/button";
import { EmailIcon } from "./email-icon";

import styles from "./index.module.css";

interface FeedbackModalProps {
  onClose: () => void;
}

export const FeedbackModal = ({ onClose }: FeedbackModalProps) => {
  const formRef = React.useRef(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState("");
  const [isSucces, setIsSucces] = React.useState<boolean>(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const res = await fetch(
      "http://admin.dikor3d.com/wp-json/contact-form-7/v1/contact-forms/138/feedback",
      { method: "POST", body: formData }
    );
    const data = await res.json();

    if (!data.status) {
      setError("При отправке сообщения произошла ошибка. Пожалуйста, попробуйте ещё раз позже.");
    }

    if (data.status == "mail_sent") {
      setIsSucces(true);
      setName("");
      setEmail("");
      setPhone("");
    }

    console.log(data);
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
            <Paragraph>Имя</Paragraph>
            <input
              className={styles.input}
              name="your-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            <Paragraph>Эл. почта</Paragraph>
            <input
              className={styles.input}
              name="your-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            <Paragraph>Телефон</Paragraph>
            <input
              className={styles.input}
              name="your-tel"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>

          <div className={styles.error}>
            {error && <Paragraph>{error}</Paragraph>}
          </div>

          <Button type="submit" isSharp>
            Отправить заявку
          </Button>
        </form>
      )}
    </Modal>
  );
};

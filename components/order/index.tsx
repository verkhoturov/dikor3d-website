import React from "react";
import { Modal } from "../common/modal";
import { Paragraph } from "../common/headings";
import { Button } from "../common/button";
import { EmailIcon } from "./email-icon";
import { useRouter } from "next/router";
import { useLang } from "../../utils/useLang";

import styles from "./index.module.css";

interface OrderModalProps {
  onClose: () => void;
  product: {
    name: string;
    desc: string;
  };
}

export const OrderModal = ({ onClose, product }: OrderModalProps) => {
  const router = useRouter();
  const t = useLang(router.locale);

  const formRef = React.useRef(null);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [amount, setAmount] = React.useState(1);
  const [error, setError] = React.useState("");
  const [isSucces, setIsSucces] = React.useState<boolean>(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      setError("Заполните все поля");
      return;
    }

    const formData = new FormData(formRef.current);
    const res = await fetch(
      "http://admin.dikor3d.com/wp-json/contact-form-7/v1/contact-forms/144/feedback",
      { method: "POST", body: formData }
    );
    const data = await res.json();

    if (!data.status || data.error || data.status == "validation_failed") {
      setError(
        "При отправке сообщения произошла ошибка. Пожалуйста, попробуйте ещё раз позже."
      );
    }

    if (data.status == "mail_sent") {
      setIsSucces(true);
      setName("");
      setEmail("");
      setPhone("");
      setAmount(1);
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
          <div className={styles.productWrapper}>
            <Paragraph>{product.name}</Paragraph>

            <div className={styles.amountWrapper}>
              <button type="button" onClick={() => setAmount(amount + 1)}>
                +
              </button>
              <Paragraph>{amount}</Paragraph>
              <button
                type="button"
                onClick={amount > 1 ? () => setAmount(amount - 1) : undefined}
              >
                -
              </button>
            </div>
          </div>
          <label className={styles.label}>
            <Paragraph>{t.feedback.name}</Paragraph>
            <input
              className={styles.input}
              name="your-name"
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
              name="your-email"
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
              name="your-tel"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError("");
              }}
            />
          </label>

          <input
            className={styles.input}
            name="amount"
            type="number"
            value={amount}
            style={{ display: "none" }}
          />

          <input
            className={styles.input}
            name="product"
            type="text"
            value={product.name}
            style={{ display: "none" }}
          />

          <div className={styles.error}>
            {error && <Paragraph>{error}</Paragraph>}
          </div>

          <Button type="submit">
            {t.feedback.button}
          </Button>
        </form>
      )}
    </Modal>
  );
};

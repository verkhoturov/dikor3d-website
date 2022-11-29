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
  productName: string;
}

export const OrderModal = ({ onClose, productName }: OrderModalProps) => {
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
      setError(t.feedback.inputEmptyError);
      return;
    }

    const body = JSON.stringify({
      name,
      email,
      phone,
      amount,
      product: productName,
    });
    const res = await fetch("/api/contact", { method: "POST", body });
    const data = await res.json();

    if (data.error || data.status == "error") {
      setError(t.feedback.sendError);
    }

    if (data.status === "succes") {
      setIsSucces(true);
      setName("");
      setEmail("");
      setPhone("");
      setAmount(1);
    }
  };

  return (
    <Modal onClose={onClose}>
      {isSucces ? (
        <div className={styles.succesWrapper}>
          <i className={styles.icon}>
            <EmailIcon />
          </i>
          <Paragraph>{t.feedback.success}</Paragraph>
        </div>
      ) : (
        <form ref={formRef} onSubmit={onSubmit} className={styles.form}>
          <div className={styles.productWrapper}>
            <Paragraph>{productName}</Paragraph>

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

          <input
            className={styles.input}
            type="number"
            value={amount}
            style={{ display: "none" }}
          />

          <input
            className={styles.input}
            type="text"
            value={productName}
            style={{ display: "none" }}
          />

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

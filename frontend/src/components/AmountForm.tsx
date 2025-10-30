import React from "react";
import { Button } from "./Button";
import { ScreenTitle } from "./ScreenTitle";

interface Props {
  title: string;
  amount: string;
  setAmount: (v: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  note?: string;
}

export const AmountForm: React.FC<Props> = ({
  title,
  amount,
  setAmount,
  onSubmit,
  onCancel,
  note
}) => (
  <div className="vstack gap">
    <ScreenTitle>{title}</ScreenTitle>
    <div className="row form-pin">
      <input
        aria-label={`${title} amount`}
        type="number"
        step="0.01"
        min={0}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="num-input"
        placeholder="$0.00"
      />
      <Button onClick={onSubmit}>OK</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </div>
    {note && <div className="note">{note}</div>}
  </div>
);

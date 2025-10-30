import React from "react";

interface Props {
  onLeft?: (index: number) => void;
  onRight?: (index: number) => void;
  disabled?: boolean;
}

const PadBtn: React.FC<{
  onClick?: () => void;
  aria: string;
  disabled?: boolean;
}> = ({ onClick, aria, disabled }) => (
  <button
    type="button"
    className="pad pad-btn"
    aria-label={aria}
    onClick={onClick}
    disabled={disabled}
  />
);

export const SidePads: React.FC<Props> = ({ onLeft, onRight, disabled }) => (
  <>
    <div className="pads left">
      {[0, 1, 2, 3].map((i) => (
        <PadBtn
          key={`L${i}`}
          aria={`Left pad ${i + 1}`}
          onClick={() => onLeft?.(i)}
          disabled={disabled}
        />
      ))}
    </div>
    <div className="pads right">
      {[0, 1, 2, 3].map((i) => (
        <PadBtn
          key={`R${i}`}
          aria={`Right pad ${i + 1}`}
          onClick={() => onRight?.(i)}
          disabled={disabled}
        />
      ))}
    </div>
  </>
);

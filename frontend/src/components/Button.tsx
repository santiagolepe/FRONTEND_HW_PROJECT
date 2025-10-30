import React from "react";

interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  align?: "left" | "right";
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  onClick,
  children,
  align = "left",
  disabled
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`btn ${align === "left" ? "align-left" : "align-right"}`}
  >
    {children}
  </button>
);

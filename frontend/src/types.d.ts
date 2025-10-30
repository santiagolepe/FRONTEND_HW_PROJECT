export type Screen = "welcome" | "menu" | "withdraw" | "deposit" | "balance";
export type CardType =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "plus"
  | "star";

export interface UserProfile {
  name: string;
  pin: string;
  cardType: CardType;
}

export interface ATMState {
  screen: Screen;
  balance: number;
  authenticated: boolean;
  highlightCard: CardType | null;
  flashMsg?: string;
}

export type ATMAction =
  | { type: "ENTER_PIN_SUCCESS"; card: CardType }
  | { type: "RESET" }
  | { type: "NAV"; screen: Screen }
  | { type: "DEPOSIT"; amount: number }
  | { type: "WITHDRAW"; amount: number }
  | { type: "FLASH"; msg?: string };

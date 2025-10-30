import { ATMAction, ATMState, CardType, UserProfile } from "../types";

export const demoUser: UserProfile = {
  name: "Peter Parker",
  pin: "1234",
  cardType: "visa"
};

export const initialState: ATMState = {
  screen: "welcome",
  balance: 1250,
  authenticated: false,
  highlightCard: null
};

export function atmReducer(state: ATMState, action: ATMAction): ATMState {
  switch (action.type) {
    case "ENTER_PIN_SUCCESS":
      return {
        ...state,
        authenticated: true,
        highlightCard: action.card,
        screen: "menu",
        flashMsg: undefined
      };
    case "NAV":
      return { ...state, screen: action.screen, flashMsg: undefined };
    case "DEPOSIT": {
      const next = Math.max(0, state.balance + action.amount);
      return {
        ...state,
        balance: next,
        screen: "menu",
        flashMsg: `Deposited $${action.amount.toFixed(2)}`
      };
    }
    case "WITHDRAW": {
      if (action.amount <= 0) return state;
      if (action.amount > state.balance) {
        return { ...state, flashMsg: "Insufficient funds." };
      }
      return {
        ...state,
        balance: state.balance - action.amount,
        screen: "menu",
        flashMsg: `Withdrew $${action.amount.toFixed(2)}`
      };
    }
    case "RESET":
      return { ...initialState };
    case "FLASH":
      return { ...state, flashMsg: action.msg };
    default:
      return state;
  }
}

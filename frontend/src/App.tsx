import React, { useEffect, useMemo, useReducer, useState } from "react";
import "./App.css";

import { AmountForm } from "./components/AmountForm";
import { Button } from "./components/Button";
import { ScreenTitle } from "./components/ScreenTitle";
import { SidePads } from "./components/SidePads";

import { atmReducer, initialState, demoUser } from "./state/atmReducer";
import { cardHotspots } from "./constants/cardHotspots";
import { Screen } from "./types";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(atmReducer, initialState);
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!state.flashMsg) return;
    const t = setTimeout(
      () => dispatch({ type: "FLASH", msg: undefined }),
      2200
    );
    return () => clearTimeout(t);
  }, [state.flashMsg]);

  const tryEnterPin = () => {
    if (pin === demoUser.pin) {
      dispatch({ type: "ENTER_PIN_SUCCESS", card: demoUser.cardType });
    } else {
      dispatch({ type: "FLASH", msg: "Invalid PIN" });
    }
  };

  const parsedAmount = useMemo(() => {
    const n = Number(amount);
    return Number.isFinite(n) && n > 0 ? Math.round(n * 100) / 100 : 0;
  }, [amount]);

  const goto = (s: Screen) => dispatch({ type: "NAV", screen: s });

  const handleLeft = (index: number) => {
    if (state.screen !== "menu") return;
    if (index === 2) return goto("withdraw");
    if (index === 3) return goto("deposit");
  };

  const handleRight = (index: number) => {
    if (state.screen !== "menu") return;
    if (index === 1) return dispatch({ type: "RESET" });
    if (index === 2) return goto("balance");
    if (index === 3) return dispatch({ type: "RESET" });
  };

  return (
    <div className="page">
      <div className="atm">
        <div className="atm-header">
          <img
            src="/assets/atm_sign.png"
            alt="ATM 24 HOUR BANKING"
            className="atm-sign"
          />
          <img src="/assets/graffiti.png" alt="graffiti" className="graffiti" />
        </div>

        <div className="cards-row">
          <div className="cards-wrap">
            {/* base: show only the transparent (bottom) half of the sprite */}
            <div className="cards-strip" />

            {/* after login: overlay the opaque card (top half) */}
            {state.highlightCard && (
              <div
                className="active-card"
                style={{
                  left: cardHotspots[state.highlightCard].left,
                  width: cardHotspots[state.highlightCard].width,
                  backgroundPositionX: -cardHotspots[state.highlightCard].left
                }}
              />
            )}
          </div>
        </div>

        <div className="screen-outer">
          <div className="screen ">
            <SidePads onLeft={handleLeft} onRight={handleRight} />

            {state.screen === "welcome" && (
              <div className="vstack gap">
                <ScreenTitle>
                  <div>Welcome to the</div>
                  <div>ATM</div>
                </ScreenTitle>

                <div className="row form-pin">
                  <span className="label">Enter PIN</span>
                  <input
                    aria-label="PIN"
                    type="password"
                    inputMode="numeric"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="pin-input"
                  />
                  <Button onClick={tryEnterPin}>OK</Button>
                </div>

                {state.flashMsg && <div className="note">{state.flashMsg}</div>}
              </div>
            )}

            {state.screen === "menu" && (
              <div>
                <ScreenTitle>
                  <div>Hi {demoUser.name}!</div>
                  <div>Please make a choice ...</div>
                </ScreenTitle>
                <div className="menu-rows">
                  <div className="menu-rows-left">
                    <div className="menu-row left">
                      <span className="menu-label"></span>
                    </div>

                    <div className="menu-row left">
                      <span className="menu-line" />
                      <span className="menu-label">Withdraw</span>
                    </div>
                    <div className="menu-row left">
                      <span className="menu-line" />
                      <span className="menu-label">Deposit</span>
                    </div>
                  </div>

                  <div className="menu-rows-right">
                    <div className="menu-row right">
                      <span className="menu-label">Exit</span>
                      <span className="menu-line" />
                    </div>

                    <div className="menu-row right">
                      <span className="menu-label">Balance</span>
                      <span className="menu-line" />
                    </div>

                    <div className="menu-row right">
                      <span className="menu-label">Re-Enter PIN</span>
                      <span className="menu-line" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {state.screen === "balance" && (
              <div className="vstack gap form-pin">
                <ScreenTitle>Current Balance</ScreenTitle>
                <div className="big-number">${state.balance.toFixed(2)}</div>
                <Button onClick={() => goto("menu")}>Back</Button>
              </div>
            )}

            {state.screen === "withdraw" && (
              <AmountForm
                title="Withdraw"
                amount={amount}
                setAmount={setAmount}
                onSubmit={() => {
                  if (parsedAmount <= 0)
                    return dispatch({ type: "FLASH", msg: "Enter an amount" });
                  dispatch({ type: "WITHDRAW", amount: parsedAmount });
                  setAmount("");
                }}
                onCancel={() => goto("menu")}
                note={`Available: $${state.balance.toFixed(2)}`}
              />
            )}

            {state.screen === "deposit" && (
              <AmountForm
                title="Deposit"
                amount={amount}
                setAmount={setAmount}
                onSubmit={() => {
                  if (parsedAmount <= 0)
                    return dispatch({ type: "FLASH", msg: "Enter an amount" });
                  dispatch({ type: "DEPOSIT", amount: parsedAmount });
                  setAmount("");
                }}
                onCancel={() => goto("menu")}
              />
            )}
          </div>
        </div>

        <div className="footer">
          <img src="/assets/systems.png" alt="systems" className="systems" />
          <img
            src="/assets/sticker_graf.png"
            alt="sticker"
            className="sticker"
          />
        </div>
      </div>
    </div>
  );
};

export default App;

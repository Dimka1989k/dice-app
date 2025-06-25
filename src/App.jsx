import "./App.css";
import { useRef, useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Chip from "./components/Chip/Сhip";
import Timer from "./components/Timer/Timer";
import Dice from "./components/Dice/Dice";

import dice from "./assets/dice-small.png";
import plus from "./assets/plus.png";
import rollSound from "./assets/soundsRoll.mp3";

const MAX_ROLLS = 10;
const ROLL_RECHARGE_TIME = 5 * 60;

function App() {
  const diceRef = useRef(null);
  const [currentChipPosition, setCurrentChipPosition] = useState(1);
  const [availableRolls, setAvailableRolls] = useState(MAX_ROLLS);
  const [rechargeTimer, setRechargeTimer] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const rollAudio = useRef(new Audio(rollSound));

  useEffect(() => {
    let timerInterval;

    if (rechargeTimer > 0) {
      timerInterval = setInterval(() => {
        setRechargeTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            setAvailableRolls((prevRolls) =>
              Math.min(prevRolls + 1, MAX_ROLLS)
            );
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [rechargeTimer]);

  const handleRollClick = () => {
    if (availableRolls > 0 && !isRolling) {
      if (rollAudio.current) {
        rollAudio.current.play().catch((error) => {
          console.log("Audio play failed:", error);
        });
      }
      setIsRolling(true);

      if (diceRef.current) {
        const rolledValue = diceRef.current.roll();
        const initialChipPosition = currentChipPosition;
        const chipMoveDelay = 300;
        const diceAnimationDuration = 1500;

        setTimeout(() => {
          for (let i = 1; i <= rolledValue; i++) {
            setTimeout(() => {
              setCurrentChipPosition((prevPos) =>
                Math.min(initialChipPosition + i, 20)
              );
            }, i * chipMoveDelay);
          }
          const totalChipMovementDuration = rolledValue * chipMoveDelay;
          setTimeout(() => {
            setIsRolling(false);
            setAvailableRolls((prevRolls) => {
              const newRolls = prevRolls - 1;
              if (newRolls < MAX_ROLLS && rechargeTimer === 0) {
                setRechargeTimer(ROLL_RECHARGE_TIME);
              }
              return newRolls;
            });
          }, totalChipMovementDuration);
        }, diceAnimationDuration);
      }
    }
  };

  return (
    <>
      <div className="flex">
        <div className="relative bg-[url('./assets/bgMain.png')] bg-cover bg-center bg-no-repeat w-full min-h-screen">
          <Header />
          <Timer
            availableRolls={availableRolls}
            maxRolls={MAX_ROLLS}
            rechargeTimer={rechargeTimer}
          />

          <Dice ref={diceRef} />
          <Chip currentPosition={currentChipPosition} />
          <div className="flex items-center justify-center gap-2">
            <img className="img-roll w-8 h-8" src={dice} alt="dice" />
            <p className="text-white text-xl font-semibold leading-none">9</p>
            <img className="img-roll w-6 h-6" src={plus} alt="plus" />
          </div>
          <div className="flex flex-col items-center justify-center gap-12">
            <button
              className={`text-white mt-9 px-[167px] py-[14px] text-lg font-extrabold rounded
                   cursor-pointer border-none transition duration-300 ease-in-out
                   bg-gradient-to-b from-[#6dbf1d] to-[#498013] disabled:bg-[rgba(152,72,72,0.1)]
                   disabled:cursor-not-allowed disabled:opacity-70 max-[321px]:px-[132px] max-[376px]:px-[130px]
                   max-[426px]:px-[154px] max-[429px]:px-[165px]`}
              onClick={handleRollClick}
              disabled={
                (availableRolls === 0 && rechargeTimer > 0) ||
                isRolling ||
                currentChipPosition === 20
              }
            >
              Roll
            </button>
            <div className="text-white/20 border border-white/20 rounded px-2 py-1 mb-[58px] animate-pulse-on-active">
              <p className="text-white/60 text-sm font-semibold leading-none cursor-pointer">
                How to Play?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

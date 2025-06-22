import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import "./Dice.css";

const Dice = forwardRef((props, ref) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef(null);

  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const rollDice = () => {
    const wrapper = wrapperRef.current;
    const result = getRandom(1, 6);
    wrapper.classList.remove("jump");
    void wrapper.offsetWidth;
    wrapper.classList.add("jump");

    const faceAngles = {
      1: { x: 0, y: 0 },
      2: { x: 0, y: 180 },
      3: { x: 0, y: -90 },
      4: { x: 0, y: 90 },
      5: { x: -90, y: 0 },
      6: { x: 90, y: 0 },
    };

    let { x: baseFinalX, y: baseFinalY } = faceAngles[result];

    const spinX =
      (Math.floor(Math.random() * 3) + 2) *
      360 *
      (Math.random() > 0.5 ? 1 : -1);
    const spinY =
      (Math.floor(Math.random() * 3) + 2) *
      360 *
      (Math.random() > 0.5 ? 1 : -1);
    const finalX = baseFinalX + spinX;
    const finalY = baseFinalY + spinY;

    setRotation({ x: finalX, y: finalY });
    return result;
  };

  useImperativeHandle(ref, () => ({
    roll: rollDice,
  }));

  return (
    <section className="w-[72px] h-[72px] perspective-[200px] perspective-origin-[50%_100%] absolute top-[380px] right-[190px] z-[100000] max-[321px]:top-[354px] max-[321px]:right-[124px]">
      <div ref={wrapperRef} className="cube-wrapper">
        <div
          id="cube"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: "transform 1.5s ease-out",
          }}
        >
          <div className="front">
            <span className="dot dot1" />
          </div>
          <div className="back">
            <span className="dot dot1" />
            <span className="dot dot2" />
          </div>
          <div className="right">
            <span className="dot dot1" />
            <span className="dot dot2" />
            <span className="dot dot3" />
          </div>
          <div className="left">
            <span className="dot dot1" />
            <span className="dot dot2" />
            <span className="dot dot3" />
            <span className="dot dot4" />
          </div>
          <div className="top">
            <span className="dot dot1" />
            <span className="dot dot2" />
            <span className="dot dot3" />
            <span className="dot dot4" />
            <span className="dot dot5" />
          </div>
          <div className="bottom">
            <span className="dot dot1" />
            <span className="dot dot2" />
            <span className="dot dot3" />
            <span className="dot dot4" />
            <span className="dot dot5" />
            <span className="dot dot6" />
          </div>
        </div>
      </div>
    </section>
  );
});

export default Dice;

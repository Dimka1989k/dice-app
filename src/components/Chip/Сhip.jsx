import "./Сhip.css";
import icon1 from "../../assets/dice-icon/icon1.png";
import icon2 from "../../assets/dice-icon/icon2.png";
import icon3 from "../../assets/dice-icon/icon3.png";
import icon4 from "../../assets/dice-icon/icon4.png";
import icon5 from "../../assets/dice-icon/icon5.svg";
import icon6 from "../../assets/dice-icon/icon6.png";
import icon7 from "../../assets/dice-icon/icon7.svg";
import icon8 from "../../assets/dice-icon/icon8.png";
import icon9 from "../../assets/dice-icon/icon9.svg";

export default function Chip({ currentPosition }) {
  const blocks = [
    { id: 1, className: "list1", text: "Start", img: icon1 },
    { id: 2, className: "list2", img: icon2 },
    { id: 3, className: "list3", img: icon3 },
    { id: 4, className: "list4", text: "30 min", img: icon4 },
    { id: 5, className: "list5", img: icon5 },
    { id: 6, className: "list6", img: icon6 },
    { id: 7, className: "list7", img: icon7 },
    { id: 8, className: "list8", img: icon3 },
    { id: 9, className: "list9", img: icon8 },
    { id: 10, className: "list10", img: icon9 },
    { id: 11, className: "list11", img: icon1 },
    { id: 12, className: "list12", img: icon2 },
    { id: 13, className: "list13", img: icon3 },
    { id: 14, className: "list14", text: "60 min", img: icon4 },
    { id: 15, className: "list15", img: icon5 },
    { id: 16, className: "list16", img: icon6 },
    { id: 17, className: "list17", img: icon7 },
    { id: 18, className: "list18", img: icon3 },
    { id: 19, className: "list19", img: icon8 },
    { id: 20, className: "list20", img: icon9 },
  ];

  return (
    <>
      <ul className="chip-list">
        {blocks.map((block) => {
          const isActive = block.id === currentPosition;
          const isLastBlock = block.id === 20;
          let classNames = `size img ${block.className}`;
          if (isActive) {
            classNames += " active-chip-position";
          }
          if (isLastBlock && isActive) {
            classNames += " pulse-on-hover";
          }

          return (
            <li key={block.id} className={classNames}>
              {block.text &&
                (block.className === "list1" ? (
                  <>
                    <p className="text-list">{block.text}</p>
                    <img
                      className="img-icon1"
                      src={block.img}
                      alt={`icon${block.id}`}
                    />
                  </>
                ) : (
                  <div className="container-list4">
                    <img
                      className="img-list4"
                      src={block.img}
                      alt={`icon${block.id}`}
                    />
                    <p className="text-list4">{block.text}</p>
                  </div>
                ))}
              {!block.text && <img src={block.img} alt={`icon${block.id}`} />}
            </li>
          );
        })}
      </ul>
    </>
  );
}

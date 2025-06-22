import "./Timer.css"


export default function Timer({ availableRolls, maxRolls, rechargeTimer }) {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const pad = (num) => num.toString().padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
  };

  const filledBlocks = availableRolls;
  const totalBlocks = maxRolls;

  const renderRollBlocks = () => {
    const blocks = [];
    for (let i = 0; i < totalBlocks; i++) {
      const isFilled = i < filledBlocks;
      blocks.push(
        <li
          key={i}
          className={`w-[36px] h-[16px] rounded-sm 
            first:rounded-l-[8px] last:rounded-r-[8px] 
            min-[320px]:max-[428px]:w-[28px] min-[320px]:max-[428px]:h-[14px]`}
          style={{
            background: isFilled
              ? "linear-gradient(to bottom, #ffd600, #ffa100)"
              : "rgba(255, 255, 255, 0.2)",
          }}
        ></li>
      );
    }
    return blocks;
  };

  return (
    <div className="flex flex-col relative">
      <div className="roll-paragraph-before" />
      <h1 className="text-white text-[24px] text-center mt-[60px] font-extrabold leading-[100%]">
        Roll Craft
      </h1>
      <div className="roll-paragraph-after" />
      <div>
        <div className="flex items-center justify-between mx-[41px] my-[24px] mb-[6px] leading-[100%]">
          <p className="text-[12px] text-white leading-[100%]">
            Available rolls
          </p>
          <p className="text-white text-[20px] font-bold leading-[100%]">
            {availableRolls}/{maxRolls}
          </p>
        </div>

        <div className="flex flex-col items-center justify-between mx-[41px] mb-[24px] max-[321px]:mx-2">
          <ul className="flex gap-[1px] mb-[8px]">{renderRollBlocks()}</ul>
          <div className="text-white/20 rounded-lg border border-white/20 px-[8px] pt-[6px] pb-[4px]">
            <p className="text-white/60 text-[14px] font-semibold leading-[100%]">
              {availableRolls === maxRolls
                ? "00:00:00"
                : formatTime(rechargeTimer)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

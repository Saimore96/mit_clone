import React from "react";
import sidebarBlocks, { controlColor, motionColor } from "../constants/sidebarBlocks";

const customColors = {
  move_steps: {
    bgColor: "bg-[#ADD8E6]",
    textColor: "text-white"
  },
  turn_degree: {
    bgColor: "bg-[#ADD8E6]",
    textColor: "text-white"
  },
  go_to_x_y: {
    bgColor: "bg-[#ADD8E6]",
    textColor: "text-white"
  }
};

export default function Sidebar() {
  const handleDragStart = (e, actionType, payload, text) => {
    e.dataTransfer.setData("actionType", actionType);
    e.dataTransfer.setData("text", text);
    e.dataTransfer.setData("payload", JSON.stringify(payload));
  };

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scroll-behavior-smooth bg-gradient-to-r from-gray-100 to-gray-300 shadow-lg">
      <div className="text-lg font-semibold p-4 text-gray-700">Blocks</div>
      {Object.keys(sidebarBlocks).map((key) => (
        <div key={key} className="my-2 w-full">
          <div className="font-bold p-2 text-gray-600">{key}</div>
          <div>
            {sidebarBlocks[key].map((block, index) => {
              let { bgColor = "", textColor = "" } = customColors[block.text] || {};
              switch (key) {
                case "Motion":
                  bgColor = motionColor.bgColor;
                  textColor = motionColor.textColor;
                  break;
                case "Control":
                  bgColor = controlColor.bgColor;
                  textColor = controlColor.textColor;
                  break;
                default:
                  break;
              }
              return (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, block.type, block.defaultPayload, block.text)
                  }
                  className={`flex items-center ${bgColor} ${textColor} px-4 py-2 rounded-lg text-sm font-medium cursor-grab transform transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:cursor-grabbing active:shadow-sm active:translate-y-0 select-none ${key === "Motion" ? "mb-4" : ""}`}
                >
                  {block.text}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

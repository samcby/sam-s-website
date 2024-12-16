import React from "react";
import Draggable from "react-draggable";

const DraggableWindow = React.memo(
  ({ title, children, defaultPosition, bounds }) => {
    return (
      <Draggable defaultPosition={defaultPosition} bounds={bounds}>
        <div className="bg-gray-800 text-white rounded-md shadow-lg w-[300px] cursor-move absolute">
          {/* 窗口顶部 */}
          <div className="flex justify-between items-center bg-gray-700 p-2 rounded-t-md">
            <span className="text-sm">{title}</span>
          </div>

          {/* 窗口内容 */}
          <div className="p-4 bg-gray-800 rounded-b-md">{children}</div>
        </div>
      </Draggable>
    );
  }
);

// 添加 displayName
DraggableWindow.displayName = "DraggableWindow";

export default DraggableWindow;

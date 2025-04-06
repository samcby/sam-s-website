export const getInitialPosition = (index, total, containerDimensions) => {
  const windowWidth = 300;
  const windowHeight = 300;
  const maxX = Math.max(0, containerDimensions.width - windowWidth);
  const maxY = Math.max(0, containerDimensions.height - windowHeight);

  // 计算网格布局
  const cols = Math.ceil(Math.sqrt(total));
  const rows = Math.ceil(total / cols);
  const col = index % cols;
  const row = Math.floor(index / cols);

  // 计算网格间距
  const gridWidth = maxX / (cols - 1 || 1);
  const gridHeight = maxY / (rows - 1 || 1);

  // 计算基础网格位置
  const baseX = gridWidth * col;
  const baseY = gridHeight * row;

  // 添加随机偏移（在网格间距的30%范围内）
  const randomOffsetX = (Math.random() - 0.5) * gridWidth * 0.6;
  const randomOffsetY = (Math.random() - 0.5) * gridHeight * 0.6;

  // 计算最终位置
  const x = Math.max(0, Math.min(baseX + randomOffsetX, maxX));
  const y = Math.max(0, Math.min(baseY + randomOffsetY, maxY));

  return {
    position: {
      x,
      y
    },
    velocity: {
      x: (Math.random() - 0.5) * 0.5,
      y: (Math.random() - 0.5) * 0.5
    },
    isDragging: false,
    isVisible: true
  };
};

export const getWindowTitle = (id) => {
  switch(id) {
    case 'photography': return "Photography";
    case 'music': return "Music";
    case 'pet': return "Pet";
    case 'travel': return "Travel";
    case 'fitness': return "Fitness";
    case 'anime': return "Anime";
    case 'art': return "Art";
    case 'volunteer': return "Volunteer";
    default: return "";
  }
}; 
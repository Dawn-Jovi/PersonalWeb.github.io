// 生成模拟数据（实际使用时替换为真实数据）
function generateContributionsData() {
  const data = {};
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const key = date.toISOString().split('T')[0];
    data[key] = Math.floor(Math.random() * 4); // 0-3
  }
  return data;
}



// 创建贡献图
function createContributionGrid() {
  const container = document.getElementById('github-style-grid');
  const data = generateContributionsData();
    

  // 创建SVG元素
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("viewBox", "0 0 728 120");
  
  // 生成网格
  let x = (52 - 1)*14;
  const cellSize = 14;
  const today = new Date();
  
  for (let week = 0; week < 53; week++) {
    for (let day = 0; day < 7; day++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (week * 7 + day));
      
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("class", "day-cell");
      rect.setAttribute("width", "10");
      rect.setAttribute("height", "10");
      rect.setAttribute("x", x);
      rect.setAttribute("y", day * 14);
      rect.setAttribute("data-date", date.toISOString().split('T')[0]);
      rect.setAttribute("data-level", data[date.toISOString().split('T')[0]] || 0);
      
      // 添加悬停交互
      rect.addEventListener('mouseover', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = `
          ${date.toLocaleDateString()}<br>
          活跃度: ${e.target.getAttribute('data-level')}🌟
        `;
        document.body.appendChild(tooltip);
        
        const rectPos = e.target.getBoundingClientRect();
        tooltip.style.left = `${rectPos.left + window.scrollX}px`;
        tooltip.style.top = `${rectPos.top + window.scrollY - 30}px`;
        tooltip.style.opacity = '1';
      });
      
      rect.addEventListener('mouseout', () => {
        document.querySelector('.tooltip')?.remove();
      });
      
      svg.appendChild(rect);
    }
    x -= 14;
    }
    
    
  
  container.appendChild(svg);
}

// 初始化
document.addEventListener('DOMContentLoaded', createContributionGrid);


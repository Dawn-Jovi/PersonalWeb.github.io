// 控制台彩蛋
console.log("👋 好奇的开发者你好！这是我的第3次迭代~");
console.log(`
  (\\_/) 
 ( •ᴗ•)  欢迎来到我的次元小屋！
 / >📁 输入 help() 查看秘籍
`);

// 时间线数据
const timelineData = [
    {
        icon: 'react',
        title: '征服React',
        date: '2024.03',
        desc: '首个SPA应用开发',
        link: '#'
    },
    // 可以继续添加更多时间线数据...
];

// 时间线渲染函数
function renderTimeline() {
    const container = document.querySelector('#timeline .flex');
    if (!container) return;

    container.innerHTML = timelineData.map(item => `
        <div class="timeline-item bg-white/10 p-4 rounded-lg backdrop-blur-sm w-64 flex-shrink-0 transform hover:scale-105 transition">
            <div class="flex items-center mb-2">
                <i class="fab fa-${item.icon} text-2xl text-blue-400 mr-2"></i>
                <span class="font-semibold">${item.title}</span>
            </div>
            <p class="text-sm text-gray-200">${item.date} - ${item.desc}</p>
            <a href="${item.link}" class="mt-2 inline-block text-yellow-300 hover:underline">查看项目 →</a>
        </div>
    `).join('');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    renderTimeline();
    
    // 可以添加更多初始化代码...
});

// 生成云朵
function createClouds() {
    const bg = document.getElementById('bg');
    const cloudCount = 8;
    
    for (let i = 0; i < cloudCount; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        
        // 随机属性
        const size = 80 + Math.random() * 120;
        const top = Math.random() * 100;
        const delay = Math.random() * 20;
        const alpha = 0.7 + Math.random() * 0.3;
        
        cloud.style.cssText = `
            width: ${size}px;
            height: ${size/2}px;
            top: ${top}%;
            left: ${Math.random() * 100}%;
            animation-delay: -${delay}s;
            opacity: ${alpha};
            filter: blur(${Math.random() * 5}px);
        `;
        
        bg.appendChild(cloud);
    }
}

// 生成跟随鼠标的星星
document.addEventListener('mousemove', (e) => {
    const star = document.createElement('div');
    star.className = 'star';
    
    star.style.left = e.clientX + 'px';
    star.style.top = e.clientY + 'px';
    star.style.width = star.style.height = 
        Math.random() * 8 + 3 + 'px';
    
    document.body.appendChild(star);
    
    // 自动移除
    setTimeout(() => {
        star.remove();
    }, 1000);
});

// 初始化
window.addEventListener('DOMContentLoaded', () => {
    createClouds();
    
    // 持续生成随机星光
    setInterval(() => {
        const star = document.createElement('div');
        star.className = 'star';
        
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.width = star.style.height = 
            Math.random() * 5 + 2 + 'px';
        
        document.body.appendChild(star);
        
        setTimeout(() => star.remove(), 2000);
    }, 500);
});
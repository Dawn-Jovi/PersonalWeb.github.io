// 自动跳转逻辑
let seconds = 15;
let time =15;
const countdownElement = document.getElementById('countdown');
const progressBar = document.getElementById('progress');

const updateProgress = () => {
    const progress = ((time - seconds) / time) * 100;
    progressBar.style.width = `${progress}%`;
    countdownElement.textContent = seconds;
    seconds--;

    if (seconds < 0) {
        window.location.href = '/index.html';
    } else {
        setTimeout(updateProgress, 1000);
    }
}

// 启动倒计时
setTimeout(updateProgress, 1000);


// 在页面加载时生成随机装饰元素
function createRandomDecor() {
    const decorContainer = document.body;
    const decorCount = 12; // 生成装饰元素数量

    // 装饰图片数组
    const decorImages = [
        'a1.png',
    ];

    // 批量创建元素
    for (let i = 0; i < decorCount; i++) {
        const decor = document.createElement('img');
        decor.className = 'anime-decor';
        decor.src = decorImages[Math.floor(Math.random() * decorImages.length)];
        
        // 设置随机样式
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // 随机位置（考虑边缘溢出）
        decor.style.left = `${Math.random() * (viewportWidth + 200) - 100}px`;
        decor.style.top = `${Math.random() * (viewportHeight + 200) - 100}px`;
        
        // 随机大小（30px到120px之间）
        const size = 60 + Math.random() * 90;
        decor.style.width = `${size}px`;
        
        // 随机旋转（-15deg到15deg）
        decor.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
        
        // 随机动画参数
        decor.style.animation = `
            float ${6 + Math.random() * 4}s ease-in-out infinite
            ${Math.random() * 2}s // 随机动画延迟
        `;

        decorContainer.appendChild(decor);
    }
}

// 调用函数
window.addEventListener('DOMContentLoaded', createRandomDecor);
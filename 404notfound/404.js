// 自动跳转逻辑
let seconds = 15;
const time = 15; 
const countdownElement = document.getElementById('countdown');
const progressBar = document.getElementById('progress');
let timerId; // 用于存储定时器ID

const updateProgress = () => {
    const progress = ((time - seconds) / time) * 100;
    progressBar.style.width = `${progress}%`;
    countdownElement.textContent = seconds;
    seconds--;

    if (seconds < 0) {
        window.location.href = '../index.html';
    } else {
        timerId = setTimeout(updateProgress, 1000); // 存储定时器ID
    }
}

// 启动倒计时
timerId = setTimeout(updateProgress, 1000);

// 在页面加载时生成随机装饰元素
function createRandomDecor() {
    const decorContainer = document.body;
    const decorCount = 12; // 生成装饰元素数量

    // 装饰图片数组
    const decorImages = [
        'a1.png',
        // 可以添加更多图片如
    ];

    // 批量创建元素
    for (let i = 0; i < decorCount; i++) {
        const decor = document.createElement('img');
        decor.className = 'anime-decor';
        decor.src = decorImages[Math.floor(Math.random() * decorImages.length)];
        decor.alt = "二次元装饰元素";
        
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

console.log('%c ✨ にじげん 彩蛋 ✨', 'color: #ff69b4; font-size: 18px; font-weight: bold; text-shadow: 1px 1px 2px #ff1493;');
console.log('%c 输入"stopCountdown()"可以停止自动跳转哦~', 
           'color: #9370db; font-size: 14px;');
console.log('%c (◕‿◕✿) わくわく！', 'color: #ff69b4; font-size: 14px;');

// 暴露停止函数到全局
window.stopCountdown = function() {
    clearTimeout(timerId); 
    countdownElement.textContent = "∞";
    progressBar.style.width = "100%";
    progressBar.style.backgroundColor = "#ff69b4";
    progressBar.style.boxShadow = "0 0 10px #ff69b4";

    const card = document.querySelector('.construction-card');
    const animeMsg = document.createElement('p');
    animeMsg.textContent = "やめて！(≧∇≦)ﾉ ";
    animeMsg.style.color = "#ff69b4";
    animeMsg.style.fontWeight = "bold";
    animeMsg.style.marginTop = "10px";
    animeMsg.style.textShadow = "1px 1px 2px rgba(255, 105, 180, 0.5)";
    animeMsg.style.fontSize = "18px";
    card.appendChild(animeMsg);

    
    console.log('%c ジャンプ停止しました！(＾▽＾)／', 'color: #ff69b4; font-size: 16px;');
    console.log('%c あなたは彩蛋を見つけました！', 'color: #9370db; font-size: 14px;');
};
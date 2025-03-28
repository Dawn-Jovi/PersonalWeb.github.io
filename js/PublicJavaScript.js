/**
 * 激活彩蛋（Konami Code: ↑↑↓↓←→←→BA）
 * 触发后跳转到指定页面，并带有过渡动画
 */
function activateEasterEgg() {
  // 1. 防止重复触发
  if (window.hasKonamiTriggered) return;
  window.hasKonamiTriggered = true;

  // 2. 添加全屏覆盖层（动画效果）
  const overlay = document.createElement('div');
  overlay.style = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 3rem;
    opacity: 0;
    animation: fadeIn 1s forwards;
  `;
  overlay.innerHTML = '🎮 彩蛋解锁中... 🚀';
  document.body.appendChild(overlay);

  // 3. 添加CSS动画
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // 4. 2秒后跳转页面
  setTimeout(() => {
    window.location.href = '/404notfound/404.html'; // 替换为你的目标页面
  }, 2000);
}

// 5. Konami Code 检测逻辑
const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  // 6. 检查按键序列
  if (e.key === KONAMI_CODE[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === KONAMI_CODE.length) {
      activateEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});
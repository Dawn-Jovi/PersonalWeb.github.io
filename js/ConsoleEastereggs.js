// 控制台彩蛋
console.log("%c (◕‿◕✿) 哇咔咔！发现控制台的小可爱！", "color: #ff6b9d; font-size: 18px;");
console.log("%c 你是来寻找彩蛋的吗？真是个聪明的小可爱呢~", "color: #5d9cec; font-size: 14px;");
console.log(`%c
   ∧,,,∧
  ( ̳• · • ̳)
  /    づ♡ 我是控制台小精灵
  ━━━━━━━━━━━
  发现彩蛋的你真是太棒了！
  要继续保持好奇心哦~
  
  今天也要加油呢 (๑•̀ㅂ•́)و✧
\n\n%c提示：%c试试输入 %csecret()%c 看看会发生什么？`,
'color: #ff6b9d; font-size: 14px;',
'color: #ff6b9d; font-size: 14px;',
'color: #ff85a2; font-weight: bold;',
'color: #ff85a2; font-weight: bold;',
'color: #ff6b9d;'
);
console.log("%c 小心使用控制台哦~ 不要随便粘贴不认识的代码呢 (｡•́︿•̀｡)", "color: #48cfad; font-size: 12px;");

document.addEventListener('copy', function(e) {
            console.log("%c 复制了什么有趣的东西吗？分享时要小心哦~", "color: #ff6b9d;");
});
        
document.addEventListener('paste', function(e) {
    console.log("%c 粘贴要谨慎呢！确保代码来源可靠哦 (｡•̀ᴗ-)✧", "color: #5d9cec;");
});

// 添加一个秘密函数
window.secret = function() {
    console.log(`%c
    (◕‿◕✿) 你发现了我！
    \n这是一个隐藏的秘密消息！
    \n祝你今天有个愉快的一天！✨
    \n\n%c来自：一个喜欢二次元的开发者`,
    'color: #ff85a2; font-size: 14px;',
    'color: #ff6b9d; font-style: italic;'
    );
    
    // 创建一些漂浮的爱心效果
    console.log('%c❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️', 'color: #ff6b9d; font-size: 20px;');
};


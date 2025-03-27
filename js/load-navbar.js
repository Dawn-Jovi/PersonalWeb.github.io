function initScrollEffects() {
  const navbar = document.querySelector('.navbar-container');
  const navLinks = document.querySelectorAll('.nav-link');
  let lastScrollY = window.scrollY;

  // 效果一：固定定位 + 动态缩放
  window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const navbar = document.querySelector('.navbar-container');
      
      // 移除transform位移逻辑，保留背景变化
      navbar.style.background = currentScrollY > 100 
          ? 'rgba(45, 64, 89, 0.8)' 
          : 'rgba(45, 64, 89, 0.1)';
      
      // 添加轻微模糊变化
      navbar.style.backdropFilter = currentScrollY > 100 
          ? 'blur(8px) saturate(180%)' 
          : 'blur(4px) saturate(120%)';
  });

  // 效果二：滚动章节高亮
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle(
            'active-section',
            link.getAttribute('href').includes(targetId)
          );
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// 加载导航栏
function loadNavigation() {
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  
  // 同时加载 HTML 和 CSS
  fetch('/navbar.html')
    .then(response => response.text())
    .then(html => {
      navbarPlaceholder.innerHTML = html;
      setActiveLink();
      setupMobileMenu();
      initScrollEffects();
    })
    .catch(error => {
      console.error('导航栏加载失败:', error);
      navbarPlaceholder.innerHTML = '<p>⚠️ 导航栏加载异常</p>';
    });
    
}


// 设置当前页面高亮
function setActiveLink() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = new URL(link.href).pathname;
    link.classList.toggle('active', linkPath === currentPath);
  });
}

// 移动端菜单切换
function setupMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.navbar-links');

  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // 点击菜单外区域关闭
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadNavigation);


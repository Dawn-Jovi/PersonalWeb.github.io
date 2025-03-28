/**
 * 导航栏功能初始化
 * 包含：滚动效果、移动端菜单、下拉菜单、当前页面高亮
 */

// 调试模式开关
const DEBUG_MODE = true;

function logDebug(...messages) {
  if (DEBUG_MODE) {
    console.log('[导航栏调试]', ...messages);
  }
}

// 主初始化函数
function initNavigation() {
  try {
    logDebug('开始初始化导航栏');
    
    // 1. 设置当前页面高亮
    highlightCurrentPage();
    
    // 2. 初始化滚动效果
    setupScrollEffects();
    
    // 3. 设置移动端菜单
    setupMobileMenu();
    
    // 4. 设置章节高亮
    setupSectionObserver();
    
    logDebug('导航栏初始化完成');
  } catch (error) {
    console.error('导航栏初始化失败:', error);
  }
}

// ==================== 1. 当前页面高亮 ====================
function highlightCurrentPage() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .navbar-links > li > a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPath) {
      link.classList.add('active');
      logDebug('当前页面高亮:', linkPath);
    }
  });
}

// ==================== 2. 滚动效果 ====================
function setupScrollEffects() {
  const navbar = document.querySelector('.navbar-container');
  if (!navbar) return;

  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // 只在Y轴变化超过50px时更新，提高性能
    if (Math.abs(currentScrollY - lastScrollY) > 50) {
      navbar.style.background = currentScrollY > 100 
        ? 'rgba(45, 64, 89, 0.9)' 
        : 'rgba(45, 64, 89, 0.1)';
      
      navbar.style.backdropFilter = currentScrollY > 100 
        ? 'blur(8px) saturate(180%)' 
        : 'blur(4px) saturate(120%)';
      
      lastScrollY = currentScrollY;
      logDebug('滚动位置更新:', currentScrollY);
    }
  });
}

// ==================== 3. 移动端菜单 ====================
function setupMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.navbar-links');
  
  if (!hamburger || !navLinks) {
    console.error('未找到汉堡菜单或导航元素');
    return;
  }

  logDebug('初始化移动端菜单', { hamburger, navLinks });

  // 汉堡菜单点击事件
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    logDebug('汉堡菜单点击');
    
    // 切换菜单状态
    const wasActive = navLinks.classList.contains('active');
    navLinks.classList.toggle('active');
    this.classList.toggle('active');
    
    // 更新ARIA状态
    const isNowActive = !wasActive;
    this.setAttribute('aria-expanded', isNowActive);
    
    // 如果是关闭操作，同时关闭所有下拉菜单
    if (!isNowActive) {
      document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        dropdown.style.display = 'none';
      });
    }
  });

  // 移动端下拉菜单处理
  document.querySelectorAll('.menuitem > a').forEach(item => {
    item.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = this.nextElementSibling;
        
        // 切换当前下拉菜单
        const isShowing = dropdown.style.display === 'block';
        dropdown.style.display = isShowing ? 'none' : 'block';
        
        logDebug('移动端下拉菜单切换', { 
          menuItem: this.textContent.trim(), 
          isShowing: !isShowing 
        });
      }
    });
  });

  // 点击文档其他区域关闭菜单
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.navbar-main') && 
        navLinks.classList.contains('active')) {
      logDebug('点击外部关闭菜单');
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      
      // 同时关闭所有下拉菜单
      document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        dropdown.style.display = 'none';
      });
    }
  });

  // 窗口大小变化时重置菜单
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      logDebug('窗口大小变化，重置菜单');
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      
      // 重置下拉菜单状态
      document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        dropdown.style.display = '';
      });
    }
  });
}

// ==================== 4. 章节高亮 ====================
function setupSectionObserver() {
  const navLinks = document.querySelectorAll('.nav-link');
  if (navLinks.length === 0) return;

  const sections = document.querySelectorAll('section');
  if (sections.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetId = entry.target.id;
        logDebug('章节进入视口:', targetId);
        
        navLinks.forEach(link => {
          const linkHref = link.getAttribute('href');
          if (linkHref.includes(targetId)) {
            link.classList.add('active-section');
            logDebug('高亮导航项:', link.textContent.trim());
          } else {
            link.classList.remove('active-section');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    if (section.id) {
      observer.observe(section);
      logDebug('开始观察章节:', section.id);
    }
  });
}

// ==================== 页面加载后执行 ====================
document.addEventListener('DOMContentLoaded', initNavigation);


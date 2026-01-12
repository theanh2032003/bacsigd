// Create Phone Modal
function createPhoneModal() {
  if (document.getElementById('phone-modal')) return;
  
  const modal = document.createElement('div');
  modal.id = 'phone-modal';
  modal.style.cssText = `
    display: none;
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  `;
  
  modal.innerHTML = `
    <div style="
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      min-width: 300px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    ">
      <h3 style="margin-top: 0; color: #2e7d32;">Gọi Tư Vấn Y Tế</h3>
      <p style="color: #666; margin-bottom: 1.5rem;">Liên hệ ngay để được hỗ trợ 24/7</p>
      <a href="tel:0986777365" style="
        display: inline-block;
        padding: 1rem 2rem;
        background-color: #2e7d32;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 1rem;
        transition: background-color 0.3s;
      " onmouseover="this.style.backgroundColor='#1b5e20'" onmouseout="this.style.backgroundColor='#2e7d32'">
        0986 777 365
      </a>
      <p style="color: #999; font-size: 14px; margin: 1rem 0;">Hoạt động 24/7, hỗ trợ tư vấn ngay lập tức</p>
      <button onclick="document.getElementById('phone-modal').style.display='none'" style="
        background-color: #f0f0f0;
        border: 1px solid #ddd;
        padding: 0.5rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      ">Đóng</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Close modal when clicking outside
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  // Create phone modal on page load
  createPhoneModal();
  
  // Phone button handler
  const phoneBtn = document.querySelector('.phone-btn');
  if (phoneBtn) {
    phoneBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const modal = document.getElementById('phone-modal');
      if (modal) {
        modal.style.display = 'block';
      }
    });
  }
  
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Dropdown toggle for mobile
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a:first-child');
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  });

  // Close menu when clicking on a link (but not dropdown parent)
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Don't close menu if this is a dropdown parent on mobile
      const isDropdownParent = link.parentElement.classList.contains('dropdown');
      const isMobile = window.innerWidth <= 768;
      
      // Only close menu if it's not a dropdown parent OR it's desktop
      if (!isDropdownParent || !isMobile) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  // Set active link
  const currentPage = window.location.pathname;
  const currentPageName = currentPage.split('/').pop() || 'index.html';
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const hrefName = href.split('/').pop();
    
    // Check if current page matches
    if (href === currentPage || 
        hrefName === currentPageName ||
        (currentPageName === '' && (href === 'index.html' || href.endsWith('/index.html'))) ||
        currentPage.endsWith('/') && (href === 'index.html' || href.endsWith('/index.html'))) {
      link.classList.add('active');
    }
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Animate elements on scroll (optional)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply animation to service cards
document.querySelectorAll('.service-card, .why-us-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Form submission handler (if needed)
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  // Add your form handling logic here
  console.log('Form submitted');
}

// Phone number formatting for links
function formatPhoneLink(phone) {
  return 'tel:' + phone.replace(/\D/g, '');
}

// Add analytics or tracking if needed
window.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="tel:"]')) {
    console.log('User clicked phone link:', e.target.href);
    // Add your analytics tracking here
  }
});

// Responsive image handling
if ('IntersectionObserver' in window) {
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(img => {
    observer.observe(img);
  });
}

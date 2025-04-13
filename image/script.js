document.addEventListener('DOMContentLoaded', function() {
  // Top bar dismiss button
  const dismissBtn = document.getElementById('dismiss-btn');
  const topBar = document.querySelector('.top-bar');
  
  if (dismissBtn && topBar) {
      dismissBtn.addEventListener('click', function() {
          topBar.style.display = 'none';
          // Store dismissal in localStorage
          localStorage.setItem('topBarDismissed', 'true');
      });
      
      // Check if dismissed before
      if (localStorage.getItem('topBarDismissed') === 'true') {
          topBar.style.display = 'none';
      }
  }
  
  // Share button functionality
  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
      shareBtn.addEventListener('click', function() {
          if (navigator.share) {
              navigator.share({
                  title: 'TechStore',
                  text: 'Check out this awesome electronics store!',
                  url: window.location.href
              }).catch(err => {
                  console.log('Error sharing:', err);
              });
          } else {
              // Fallback for browsers that don't support Web Share API
              alert('Web Share API not supported in your browser. Please copy the URL manually.');
          }
      });
  }
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });
  
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  // Product card hover effect
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-10px)';
          this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = '';
          this.style.boxShadow = '';
      });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
});
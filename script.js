document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Update active navigation link based on current page
    function setActiveNavLink() {
        const navLinks = document.querySelectorAll('nav ul li a');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            // Remove 'active' class from all links
            link.classList.remove('active');
            // Add 'active' class to current page link
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
            // Special case for index.html (home page)
            if (currentPage === '' || currentPage === 'index.html' && linkPage === 'index.html') {
                link.classList.add('active');
            }
        });
    }

    // Call the function when page loads
    setActiveNavLink();

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const body = document.body;

    hamburger.addEventListener('click', function() {
        const isOpen = this.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('no-scroll');
        this.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking links
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('no-scroll');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    
    // Design category filter
    if (document.querySelector('.category-filter')) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const designItems = document.querySelectorAll('.design-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const category = button.getAttribute('data-category');
                
                designItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Paystack integration for products
    if (document.querySelector('.buy-btn')) {
        const buyButtons = document.querySelectorAll('.buy-btn');
        
        buyButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const product = this.getAttribute('data-product');
                const productName = this.parentElement.parentElement.querySelector('h2').textContent;
                const price = parseInt(this.parentElement.querySelector('.price').textContent.replace(/\D/g, ''));
                
                const handler = PaystackPop.setup({
                    key: 'pk_test_your_paystack_public_key',
                    email: 'Kizchidera@icloud.com',
                    amount: price * 100,
                    currency: 'NGN',
                    ref: 'KIZ' + Math.floor(Math.random() * 1000000000 + 1),
                    metadata: {
                        product: product,
                        product_name: productName
                    },
                    callback: function(response) {
                        alert('Payment complete! Download link has been sent to your email.');
                    },
                    onClose: function() {
                        alert('Payment window closed.');
                    }
                });
                
                handler.openIframe();
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
});
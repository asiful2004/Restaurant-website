// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Menu Category Navigation
    const menuNavBtns = document.querySelectorAll('.menu-nav-btn');
    const menuCategories = document.querySelectorAll('.menu-category');

    menuNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons and categories
            menuNavBtns.forEach(b => b.classList.remove('active'));
            menuCategories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding category
            this.classList.add('active');
            document.getElementById(category).classList.add('active');
        });
    });

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Validate form
            if (validateForm()) {
                submitForm();
            }
        });
    }

    function validateForm() {
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('name').value.trim();
        if (name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Email validation
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation (optional but if provided, should be valid)
        const phone = document.getElementById('phone').value.trim();
        if (phone && phone.length < 10) {
            showError('phoneError', 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Subject validation
        const subject = document.getElementById('subject').value;
        if (!subject) {
            showError('subjectError', 'Please select a subject');
            isValid = false;
        }
        
        // Message validation
        const message = document.getElementById('message').value.trim();
        if (message.length < 10) {
            showError('messageError', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        return isValid;
    }

    function showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }

    function submitForm() {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        // Create FormData object
        const formData = new FormData(contactForm);
        
        // Submit form using fetch
        fetch('php/contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showResponse('success', data.message);
                contactForm.reset();
            } else {
                showResponse('error', data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showResponse('error', 'An error occurred while sending your message. Please try again.');
        })
        .finally(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }

    function showResponse(type, message) {
        formResponse.className = `form-response ${type}`;
        formResponse.textContent = message;
        formResponse.style.display = 'block';
        
        // Scroll to response
        formResponse.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide response after 5 seconds
        setTimeout(() => {
            formResponse.style.display = 'none';
        }, 5000);
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for Fade-in Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.dish-card, .menu-item, .value-card, .gallery-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Navbar Background on Scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Image Loading Error Handler
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.log('Image failed to load:', this.src);
        });
    });

    // Form Input Animation
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});

// Map Functionality for Location Page
function openMap() {
    const address = "123 Restaurant Street, Downtown District, City, State 12345";
    const encodedAddress = encodeURIComponent(address);
    
    // Try to open in Google Maps app first, fallback to web
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    
    // For mobile devices, try to open the app
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        const mapsAppUrl = `maps://maps.google.com/maps?q=${encodedAddress}`;
        window.location.href = mapsAppUrl;
        
        // Fallback to web if app doesn't open
        setTimeout(() => {
            window.open(googleMapsUrl, '_blank');
        }, 1000);
    } else {
        window.open(googleMapsUrl, '_blank');
    }
}

// Utility Functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Lazy Loading for Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Performance Optimization
window.addEventListener('load', function() {
    // Initialize lazy loading
    lazyLoadImages();
    
    // Remove loading classes
    document.body.classList.add('loaded');
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Service Worker Registration (for caching)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(function(registrationError) {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}

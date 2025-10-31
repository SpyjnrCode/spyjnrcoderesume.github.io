/* ============================================
   NAVIGATION & SCROLL BEHAVIOR
   ============================================ */

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLink = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when link is clicked
navLink.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLink.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and items for animations
document.querySelectorAll('.skill-category, .education-card, .stat, .timeline-content, .contact-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

/* ============================================
   CONTACT FORM HANDLING
   ============================================ */

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // Validate form
    if (!data.name || !data.email || !data.subject || !data.message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        showNotification('Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

/* ============================================
   NOTIFICATION SYSTEM
   ============================================ */

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/* ============================================
   NOTIFICATION STYLES (injected)
   ============================================ */

const notificationStyles = `
    <style>
        .notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: white;
            padding: 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            opacity: 0;
            transform: translateY(100px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 400px;
        }

        .notification.show {
            opacity: 1;
            transform: translateY(0);
        }

        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }

        .notification-success {
            border-left: 4px solid #10b981;
        }

        .notification-success .notification-close {
            color: #10b981;
        }

        .notification-error {
            border-left: 4px solid #ef4444;
        }

        .notification-error .notification-close {
            color: #ef4444;
        }

        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            transition: transform 0.2s;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .notification-close:hover {
            transform: scale(1.2);
        }

        @media (max-width: 480px) {
            .notification {
                bottom: 20px;
                right: 20px;
                left: 20px;
                max-width: none;
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */

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

/* ============================================
   PARALLAX EFFECT
   ============================================ */

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0 ${window.scrollY * 0.5}px`;
    }
});

/* ============================================
   TYPING ANIMATION FOR HERO SUBTITLE
   ============================================ */

function typeWriter(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Apply typing animation on page load
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle && subtitle.textContent.length > 0) {
        const originalText = subtitle.textContent;
        // Uncomment below to enable typing animation
        // typeWriter(subtitle, originalText, 80);
    }
});

/* ============================================
   LAZY LOADING IMAGES (future enhancement)
   ============================================ */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ============================================
   DOWNLOAD CV FUNCTIONALITY
   ============================================ */

document.querySelector('.btn-secondary').addEventListener('click', (e) => {
    e.preventDefault();
    downloadCV();
});

function downloadCV() {
    // Create a simple text-based CV
    const cvContent = `
DANIEL JUNIOR MARFO
IT Coordinator & Web Developer

CONTACT INFORMATION
Email: marfo.daniel91@gmail.com
Phone: +233 249 509 996 / +233 265 318 092
Location: Atwima Nwabiagya North District, Ashanti, Ghana

PROFILE
Analytical and detail-oriented web developer skilled in HTML, CSS, JavaScript, Visual Basic, and Excel. Experienced in building responsive websites, automating tasks, and managing data systems. Adept at streamlining processes and delivering user-friendly solutions to support business operations and digital transformation.

EDUCATION
Bachelor of Science - Information Technology Education
University of Education Winneba

Diploma in Basic Education
Mampong-Ashanti

SKILLS
Frontend Development: HTML5, CSS3, JavaScript, Responsive Design
Backend & Database: SQL, MySQL, Data Management, Database Design
Desktop Applications: Visual Basic, Excel, Automation, Reporting
Professional Skills: Communication, Teamwork, Problem Solving, Project Management

EXPERIENCE

IT Coordinator & Web Developer
Atwima Nwabiagya North District Education - Ghana Education Service
February 2024 - Present
• Managed data systems using SQL and MySQL for efficient information handling
• Built responsive web interfaces with HTML, CSS, and JavaScript
• Automated reporting processes using Visual Basic
• Ensured accurate data handling and streamlined operational processes
• Supported information systems aligned with best practices in database management

Computing Teacher
Amoaman D/A Basic School
2012 - 2019
• Taught computing as a core subject to students
• Built and managed student and school data systems using Excel
• Created desktop applications using Visual Basic
• Developed automated reports for data-driven decision making
• Implemented digital tools for efficient academic and administrative management

REFERENCES
Vivien Nsiah
Atwima Nwabiagya North District of Education
Phone: 0553272819 / 0202815454

Ruby Osei-Forson
Atwima Nwabiagya North District of Education
Phone: 0243286683

---
Generated on: ${new Date().toLocaleDateString()}
    `;

    // Create blob and download
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Daniel_Junior_Marfo_CV.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    showNotification('CV downloaded successfully!', 'success');
}

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll performance
let scrollTimeout;
window.addEventListener('scroll', debounce(() => {
    // Scroll-based operations here
}, 100));

/* ============================================
   DARK MODE TOGGLE (Optional Feature)
   ============================================ */

const darkModeToggle = () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
};

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

/* ============================================
   PAGE LOAD PERFORMANCE
   ============================================ */

window.addEventListener('load', () => {
    console.log('Resume website loaded successfully!');
});

// Preload critical resources
if ('link' in document) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link);
}

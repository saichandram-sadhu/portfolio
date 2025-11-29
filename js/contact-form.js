console.log('✅ contact-form.js loaded successfully');

// EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_vaj0t8q';
const EMAILJS_TEMPLATE_ID = 'template_6vgmvzf';
const EMAILJS_PUBLIC_KEY = 'q3bOp6vw17do7dwU4';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Get UI elements
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

// Validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        showFormMessage("⚠ Please fill all fields.", "error");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage("⚠ Enter a valid email address.", "error");
        return false;
    }

    if (message.length < 10) {
        showFormMessage("⚠ Message too short.", "error");
        return false;
    }

    return true;
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = "block";
    setTimeout(() => (formMessage.style.display = "none"), 5000);
}

// Submit handler
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

    const formData = {
        from_name: document.getElementById('name').value.trim(),
        from_email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim(),
        to_email: "saichandram.sadhu.it@gmail.com"
    };

    try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData);

        showFormMessage("✅ Message sent successfully!", "success");
        contactForm.reset();
    } catch (err) {
        console.error(err);
        showFormMessage("❌ Failed to send message. Try again.", "error");
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
});

document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // EMAILJS CREDENTIALS
    // ============================
    const EMAILJS_PUBLIC_KEY = 'bRxcofr_KVT-U4XvS';   
    const EMAILJS_SERVICE_ID = 'service_wpv5vfs';   
    const EMAILJS_TEMPLATE_ID = 'template_a5gc976'; 

    // Initialize EmailJS immediately
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    // ============================
    // FORM HANDLING
    // ============================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Collect form data
            const firstName = document.getElementById('first-name')?.value.trim();
            const lastName = document.getElementById('last-name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const phone = document.getElementById('phone')?.value.trim();
            const service = document.getElementById('service')?.value;
            const otherService = document.getElementById('other-service')?.value.trim() || '';
            const profession = document.getElementById('profession')?.value;
            const projectDetails = document.getElementById('project-details')?.value.trim();
            const communication = document.querySelector('input[name="communication"]:checked')?.value;

            // Simple validation check
            if (!firstName || !lastName || !email || !service || !projectDetails) {
                showStatus('Please fill in all required fields.', 'error');
                return;
            }

            // Build the selected service string
            const finalService = service === 'Others' ? `Others: ${otherService}` : service;

            // Format parameters to match your EmailJS template variables EXACTLY
            const templateParams = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                service: finalService,
                profession: profession,
                project_details: projectDetails,
                communication_method: communication
            };

            // UI Feedback: Loading state
            submitBtn.disabled = true;
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                // REAL MODE — Send via EmailJS with explicit Public Key in the call
                const response = await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    templateParams,
                    EMAILJS_PUBLIC_KEY
                );

                if (response.status === 200) {
                    showStatus('✨ Success! Your request has been sent to Wajiha.', 'success');
                    contactForm.reset();
                    
                    // Reset Other Service field if visible
                    const otherGroup = document.getElementById('other-service-group');
                    if (otherGroup) otherGroup.style.display = 'none';
                    
                    // Close modal if open (wait a second so they see the success)
                    setTimeout(() => {
                        const modal = document.getElementById('modal-overlay');
                        if (modal) {
                            modal.classList.remove('active');
                            document.body.style.overflow = '';
                        }
                    }, 2500);

                } else {
                    throw new Error(`EmailJS responded with status: ${response.status}`);
                }

            } catch (error) {
                console.error('EmailJS Error:', error);
                
                // Show detailed error to help us debug
                let errorMessage = 'Failed to send. ';
                if (error.text) errorMessage += error.text;
                else if (error.message) errorMessage += error.message;
                else errorMessage += 'Please check your internet or try again later.';
                
                showStatus(errorMessage, 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    // ============================
    // STATUS MESSAGE DISPLAY
    // ============================
    function showStatus(message, type) {
        if (!formStatus) return;
        
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
        formStatus.style.display = 'block';

        // Scroll to status message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (formStatus.style.display === 'block') {
                formStatus.style.display = 'none';
            }
        }, 10000);
    }
});

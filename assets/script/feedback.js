document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("feedback-form");

    // Elements
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const feedbackType = document.getElementById("feedback-type");
    const messageInput = document.getElementById("message");

    // Error Messages
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const feedbackTypeError = document.getElementById("feedback-type-error");
    const messageError = document.getElementById("message-error");

    // Form Validation
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Reset Errors
        let valid = true;
        resetErrors();

        // Validate Name
        if (!nameInput.value.trim()) {
            nameError.classList.remove("hidden");
            valid = false;
        }

        // Validate Email
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
            emailError.classList.remove("hidden");
            valid = false;
        }

        // Validate Feedback Type
        if (!feedbackType.value) {
            feedbackTypeError.classList.remove("hidden");
            valid = false;
        }

        // Validate Message
        if (!messageInput.value.trim()) {
            messageError.classList.remove("hidden");
            valid = false;
        }

        // If valid, process the form and reset it
        if (valid) {
            console.log("Form submitted successfully!");

            // Example: Log form data (replace this with an API call if needed)
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                feedbackType: feedbackType.value,
                message: messageInput.value,
                contactBack: document.getElementById("contact-back").checked,
            };
            console.log("Form Data:", formData);

            // Reset Form
            resetForm();
        }
    });

    function resetErrors() {
        nameError.classList.add("hidden");
        emailError.classList.add("hidden");
        feedbackTypeError.classList.add("hidden");
        messageError.classList.add("hidden");
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function resetForm() {
        // Reset all input fields
        nameInput.value = "";
        emailInput.value = "";
        feedbackType.value = "";
        messageInput.value = "";
        document.getElementById("contact-back").checked = false;
    }
});

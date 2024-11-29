document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("feedback-form");

    // Elements
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const feedbackType = document.getElementById("feedback-type");
    const messageInput = document.getElementById("message");
    const stars = document.querySelectorAll("#starRating .star");

    // Error Messages
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const feedbackTypeError = document.getElementById("feedback-type-error");
    const satisfactionError = document.getElementById("satisfaction-error");
    const messageError = document.getElementById("message-error");

    let selectedRating = 0;

    // Star Rating Interaction
    stars.forEach((star, index) => {
        star.addEventListener("click", () => {
            selectedRating = index + 1;
            updateStarRating();
        });
        star.addEventListener("mouseover", () => {
            updateStarRating(index + 1);
        });
        star.addEventListener("mouseout", () => {
            updateStarRating();
        });
    });

    function updateStarRating(tempRating = selectedRating) {
        stars.forEach((star, index) => {
            star.classList.remove("fa-regular", "fa-solid", "text-yellow-500");
            star.classList.add(index < tempRating ? "fa-solid text-yellow-500" : "fa-regular");
        });
    }

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

        // Validate Satisfaction Rating
        if (selectedRating === 0) {
            satisfactionError.classList.remove("hidden");
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
                satisfactionLevel: selectedRating,
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
        satisfactionError.classList.add("hidden");
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
        selectedRating = 0;
        updateStarRating();
        document.getElementById("contact-back").checked = false;
    }
});

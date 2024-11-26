document.addEventListener("DOMContentLoaded", () => {

    //valid date string
    function isValidDate(dateString) {
        // Split the date string into parts (e.g., "2024-02-30" => ["2024", "02", "30"])
        const [year, month, day] = dateString.split('-').map(Number);
    
        // Check if the date parts are valid numbers
        if (!year || !month || !day) return false;
    
        // Create a Date object using the provided values
        const date = new Date(year, month - 1, day); // JavaScript months are 0-based
    
        // Check if the created date matches the input date
        return (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
        );
    }
    // Display today's date
    const today = new Date();
    document.getElementById("currentDate").innerText = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Set minimum and maximum dates for Date of Birth
    const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate()).toISOString().split('T')[0];
    const maxDate = today.toISOString().split('T')[0];
    const dobField = document.getElementById("dob");
    if (dobField) {
        dobField.setAttribute("min", minDate);
        dobField.setAttribute("max", maxDate);
    }

    // Update salary slider value dynamically
    const slider = document.getElementById("salary");
    const salaryDisplay = document.getElementById("salaryDisplay");
    if (slider && salaryDisplay) {
        slider.addEventListener("input", () => {
            salaryDisplay.innerText = `$${slider.value.toLocaleString()}`;
        });
    }

    // Real-time field validation
    const formFields = {
        firstName: {
            element: document.querySelector("input[name='First Name']"),
            errorElement: document.getElementById("firstNameError"),
            validate: (value) => /^[A-Za-z'-]{1,30}$/.test(value) || "First name must be 1-30 letters, apostrophes, or dashes only."
        },
        lastName: {
            element: document.querySelector("input[name='Last Name']"),
            errorElement: document.getElementById("lastNameError"),
            validate: (value) => /^[A-Za-z'-2-5]{1,30}$/.test(value) || "Last name must be 1-30 characters with apostrophes, dashes, or '2-5' only."
        },
        dob: {
            element: dobField,
            errorElement: document.getElementById("dobError"),
            validate: (value) => value || "Date of Birth is required."
        },
        email: {
            element: document.querySelector("input[name='Email']"),
            errorElement: document.getElementById("emailError"),
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Enter a valid email address."
        },
        phone: {
            element: document.querySelector("input[name='Phone']"),
            errorElement: document.getElementById("phoneError"),
            validate: (value) => /^\d{3}-\d{3}-\d{4}$/.test(value) || "Phone number must be in the format 000-000-0000."
        },
        address1: {
            element: document.querySelector("input[name='Address Line 1']"),
            errorElement: document.getElementById("address1Error"),
            validate: (value) => value.length >= 2 && value.length <= 30 || "Address Line 1 must be between 2 and 30 characters."
        },
        zip: {
            element: document.querySelector("input[name='Zip Code']"),
            errorElement: document.getElementById("zipError"),
            validate: (value) => /^\d{5}(-\d{4})?$/.test(value) || "Zip Code must be 5 digits or in the format 12345-6789."
        },
        userId: {
            element: document.getElementById("userId"),
            errorElement: document.getElementById("userIdError"),
            validate: (value) => /^[a-zA-Z][a-zA-Z0-9_-]{4,29}$/.test(value) || "User ID must be 5-30 characters, starting with a letter, and no spaces."
        },
        password: {
            element: document.getElementById("password"),
            errorElement: document.getElementById("passwordError"),
            validate: (value) => {
                if (!value) return "Password is required.";
                if (value.length < 8 || value.length > 30) return "Password must be 8-30 characters long.";
                if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter.";
                if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter.";
                if (!/\d/.test(value)) return "Password must contain at least one digit.";
                if (!/[!@#%^&*()-_=+\/><.,`~]/.test(value)) return "Password must contain at least one special character.";
                if (/"/.test(value)) return "Password cannot contain quotes.";
                return true;
            }
        },
        confirmPassword: {
            element: document.getElementById("confirmPassword"),
            errorElement: document.getElementById("confirmPasswordError"),
            validate: (value) => value === document.getElementById("password").value || "Passwords do not match."
        }
    };

    function validateField(fieldName) {
        const field = formFields[fieldName];
        const value = field.element.value;
        const validationResult = field.validate(value);

        if (validationResult === true) {
            field.errorElement.innerText = "";
            return true;
        } else {
            field.errorElement.innerText = validationResult;
            return false;
        }
    }

    for (const [key, field] of Object.entries(formFields)) {
        if (field.element) {
            field.element.addEventListener("input", () => validateField(key));
        }
    }

    document.getElementById("dob").addEventListener("change", (event) => {
        const dateValue = event.target.value;
        const errorElement = document.getElementById("dobError");
    
        if (!isValidDate(dateValue)) {
            errorElement.textContent = "Please enter a valid date.";
            event.target.setCustomValidity("Invalid date.");
        } else {
            errorElement.textContent = "";
            event.target.setCustomValidity("");
        }
    });

});
const reviewButton = document.getElementById("reviewButton");
const reviewArea = document.getElementById("reviewArea");
const reviewContent = document.getElementById("reviewContent");

reviewButton.addEventListener("click", () => {
    const formData = new FormData(document.getElementById("registrationForm"));
    reviewContent.innerHTML = ""; // Clear previous content
    for (const [key, value] of formData.entries()) {
        if(key == 'SSN' || key == 'Password'){
            reviewContent.innerHTML += `<p><strong>${key}:</strong> Info hidden for privacy</p>`;
        } else if (key == 'Confirm Password') {
            break;
        }else {
        reviewContent.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
    }
}
    reviewArea.style.display = "block"; // Show review section
});
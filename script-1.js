// Function to check if the user is already logged in
function checkUser() {
    const userName = localStorage.getItem('userName') || getCookie('userName');
    const welcomeMessage = document.getElementById('welcome-message');
    const differentUserBtn = document.getElementById('different-user-btn');
    const loginSignupBtn = document.getElementById('login-signup-btn');
    const loginForm = document.getElementById('login-form');

    if (userName) {
        // Show personalized welcome message
        welcomeMessage.innerText = `Welcome back, ${userName}. Would you like to log in or start over?`;
        differentUserBtn.style.display = 'block';
        loginSignupBtn.style.display = 'none';
    } else {
        // Show login/sign-up prompt
        welcomeMessage.innerText = 'Login or Sign up?';
        loginSignupBtn.style.display = 'block';
        differentUserBtn.style.display = 'none';
    }
}

// Function to show the login form when "Login or Sign Up" button is clicked
document.getElementById('login-signup-btn').addEventListener('click', () => {
    document.getElementById('login-form').style.display = 'block';
});

// Function to handle login when the form is submitted
function submitLogin() {
    const userName = document.getElementById('username').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    if (userName) {
        if (rememberMe) {
            localStorage.setItem('userName', userName);
            setCookie('userName', userName, 30);
        } else {
            localStorage.removeItem('userName');
            setCookie('userName', '', -1);
        }

        // Update welcome message and hide the login form
        document.getElementById('welcome-message').innerText = `Welcome back, ${userName}. Would you like to log in or start over?`;
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('different-user-btn').style.display = 'block';
        document.getElementById('login-signup-btn').style.display = 'none';
    } else {
        alert("Please enter a username.");
    }
}

// Function to clear user data when "Not you?" button is clicked
document.getElementById('different-user-btn').addEventListener('click', () => {
    localStorage.removeItem('userName');
    setCookie('userName', '', -1); // Remove cookie
    window.location.reload();       // Reload to reset the page view
});

// Function to set a cookie with expiration in days
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

// Function to get a cookie by name
function getCookie(name) {
    return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}

// Check for cookie consent and show banner if not yet accepted
function checkCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        document.getElementById('cookie-banner').style.display = 'block';
    }
}

// Handle cookie consent acceptance
function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
}

// Initialize user check and cookie consent on page load
window.onload = function() {
    checkUser();
    checkCookieConsent();
};
 

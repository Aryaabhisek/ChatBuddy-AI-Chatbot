document.addEventListener('DOMContentLoaded', function() {
    // Toggle between login and signup forms
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    showSignup.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });
    
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });
    
    // Password strength indicator
    const signupPassword = document.getElementById('signupPassword');
    const strengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    signupPassword.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        
        // Reset all bars
        strengthBars.forEach(bar => {
            bar.style.backgroundColor = '#eee';
        });
        
        // Update bars based on strength
        if (password.length > 0) {
            for (let i = 0; i < strength; i++) {
                let color;
                if (strength === 1) color = '#ff3860'; // Weak
                else if (strength === 2) color = '#ffb86c'; // Medium
                else if (strength === 3) color = '#09c372'; // Strong
                
                strengthBars[i].style.backgroundColor = color;
            }
            
            // Update text
            const strengthLabels = ['Weak', 'Medium', 'Strong'];
            strengthText.textContent = strengthLabels[strength - 1];
        } else {
            strengthText.textContent = 'Password strength';
        }
    });
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (!email || !password) {
            showError('Please fill in all fields');
            return;
        }
        
        // Simulate login request
        simulateLogin(email, password);
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validation
        if (!name || !email || !password || !confirmPassword) {
            showError('Please fill in all fields', signupForm);
            return;
        }
        
        if (password !== confirmPassword) {
            showError('Passwords do not match', signupForm);
            return;
        }
        
        if (calculatePasswordStrength(password) < 2) {
            showError('Password is too weak', signupForm);
            return;
        }
        
        // Simulate signup request
        simulateSignup(name, email, password);
    });
});

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const icon = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function toggleSignupPassword() {
    const passwordInput = document.getElementById('signupPassword');
    const icon = document.querySelectorAll('.toggle-password')[1];
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function calculatePasswordStrength(password) {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Character diversity
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Cap at 3 for our UI
    return Math.min(3, Math.floor(strength / 2));
}

function showError(message, form = document.getElementById('loginForm')) {
    // Remove any existing error messages
    const existingError = form.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Create and display new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    const submitButton = form.querySelector('button[type="submit"]');
    form.insertBefore(errorElement, submitButton);
    
    // Add shake animation for emphasis
    form.style.animation = 'none';
    void form.offsetWidth; // Trigger reflow
    form.style.animation = 'shake 0.5s ease-in-out';
    
    // Remove animation after it completes
    setTimeout(() => {
        form.style.animation = '';
    }, 500);
}

function showSuccess(message, form) {
    // Remove any existing success messages
    const existingSuccess = form.querySelector('.success-message');
    if (existingSuccess) existingSuccess.remove();
    
    // Create and display new success message
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    
    const submitButton = form.querySelector('button[type="submit"]');
    form.insertBefore(successElement, submitButton.nextSibling);
}

function simulateLogin(email, password) {
    // In a real app, this would be an API call to your backend
    console.log('Login attempt with:', { email, password });
    
    // Simulate API delay
    setTimeout(() => {
        // This is just a simulation - in a real app, you'd check the response from your backend
        showSuccess('Login successful! Redirecting...', loginForm);
        
        // Redirect to chat page after successful login
        setTimeout(() => {
            window.location.href = '/chat.html'; // This would be your chat page
        }, 1500);
    }, 1000);
}

function simulateSignup(name, email, password) {
    // In a real app, this would be an API call to your backend
    console.log('Signup attempt with:', { name, email, password });
    
    // Simulate API delay
    setTimeout(() => {
        // This is just a simulation - in a real app, you'd check the response from your backend
        showSuccess('Account created successfully! Redirecting to login...', signupForm);
        
        // Switch back to login form after successful signup
        setTimeout(() => {
            signupForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
            
            // Clear form
            signupForm.reset();
            document.querySelectorAll('.strength-bar').forEach(bar => {
                bar.style.backgroundColor = '#eee';
            });
            document.querySelector('.strength-text').textContent = 'Password strength';
        }, 1500);
    }, 1000);
}

// Add shake animation for error effects
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
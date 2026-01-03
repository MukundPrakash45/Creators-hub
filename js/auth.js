// Authentication JavaScript

// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Mock authentication
    if (email && password) {
      // Simulate API call
      setTimeout(() => {
        const token = 'mock_token_' + Date.now();
        const user = {
          id: 1,
          email: email,
          name: email.split('@')[0],
          avatar: `https://ui-avatars.com/api/?name=${email}`
        };

        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        window.creatorHub.authState.isLoggedIn = true;
        window.creatorHub.authState.user = user;
        
        window.creatorHub.showNotification('Welcome back!', 'success');
        
        setTimeout(() => {
          window.location.href = '../dashboard.html';
        }, 1500);
      }, 1000);
    }
  });
}

// Signup form handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const creatorType = document.getElementById('creatorType').value;

    // Validation
    if (password !== confirmPassword) {
      window.creatorHub.showNotification('Passwords do not match', 'error');
      return;
    }

    if (password.length < 8) {
      window.creatorHub.showNotification('Password must be at least 8 characters', 'error');
      return;
    }

    // Mock registration
    setTimeout(() => {
      const token = 'mock_token_' + Date.now();
      const user = {
        id: Math.random(),
        email: email,
        name: fullName,
        creatorType: creatorType,
        avatar: `https://ui-avatars.com/api/?name=${fullName}`
      };

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      window.creatorHub.authState.isLoggedIn = true;
      window.creatorHub.authState.user = user;
      
      window.creatorHub.showNotification('Account created successfully!', 'success');
      
      setTimeout(() => {
        window.location.href = '../dashboard.html';
      }, 1500);
    }, 1000);
  });
}

// OAuth handlers
const googleLoginBtn = document.getElementById('googleLoginBtn');
const googleSignupBtn = document.getElementById('googleSignupBtn');
const githubLoginBtn = document.getElementById('githubLoginBtn');
const githubSignupBtn = document.getElementById('githubSignupBtn');

[googleLoginBtn, googleSignupBtn].forEach(btn => {
  if (btn) {
    btn.addEventListener('click', () => {
      window.creatorHub.showNotification('Google OAuth integration coming soon', 'info');
      // In production: redirect to Google OAuth endpoint
    });
  }
});

[githubLoginBtn, githubSignupBtn].forEach(btn => {
  if (btn) {
    btn.addEventListener('click', () => {
      window.creatorHub.showNotification('GitHub OAuth integration coming soon', 'info');
      // In production: redirect to GitHub OAuth endpoint
    });
  }
});

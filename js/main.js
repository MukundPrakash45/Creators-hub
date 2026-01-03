// Main JavaScript - Global functionality

// Dark mode only - removed light mode toggle
document.body.style.backgroundColor = 'var(--bg-dark)';
document.body.style.color = 'var(--text-light)';

// API Configuration (to be filled with actual API keys)
const apiConfig = {
  googleOAuth: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    redirectUri: window.location.origin + '/pages/auth/callback.html'
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4'
  },
  stability: {
    apiKey: process.env.STABILITY_API_KEY || ''
  },
  instagram: {
    accessToken: localStorage.getItem('instagram_token') || ''
  },
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY || ''
  },
  twitter: {
    bearerToken: localStorage.getItem('twitter_token') || ''
  }
};

// Social Media Accounts Storage
let connectedAccounts = JSON.parse(localStorage.getItem('connectedAccounts')) || {};

// Auth State Management
const authState = {
  isLoggedIn: !!localStorage.getItem('authToken'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  tokens: {
    instagram: localStorage.getItem('instagram_token'),
    youtube: localStorage.getItem('youtube_token'),
    twitter: localStorage.getItem('twitter_token'),
    facebook: localStorage.getItem('facebook_token')
  }
};

// Update UI based on auth state
function updateAuthUI() {
  const loginBtn = document.querySelector('.login-btn');
  const dashboardBtn = document.querySelector('.dashboard-btn');
  
  if (authState.isLoggedIn && authState.user) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (dashboardBtn) dashboardBtn.style.display = 'inline-block';
  } else {
    if (loginBtn) loginBtn.style.display = 'inline-block';
    if (dashboardBtn) dashboardBtn.style.display = 'none';
  }
}

// Utility: Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Fetch wrapper with error handling
async function apiCall(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Call Error:', error);
    showNotification(`Error: ${error.message}`, 'error');
    throw error;
  }
}

// Export functions for use in other modules
window.creatorHub = {
  authState,
  apiConfig,
  showNotification,
  apiCall,
  updateAuthUI,
  connectSocialMedia,
  disconnectSocialMedia,
  getSocialAccounts
};

// Social Media Connection Functions
window.connectSocialMedia = function(platform) {
  const platforms = {
    youtube: { name: 'YouTube', url: 'https://accounts.google.com/o/oauth2/v2/auth' },
    instagram: { name: 'Instagram', url: 'https://api.instagram.com/oauth/authorize' },
    facebook: { name: 'Facebook', url: 'https://www.facebook.com/v18.0/dialog/oauth' },
    tiktok: { name: 'TikTok', url: 'https://www.tiktok.com/v1/oauth/authorize' },
    twitter: { name: 'Twitter', url: 'https://twitter.com/i/oauth2/authorize' },
    twitch: { name: 'Twitch', url: 'https://id.twitch.tv/oauth2/authorize' }
  };

  const platformData = platforms[platform];
  if (!platformData) return;

  // Mock OAuth flow - in production, use actual OAuth
  const mockToken = `${platform}_${Date.now()}`;
  connectedAccounts[platform] = {
    token: mockToken,
    connectedAt: new Date().toISOString(),
    status: 'connected'
  };

  localStorage.setItem('connectedAccounts', JSON.stringify(connectedAccounts));
  window.creatorHub.showNotification(`${platformData.name} connected successfully!`, 'success');
  renderConnectedAccounts();
};

window.disconnectSocialMedia = function(platform) {
  delete connectedAccounts[platform];
  localStorage.setItem('connectedAccounts', JSON.stringify(connectedAccounts));
  window.creatorHub.showNotification(`Disconnected from ${platform}`, 'success');
  renderConnectedAccounts();
};

function renderConnectedAccounts() {
  const accountsList = document.getElementById('accountsList');
  if (!accountsList) return;

  accountsList.innerHTML = '';

  if (Object.keys(connectedAccounts).length === 0) {
    accountsList.innerHTML = '<p style="color: var(--text-light); opacity: 0.6; grid-column: 1/-1;">No accounts connected yet</p>';
    return;
  }

  Object.entries(connectedAccounts).forEach(([platform, data]) => {
    const item = document.createElement('div');
    item.className = 'account-item';
    item.innerHTML = `
      <div>
        <div class="account-item-name">${platform.charAt(0).toUpperCase() + platform.slice(1)}</div>
        <div class="account-item-status">✓ Connected</div>
      </div>
      <button class="disconnect-btn" onclick="window.disconnectSocialMedia('${platform}')">Disconnect</button>
    `;
    accountsList.appendChild(item);
  });
}

// Initialize connected accounts on page load
document.addEventListener('DOMContentLoaded', () => {
  renderConnectedAccounts();
});

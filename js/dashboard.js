// Dashboard JavaScript

// Check if user is logged in
function checkAuth() {
  if (!window.creatorHub.authState.isLoggedIn) {
    window.location.href = 'auth/login.html';
    return false;
  }
  return true;
}

// Logout functionality
function setupLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.creatorHub.authState.isLoggedIn = false;
      window.creatorHub.authState.user = null;
      window.creatorHub.showNotification('Logged out successfully', 'success');
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 1000);
    });
  }
}

// Initialize charts
function initCharts() {
  const ctxGrowth = document.getElementById('growthChart');
  const ctxPlatform = document.getElementById('platformChart');
  const ctxContentType = document.getElementById('contentTypeChart');
  const ctxEngagement = document.getElementById('engagementChart');

  if (ctxGrowth) {
    new Chart(ctxGrowth, {
      type: 'line',
      data: {
        labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
        datasets: [{
          label: 'Followers Growth',
          data: [2300000, 2350000, 2400000, 2425000, 2470000, 2500000, 2525000],
          borderColor: '#ff6b35',
          backgroundColor: 'rgba(255, 107, 53, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#ffa400',
          pointBorderColor: '#ff6b35',
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-light') }
          }
        },
        scales: {
          y: {
            ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-light') },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
          },
          x: {
            ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-light') },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
          }
        }
      }
    });
  }

  if (ctxPlatform) {
    new Chart(ctxPlatform, {
      type: 'doughnut',
      data: {
        labels: ['Instagram', 'YouTube', 'Twitter', 'Facebook'],
        datasets: [{
          data: [1200000, 800000, 350000, 150000],
          backgroundColor: ['#ff6b35', '#004e89', '#ffa400', '#10b981'],
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-light') }
          }
        }
      }
    });
  }

  if (ctxContentType) {
    new Chart(ctxContentType, {
      type: 'bar',
      data: {
        labels: ['Reels', 'Posts', 'Stories', 'Videos', 'Shorts'],
        datasets: [{
          label: 'Engagement Rate (%)',
          data: [12.5, 8.3, 5.2, 14.8, 9.1],
          backgroundColor: ['#ff6b35', '#ffa400', '#004e89', '#10b981', '#8b5cf6'],
          borderRadius: 8,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-light') }
          }
        },
        scales: {
          y: {
            ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-light') },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
          },
          x: {
            ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-light') },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
          }
        }
      }
    });
  }

  if (ctxEngagement) {
    new Chart(ctxEngagement, {
      type: 'area',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Likes',
          data: [12000, 19000, 15000, 21000],
          borderColor: '#ff6b35',
          backgroundColor: 'rgba(255, 107, 53, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        },
        {
          label: 'Comments',
          data: [5000, 8000, 6500, 10000],
          borderColor: '#ffa400',
          backgroundColor: 'rgba(255, 164, 0, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-light') }
          }
        },
        scales: {
          y: {
            ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-light') },
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            stacked: false
          },
          x: {
            ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-light') },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
          }
        }
      }
    });
  }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
  if (checkAuth()) {
    setupLogout();
    initCharts();
  }
});

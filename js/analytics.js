// Analytics JavaScript

function initAnalyticsCharts() {
  const ctxReach = document.getElementById('reachChart');
  const ctxEngagement = document.getElementById('engagementBreakdownChart');
  const ctxPlatformComparison = document.getElementById('platformComparisonChart');

  const chartOptions = {
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
  };

  if (ctxReach) {
    new Chart(ctxReach, {
      type: 'line',
      data: {
        labels: ['Dec 18', 'Dec 19', 'Dec 20', 'Dec 21', 'Dec 22', 'Dec 23', 'Dec 24', 'Dec 25'],
        datasets: [{
          label: 'Reach',
          data: [5200000, 5450000, 5680000, 6100000, 6450000, 6850000, 7200000, 7500000],
          borderColor: '#ff6b35',
          backgroundColor: 'rgba(255, 107, 53, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        },
        {
          label: 'Impressions',
          data: [12000000, 14500000, 15800000, 18200000, 19500000, 21000000, 22500000, 24500000],
          borderColor: '#ffa400',
          backgroundColor: 'rgba(255, 164, 0, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        }]
      },
      options: chartOptions
    });
  }

  if (ctxEngagement) {
    new Chart(ctxEngagement, {
      type: 'radar',
      data: {
        labels: ['Likes', 'Comments', 'Shares', 'Saves', 'Clicks'],
        datasets: [{
          label: 'Engagement Metrics',
          data: [12000, 5000, 2500, 3200, 8500],
          borderColor: '#ff6b35',
          backgroundColor: 'rgba(255, 107, 53, 0.2)',
          borderWidth: 2
        }]
      },
      options: {
        ...chartOptions,
        scales: {
          r: {
            ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-light') },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
          }
        }
      }
    });
  }

  if (ctxPlatformComparison) {
    new Chart(ctxPlatformComparison, {
      type: 'bar',
      data: {
        labels: ['Instagram', 'YouTube', 'Twitter', 'Facebook'],
        datasets: [{
          label: 'Reach',
          data: [1200000, 5000000, 500000, 300000],
          backgroundColor: 'rgba(255, 107, 53, 0.8)'
        },
        {
          label: 'Engagement',
          data: [600000, 800000, 120000, 50000],
          backgroundColor: 'rgba(255, 164, 0, 0.8)'
        },
        {
          label: 'Followers',
          data: [1200000, 800000, 350000, 150000],
          backgroundColor: 'rgba(0, 78, 137, 0.8)'
        }]
      },
      options: chartOptions
    });
  }
}

// Filter functionality
function setupFilters() {
  const platformFilter = document.getElementById('platformFilter');
  const contentTypeFilter = document.getElementById('contentTypeFilter');
  const startDate = document.getElementById('startDate');
  const endDate = document.getElementById('endDate');

  [platformFilter, contentTypeFilter, startDate, endDate].forEach(filter => {
    if (filter) {
      filter.addEventListener('change', () => {
        window.creatorHub.showNotification('Filters applied', 'info');
        // Here you would fetch filtered data from an API
      });
    }
  });
}

// Logout
function setupLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.creatorHub.authState.isLoggedIn = false;
      window.location.href = '../index.html';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupLogout();
  initAnalyticsCharts();
  setupFilters();
});

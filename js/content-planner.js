// Content Planner JavaScript

// Sample posts data
let plannedPosts = [
  {
    id: 1,
    title: 'Summer Collection',
    platform: 'Instagram',
    type: 'Reel',
    date: '2025-01-15T10:00',
    description: 'Showcase of latest summer collection',
    goal: 'Entertainment',
    status: 'scheduled'
  },
  {
    id: 2,
    title: 'Tutorial Video',
    platform: 'YouTube',
    type: 'Video',
    date: '2025-01-18T14:30',
    description: 'How to use product X feature',
    goal: 'Education',
    status: 'draft'
  }
];

// Initialize calendar
function initCalendar() {
  const calendarGrid = document.getElementById('calendarGrid');
  const currentMonthEl = document.getElementById('currentMonth');
  const prevBtn = document.getElementById('prevMonth');
  const nextBtn = document.getElementById('nextMonth');

  let currentDate = new Date(2025, 0, 1);

  function renderCalendar() {
    calendarGrid.innerHTML = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    currentMonthEl.textContent = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const dayEl = document.createElement('div');
      dayEl.className = 'calendar-day other-month';
      dayEl.innerHTML = `<div class="calendar-day-number">${day}</div>`;
      calendarGrid.appendChild(dayEl);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'calendar-day';
      dayEl.innerHTML = `<div class="calendar-day-number">${day}</div>`;

      const dayPosts = plannedPosts.filter(post => {
        const postDate = new Date(post.date);
        return postDate.getDate() === day && postDate.getMonth() === month && postDate.getFullYear() === year;
      });

      dayPosts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.className = 'calendar-post';
        postEl.textContent = post.title;
        dayEl.appendChild(postEl);
      });

      dayEl.addEventListener('click', () => {
        document.getElementById('postDate').value = new Date(year, month, day).toISOString().slice(0, 16);
        openModal();
      });

      calendarGrid.appendChild(dayEl);
    }

    const remainingDays = 42 - (firstDay + daysInMonth);
    for (let day = 1; day <= remainingDays; day++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'calendar-day other-month';
      dayEl.innerHTML = `<div class="calendar-day-number">${day}</div>`;
      calendarGrid.appendChild(dayEl);
    }
  }

  prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();
}

// Render posts list
function renderPostsList() {
  const postsList = document.getElementById('postsList');
  postsList.innerHTML = '';

  plannedPosts.forEach(post => {
    const postDate = new Date(post.date);
    const postEl = document.createElement('div');
    postEl.className = 'post-card';
    postEl.innerHTML = `
      <div class="post-card-header">
        <h3 class="post-card-title">${post.title}</h3>
        <span class="post-badge">${post.status}</span>
      </div>
      <div class="post-card-meta">
        <span>📱 ${post.platform}</span>
        <span>🎬 ${post.type}</span>
        <span>📅 ${postDate.toLocaleDateString()}</span>
      </div>
      <p class="post-card-description">${post.description}</p>
      <p style="color: var(--text-light); opacity: 0.7; font-size: 0.9rem; margin-bottom: 1rem;">Goal: ${post.goal}</p>
      <div class="post-card-actions">
        <button class="btn btn-secondary" onclick="editPost(${post.id})">Edit</button>
        <button class="btn btn-primary" onclick="deletePost(${post.id})">Delete</button>
      </div>
    `;
    postsList.appendChild(postEl);
  });
}

// Modal functions
function openModal() {
  document.getElementById('addPostModal').classList.add('show');
  document.getElementById('addPostModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('addPostModal').classList.remove('show');
  document.getElementById('addPostModal').classList.add('hidden');
}

// Form submission
document.addEventListener('DOMContentLoaded', () => {
  const addPostBtn = document.getElementById('addPostBtn');
  const addPostForm = document.getElementById('addPostForm');
  const modalClose = document.querySelector('.modal-close');

  if (addPostBtn) addPostBtn.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);

  if (addPostForm) {
    addPostForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newPost = {
        id: plannedPosts.length + 1,
        title: document.getElementById('postTitle').value,
        platform: document.getElementById('postPlatform').value,
        type: document.getElementById('postType').value,
        description: document.getElementById('postDescription').value,
        date: document.getElementById('postDate').value,
        goal: document.getElementById('postGoal').value,
        status: 'draft'
      };
      plannedPosts.push(newPost);
      renderPostsList();
      initCalendar();
      addPostForm.reset();
      closeModal();
      window.creatorHub.showNotification('Post added successfully!', 'success');
    });
  }

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '../index.html';
    });
  }

  initCalendar();
  renderPostsList();
});

function editPost(id) {
  window.creatorHub.showNotification('Edit feature coming soon', 'info');
}

function deletePost(id) {
  plannedPosts = plannedPosts.filter(post => post.id !== id);
  renderPostsList();
  initCalendar();
  window.creatorHub.showNotification('Post deleted', 'success');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  const modal = document.getElementById('addPostModal');
  if (e.target === modal) {
    closeModal();
  }
});

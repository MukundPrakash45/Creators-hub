// Ideas Generator JavaScript

// Generate ideas using Gemini API
async function generateIdeas() {
  const niche = document.getElementById('nicheInput')?.value || 'general content creation';
  const platform = document.getElementById('platformFilterIdeas')?.value || 'youtube';

  try {
    const response = await fetch('http://localhost:3000/api/generate-ideas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ niche, platform })
    });

    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    
    return data.ideas.ideas || [];
  } catch (error) {
    console.error('Ideas generation error:', error);
    window.creatorHub.showNotification('Error generating ideas. Using fallback ideas.', 'warning');
    return getFallbackIdeas();
  }
}

// Fallback ideas if API fails
function getFallbackIdeas() {
  return [
    'Behind-the-Scenes content showing your creative process',
    'Q&A sessions answering audience questions',
    'Tutorial or How-To guides for your niche',
    'Content using trending audio and sounds',
    'Challenge videos encouraging audience participation',
    'Quick tips and life hacks (15-30 seconds)',
    'Podcast or audio content with deep insights',
    'Reaction videos to trending content',
    'Collaboration with other creators',
    'Personal growth or failure story sharing'
  ];
}

const ideas = [
  {
    emoji: '🎬',
    title: 'Behind-the-Scenes',
    description: 'Show your creative process and day-in-the-life content',
    platforms: ['instagram', 'youtube', 'tiktok'],
    type: 'entertainment'
  },
  {
    emoji: '❓',
    title: 'Q&A Session',
    description: 'Answer audience questions and build community engagement',
    platforms: ['instagram', 'youtube', 'twitter'],
    type: 'engagement'
  },
  {
    emoji: '📚',
    title: 'Tutorial / How-To',
    description: 'Share your expertise with step-by-step guides',
    platforms: ['youtube', 'tiktok', 'instagram'],
    type: 'educational'
  },
  {
    emoji: '🔥',
    title: 'Trending Audio',
    description: 'Create content using trending sounds and music',
    platforms: ['tiktok', 'instagram', 'youtube'],
    type: 'trending'
  },
  {
    emoji: '🏆',
    title: 'Challenge',
    description: 'Create a challenge and encourage audience participation',
    platforms: ['tiktok', 'instagram', 'youtube'],
    type: 'engagement'
  },
  {
    emoji: '⚡',
    title: 'Quick Tips',
    description: '15-30 second quick tips and life hacks',
    platforms: ['tiktok', 'instagram', 'youtube'],
    type: 'educational'
  },
  {
    emoji: '🎙️',
    title: 'Podcast / Audio',
    description: 'Share deep insights and long-form content',
    platforms: ['youtube', 'twitter'],
    type: 'educational'
  },
  {
    emoji: '💭',
    title: 'Reaction Video',
    description: 'React to trending videos, news, or events',
    platforms: ['youtube', 'tiktok', 'instagram'],
    type: 'entertainment'
  },
  {
    emoji: '🤝',
    title: 'Collaboration',
    description: 'Partner with other creators for unique content',
    platforms: ['youtube', 'instagram', 'tiktok'],
    type: 'engagement'
  },
  {
    emoji: '🎯',
    title: 'Case Study',
    description: 'Share success stories and lessons learned',
    platforms: ['youtube', 'twitter'],
    type: 'educational'
  }
];

const hashtags = [
  { name: '#ContentCreator', count: 2.5 },
  { name: '#CreatorEconomy', count: 1.8 },
  { name: '#SocialMedia', count: 15.2 },
  { name: '#SmallBusiness', count: 8.9 },
  { name: '#MarketingTips', count: 3.4 },
  { name: '#Entrepreneur', count: 12.1 },
  { name: '#InfluencerLife', count: 6.7 },
  { name: '#DigitalMarketing', count: 5.3 },
  { name: '#ContentMarketing', count: 4.2 },
  { name: '#SocialMediaTips', count: 2.9 },
  { name: '#BrandBuilding', count: 3.8 },
  { name: '#CreativeContent', count: 1.5 }
];

function renderIdeas(filteredIdeas = ideas) {
  const container = document.getElementById('ideasContainer');
  container.innerHTML = '';

  if (filteredIdeas.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-light); opacity: 0.6;">No ideas found for your filters</p>';
    return;
  }

  filteredIdeas.forEach(idea => {
    const card = document.createElement('div');
    card.className = 'idea-card';
    card.innerHTML = `
      <div class="idea-emoji">${idea.emoji}</div>
      <h3 class="idea-title">${idea.title}</h3>
      <p class="idea-description">${idea.description}</p>
      <div class="idea-meta">
        <span class="idea-badge">${idea.type}</span>
        <span class="idea-badge">${idea.platforms.length} platform(s)</span>
      </div>
      <div class="idea-actions">
        <button class="btn btn-secondary" onclick="copyIdea('${idea.title}')">📋 Copy</button>
        <button class="btn btn-primary" onclick="useIdea('${idea.title}')">✏️ Plan</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderHashtags() {
  const container = document.getElementById('hashtagsList');
  container.innerHTML = '';

  hashtags.forEach(tag => {
    const card = document.createElement('div');
    card.className = 'hashtag-card';
    card.innerHTML = `
      <div class="hashtag-name">${tag.name}</div>
      <div class="hashtag-count">${tag.count}M posts</div>
    `;
    card.addEventListener('click', () => {
      navigator.clipboard.writeText(tag.name);
      window.creatorHub.showNotification(`Copied ${tag.name}`, 'success');
    });
    container.appendChild(card);
  });
}

function filterIdeas() {
  const niche = document.getElementById('niche').value.toLowerCase();
  const platform = document.getElementById('platform').value;
  const type = document.getElementById('contentType').value;

  let filtered = ideas;

  if (platform !== 'all') {
    filtered = filtered.filter(idea => idea.platforms.includes(platform));
  }

  if (type !== 'all') {
    filtered = filtered.filter(idea => idea.type === type);
  }

  renderIdeas(filtered);
}

function copyIdea(title) {
  navigator.clipboard.writeText(title);
  window.creatorHub.showNotification(`Copied: ${title}`, 'success');
}

function useIdea(title) {
  window.location.href = 'content-planner.html';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generateBtn');
  const platformSelect = document.getElementById('platform');
  const typeSelect = document.getElementById('contentType');
  const logoutBtn = document.getElementById('logoutBtn');

  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      window.creatorHub.showNotification('Generating ideas...', 'info');
      filterIdeas();
    });
  }

  if (platformSelect) platformSelect.addEventListener('change', filterIdeas);
  if (typeSelect) typeSelect.addEventListener('change', filterIdeas);

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '../index.html';
    });
  }

  renderIdeas();
  renderHashtags();
});

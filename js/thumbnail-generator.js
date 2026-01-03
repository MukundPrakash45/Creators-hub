// Thumbnail Generator JavaScript

let generatedThumbnails = [];

// Platform dimensions
const platformDimensions = {
  youtube: { width: 1280, height: 720 },
  twitch: { width: 1920, height: 1080 },
  instagram: { width: 1080, height: 1080 }
};

// Toggle custom size inputs
document.addEventListener('DOMContentLoaded', () => {
  const platformSelect = document.getElementById('platform');
  const customSizeGroup = document.getElementById('customSizeGroup');

  if (platformSelect) {
    platformSelect.addEventListener('change', (e) => {
      if (e.target.value === 'custom') {
        customSizeGroup.style.display = 'grid';
      } else {
        customSizeGroup.style.display = 'none';
        const dims = platformDimensions[e.target.value];
        updateDimensionText(dims.width, dims.height);
      }
    });
  }
});

// Update dimension text
function updateDimensionText(width, height) {
  const platform = document.getElementById('platform').value;
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
  const text = platform === 'custom' ? 
    `Custom (${width}×${height})` : 
    `${platformName} (${width}×${height})`;
  document.getElementById('dimensionText').textContent = text;
}

// Generate mock thumbnail (using canvas)
function generateMockThumbnail(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Background
  const styles = {
    bold: { bg: '#FF5722', fg: '#FFFFFF' },
    minimal: { bg: '#FFFFFF', fg: '#000000' },
    viral: { bg: '#FFD700', fg: '#FF0000' },
    professional: { bg: '#1A237E', fg: '#FFFFFF' },
    artistic: { bg: '#E91E63', fg: '#FFFFFF' }
  };

  const style = document.getElementById('style').value;
  const colors = styles[style];
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, width, height);

  // Text overlay
  const text = document.getElementById('textOverlay').value || 'YOUR TEXT HERE';
  ctx.fillStyle = colors.fg;
  ctx.font = `bold ${Math.floor(width / 6)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 10;
  ctx.fillText(text, width / 2, height / 2);

  // Add emoji if checked
  if (document.getElementById('includeEmojis').checked) {
    ctx.font = `${Math.floor(width / 4)}px Arial`;
    ctx.fillText('👈', width * 0.8, height * 0.2);
  }

  return canvas.toDataURL('image/png');
}

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('thumbnailForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Show loading
      document.getElementById('thumbnailPreview').classList.add('hidden');
      document.getElementById('emptyState').classList.add('hidden');
      document.getElementById('loadingSpinner').classList.remove('hidden');

      // Simulate API call
      setTimeout(() => {
        const platform = document.getElementById('platform').value;
        const dims = platform === 'custom' ? 
          { 
            width: parseInt(document.getElementById('customWidth').value),
            height: parseInt(document.getElementById('customHeight').value)
          } :
          platformDimensions[platform];

        updateDimensionText(dims.width, dims.height);

        const thumbnailUrl = generateMockThumbnail(dims.width, dims.height);
        document.getElementById('thumbnailImage').src = thumbnailUrl;

        document.getElementById('thumbnailPreview').classList.remove('hidden');
        document.getElementById('loadingSpinner').classList.add('hidden');

        generatedThumbnails.push({
          id: generatedThumbnails.length + 1,
          prompt: document.getElementById('prompt').value,
          url: thumbnailUrl,
          platform: platform,
          dimensions: dims,
          timestamp: new Date()
        });

        showActionButtons();
        renderHistory();
      }, 2000);
    });
  }

  // Download button
  const downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const image = document.getElementById('thumbnailImage');
      const link = document.createElement('a');
      link.href = image.src;
      link.download = `thumbnail-${Date.now()}.png`;
      link.click();
      window.creatorHub.showNotification('Thumbnail downloaded!', 'success');
    });
  }

  // Regenerate button
  const regenerateBtn = document.getElementById('regenerateBtn');
  if (regenerateBtn) {
    regenerateBtn.addEventListener('click', () => {
      form.dispatchEvent(new Event('submit'));
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
});

function showActionButtons() {
  document.getElementById('downloadBtn').style.display = 'inline-block';
  document.getElementById('regenerateBtn').style.display = 'inline-block';
}

function renderHistory() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';

  if (generatedThumbnails.length === 0) {
    historyList.innerHTML = '<p style="color: var(--text-light); opacity: 0.6; grid-column: 1/-1;">No thumbnails generated yet</p>';
    return;
  }

  generatedThumbnails.slice().reverse().forEach(thumb => {
    const card = document.createElement('div');
    card.className = 'history-card';
    card.innerHTML = `
      <img src="${thumb.url}" alt="${thumb.prompt}" class="history-card-image">
      <div class="history-card-content">
        <p class="history-card-title">${thumb.prompt.substring(0, 30)}...</p>
        <p class="history-card-meta">${thumb.platform} • ${thumb.dimensions.width}×${thumb.dimensions.height}</p>
        <div class="history-card-actions">
          <button class="btn btn-secondary" onclick="downloadThumbnail('${thumb.url}')">Download</button>
          <button class="btn btn-primary" onclick="useThumbnail(${thumb.id})">Use</button>
        </div>
      </div>
    `;
    historyList.appendChild(card);
  });
}

function downloadThumbnail(url) {
  const link = document.createElement('a');
  link.href = url;
  link.download = `thumbnail-${Date.now()}.png`;
  link.click();
  window.creatorHub.showNotification('Thumbnail downloaded!', 'success');
}

function useThumbnail(id) {
  const thumb = generatedThumbnails.find(t => t.id === id);
  if (thumb) {
    document.getElementById('thumbnailImage').src = thumb.url;
    document.getElementById('thumbnailPreview').classList.remove('hidden');
    window.creatorHub.showNotification('Thumbnail loaded!', 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

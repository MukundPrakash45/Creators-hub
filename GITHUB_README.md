# CreatorHub - AI-Powered Content Creator Analytics Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D%2018.0.0-green.svg)
![Status](https://img.shields.io/badge/status-Production%20Ready-brightgreen.svg)

A comprehensive frontend + backend platform for content creators to manage analytics, plan content, generate scripts with AI, and connect social media accounts.

## ✨ Features

- 📊 **Real-Time Analytics** - Dashboard with Chart.js visualizations
- ✍️ **AI Script Generator** - Powered by Google Gemini API
- 💡 **Ideas Generator** - Get trending content ideas and hashtags
- 📅 **Content Calendar** - Plan content for entire year
- 📱 **Social Media Integration** - Connect YouTube, Instagram, Facebook, TikTok, Twitter, Twitch
- 🎨 **Thumbnail Generator** - AI-powered thumbnail creation
- 🌙 **Dark Mode** - Modern dark-themed interface
- 📱 **Fully Responsive** - Works on desktop, tablet, mobile

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/creatorhub.git
cd creatorhub

# Install dependencies
npm install

# Create .env file
echo "GEMINI_API_KEY=your_api_key_here" > .env
echo "PORT=3000" >> .env
```

### Running Locally

**Terminal 1 - Start Backend Server:**
```bash
npm start
```

**Terminal 2 - Start Frontend Server:**
```bash
python -m http.server 8000
```

**Open Browser:**
```
http://localhost:8000
```

## 📁 Project Structure

```
creatorhub/
├── index.html                    # Landing page
├── server.js                     # Express backend
├── package.json                  # Node dependencies
├── .env                          # Environment variables (add your API key)
├── .gitignore                    # Git ignore rules
├── pages/
│   ├── dashboard.html
│   ├── analytics.html
│   ├── content-planner.html
│   ├── script-generator.html
│   ├── thumbnail-generator.html
│   ├── ideas-generator.html
│   └── auth/
│       ├── login.html
│       └── signup.html
├── css/
│   ├── styles.css
│   ├── landing.css
│   ├── dashboard.css
│   ├── analytics.css
│   ├── content-planner.css
│   ├── script-generator.css
│   ├── thumbnail-generator.css
│   ├── ideas-generator.css
│   └── auth.css
├── js/
│   ├── main.js
│   ├── auth.js
│   ├── dashboard.js
│   ├── analytics.js
│   ├── content-planner.js
│   ├── script-generator.js
│   ├── thumbnail-generator.js
│   └── ideas-generator.js
└── assets/
    ├── icons/
    └── images/
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=3000
```

**Get your Gemini API Key:**
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy it to `.env` file

⚠️ **Important:** Never commit `.env` to git. It's in `.gitignore` for security.

## 🌐 API Endpoints

### Script Generation
```
POST /api/generate-script
Content-Type: application/json

{
  "platform": "youtube",
  "topic": "how to code",
  "duration": "60",
  "tone": "educational",
  "language": "english"
}

Response:
{
  "success": true,
  "script": {
    "hook": "...",
    "main_content": "...",
    "cta": "...",
    "tips": "..."
  }
}
```

### Ideas Generation
```
POST /api/generate-ideas
Content-Type: application/json

{
  "niche": "technology",
  "platform": "youtube"
}

Response:
{
  "success": true,
  "ideas": {
    "ideas": ["idea1", "idea2", ...],
    "hashtags": ["#tech", "#trending", ...]
  }
}
```

### Health Check
```
GET /api/health

Response:
{
  "status": "Server running",
  "timestamp": "2025-01-03T..."
}
```

## 📊 Features Breakdown

### Dashboard
- Real-time performance metrics
- 4 interactive Chart.js visualizations
- Platform-wise analytics
- Growth trends

### Analytics
- Detailed platform metrics
- Custom filtering (platform, date range, content type)
- Engagement breakdown
- Performance comparison

### Content Planner
- Interactive calendar with 12 months
- Post scheduling
- Status tracking (Draft, Scheduled, Published)
- Platform-specific planning

### Script Generator
- AI-powered script generation using Google Gemini
- Multiple tones (Funny, Motivational, Educational, etc.)
- Language support
- Copy and download functionality

### Ideas Generator
- AI-generated content ideas
- Trending hashtag suggestions
- Platform-specific recommendations
- One-click copy

### Social Media Integration
- Connect YouTube, Instagram, Facebook, TikTok, Twitter, Twitch
- Account management
- LocalStorage persistence
- Ready for OAuth integration

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3 (Grid, Flexbox, Variables)
- JavaScript ES6+
- Chart.js (data visualization)

### Backend
- Node.js
- Express.js
- Google Generative AI API (@google/genai)
- CORS middleware

### Deployment Ready
- Vercel
- Netlify
- Traditional hosting

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Netlify

1. Push to GitHub
2. Connect repository to Netlify
3. Set environment variables
4. Deploy

## 📝 Documentation

- [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) - Complete setup guide
- [QUICK_START_NEW_FEATURES.md](./QUICK_START_NEW_FEATURES.md) - Feature overview
- [ALL_UPDATES_SUMMARY.md](./ALL_UPDATES_SUMMARY.md) - Project summary
- [VISUAL_GUIDE.md](./VISUAL_GUIDE.md) - Before/after visuals

## 🐛 Troubleshooting

### Server won't start
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Use different port
echo "PORT=3001" >> .env
```

### API key not working
- Verify `.env` file exists
- Check API key is valid in [Google AI Studio](https://aistudio.google.com/app/apikey)
- Ensure `.env` is in `.gitignore` (never commit it)

### Frontend can't reach backend
- Ensure server is running on port 3000
- Check CORS is enabled (it is by default)
- Look for errors in browser console (F12)

## 📈 Roadmap

- [ ] Real OAuth integration for social platforms
- [ ] User authentication system
- [ ] Database storage (MongoDB/PostgreSQL)
- [ ] Advanced analytics
- [ ] Team collaboration features
- [ ] Mobile app
- [ ] More AI models

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Built for content creators by developers who understand the creator economy.

## 🙏 Acknowledgments

- [Google Gemini API](https://aistudio.google.com/) - AI script generation
- [Chart.js](https://www.chartjs.org/) - Data visualization
- [Express.js](https://expressjs.com/) - Web framework

## 📞 Support

For support, email support@creatorhub.dev or open an issue on GitHub.

## 🌟 Show Your Support

If you find this project helpful, please star it on GitHub! ⭐

---

**Built with ❤️ for content creators worldwide**

Happy creating! 🚀

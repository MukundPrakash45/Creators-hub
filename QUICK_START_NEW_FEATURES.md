# 🚀 Quick Start - CreatorHub Updates

## ⚡ 5-Minute Setup

### 1. Install & Start Server (2 minutes)

```bash
# Open PowerShell or Command Prompt
cd "c:\Users\mukun\OneDrive\Desktop\New folder\creatorhub"

# Install dependencies
npm install

# Start server
npm start
```

**You should see:**
```
✅ CreatorHub Server running on http://localhost:3000
```

### 2. Open Frontend (1 minute)

**Option A - Direct File:**
```
Windows Explorer → Navigate to the folder
Double-click: index.html
```

**Option B - Local Server:**
```bash
# In a new terminal window
cd "c:\Users\mukun\OneDrive\Desktop\New folder\creatorhub"
python -m http.server 8000
```
Then visit: `http://localhost:8000`

### 3. Test Features (2 minutes)

---

## 🎯 Feature Quick Tests

### Test 1: Script Generator (Uses Gemini API)
1. ✅ Click "Dashboard" button on landing page
2. ✅ Click "Script Generator" in navigation
3. ✅ Fill form:
   - Platform: YouTube
   - Topic: "How to make viral videos"
   - Duration: 60
   - Tone: Motivational
   - Language: English
4. ✅ Click "Generate Script"
5. ✅ Watch Gemini API generate real script
6. ✅ Copy or Download

### Test 2: Social Media Connection
1. ✅ Go back to landing page
2. ✅ Scroll down to "Connect Accounts" section
3. ✅ Click "YouTube" button
4. ✅ See "YouTube - ✓ Connected" appear below
5. ✅ Click "Instagram" button
6. ✅ See Instagram connect
7. ✅ Click "Disconnect" on YouTube
8. ✅ It disappears
9. ✅ Refresh page (Ctrl+R)
10. ✅ Instagram still there! (Data persisted)

### Test 3: Content Calendar Months
1. ✅ Go to "Content Planner" page
2. ✅ Find month dropdown
3. ✅ Click dropdown
4. ✅ Verify all 12 months present:
   - January ✅
   - February ✅
   - ... through...
   - December ✅

### Test 4: Dark Mode Only
1. ✅ Look at header - no 🌙 (moon) button
2. ✅ Everything is dark themed
3. ✅ No light mode option anywhere
4. ✅ All pages are dark

### Test 5: No Auth Required
1. ✅ Landing page loads without login
2. ✅ "Go to Dashboard" button works
3. ✅ No login page required
4. ✅ All pages accessible

### Test 6: No Pricing
1. ✅ Landing page has no "Pricing" link
2. ✅ Footer has no pricing section
3. ✅ CTA says "Go to Dashboard" not "Get Started Free"

### Test 7: Analytics Charts
1. ✅ Go to Dashboard
2. ✅ See 4 charts with data:
   - Growth trend line chart
   - Platform breakdown doughnut
   - Content performance bars
   - Engagement radar
3. ✅ Go to Analytics page
4. ✅ See metric cards and more charts
5. ✅ Filter by platform/date range

---

## 🔧 Troubleshooting (If Something Doesn't Work)

### Problem: "npm: command not found"
**Solution:** Install Node.js from nodejs.org

### Problem: Port 3000 already in use
**Solution:** Edit `.env` file:
```
GEMINI_API_KEY=AIzaSyCSiOthBcMk9YagcWk31uZrV_Hb6uX0ykA
PORT=3001
```
Then `npm start`

### Problem: Script Generator shows error
**Solution:** 
- Check server is running (should see port 3000 message)
- Verify `@google/generative-ai` installed: `npm install`
- Check internet connection

### Problem: Social accounts don't persist
**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Check LocalStorage enabled
- Try incognito mode

### Problem: Charts not showing
**Solution:**
- Check browser console (F12) for errors
- Verify Chart.js CDN loaded
- Refresh page (Ctrl+R)

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `server.js` | Backend API server |
| `.env` | API key configuration |
| `package.json` | Node dependencies |
| `index.html` | Landing with social connect |
| `pages/script-generator.html` | AI script generation |
| `pages/content-planner.html` | Calendar with 12 months |
| `pages/dashboard.html` | Analytics charts |
| `js/main.js` | Social media functions |

---

## 🎨 Key Changes From Original

| Feature | Change |
|---------|--------|
| Light Mode | ❌ Removed |
| Theme Toggle | ❌ Removed |
| Auth Pages | ❌ Hidden (still exist) |
| Pricing | ❌ Removed |
| Script Generation | 📝 Now uses Gemini API |
| Social Accounts | ✅ New feature |
| Calendar Months | 📅 Now has all 12 |
| Analytics | 📊 Real Chart.js |

---

## 💡 API Endpoint Examples

### Generate Script (POST)
```
http://localhost:3000/api/generate-script

Body:
{
  "platform": "youtube",
  "topic": "gaming tips",
  "duration": "60",
  "tone": "funny",
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

### Health Check (GET)
```
http://localhost:3000/api/health

Response:
{
  "status": "Server running",
  "timestamp": "2025-01-03T..."
}
```

---

## 📝 Common Tasks

### Change API Key
Edit `.env`:
```
GEMINI_API_KEY=your_new_key_here
PORT=3000
```

### Use Different Port
Edit `.env`:
```
GEMINI_API_KEY=...
PORT=3001
```

### Customize Social Platforms
Edit `index.html` and `js/main.js` to add more platforms

### Change Brand Name
Edit `index.html` landing page and update "CreatorHub" text

### Deploy to Production
1. Push to GitHub
2. Deploy to Vercel (free)
3. Set environment variables
4. Done!

---

## ✅ Success Checklist

- [ ] Server starts on port 3000
- [ ] Landing page loads
- [ ] Can generate scripts with Gemini API
- [ ] Can connect social accounts
- [ ] Social accounts persist on refresh
- [ ] All 12 months in calendar dropdown
- [ ] Dark mode only (no light option)
- [ ] No auth required
- [ ] No pricing section
- [ ] Dashboard charts display
- [ ] No console errors (F12)

---

## 🎯 Next Steps

1. **Test everything** above ✅
2. **Customize** colors/text to your brand
3. **Deploy** to Vercel/Netlify (free)
4. **Add real APIs** for social platforms
5. **Add database** for persistent data

---

## 📞 Support Resources

- `SETUP_INSTRUCTIONS.md` - Full setup guide
- `UPDATES_COMPLETE.md` - Detailed change list
- `README.md` - Complete documentation
- Browser DevTools (F12) - Debug issues

---

## 🚀 Ready?

```bash
# 1. Start server
npm start

# 2. Open browser
index.html

# 3. Test features

# 4. Build your empire! 🎉
```

**Questions?** Check the documentation files in the project folder.

**Stuck?** Check browser console (F12) for error messages.

**All set!** You have a fully functional, Gemini API-powered content creator platform! 🎊

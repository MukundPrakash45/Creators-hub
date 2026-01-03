const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Initialize Gemini API
const ai = new GoogleGenAI({});

// Generate Script Route
app.post('/api/generate-script', async (req, res) => {
  try {
    const { platform, topic, duration, tone, language } = req.body;

    const prompt = `Create a ${duration} second video script for ${platform} about "${topic}" with a ${tone} tone in ${language} language. 
    Return ONLY valid JSON with these exact fields: 
    {
      "hook": "text here",
      "main_content": "text here",
      "cta": "text here",
      "tips": "text here"
    }`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    const text = response.text;

    // Remove markdown code blocks if present
    let cleanedText = text;
    if (text.includes('```json')) {
      cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (text.includes('```')) {
      cleanedText = text.replace(/```\n?/g, '');
    }
    cleanedText = cleanedText.trim();

    // Try to parse as JSON, fallback to plain text
    let scriptData;
    try {
      scriptData = JSON.parse(cleanedText);
    } catch {
      // If JSON parsing fails, extract text from the response
      scriptData = { 
        hook: text.split('\n')[0] || text,
        main_content: text,
        cta: 'Subscribe for more content',
        tips: 'Keep it engaging and authentic'
      };
    }

    // Flatten any nested objects
    if (scriptData.hook && typeof scriptData.hook === 'object' && scriptData.hook.script) {
      scriptData.hook = scriptData.hook.script;
    }
    if (scriptData.main_content && typeof scriptData.main_content === 'object' && scriptData.main_content.script) {
      scriptData.main_content = scriptData.main_content.script;
    }
    if (scriptData.cta && typeof scriptData.cta === 'object' && scriptData.cta.script) {
      scriptData.cta = scriptData.cta.script;
    }
    if (scriptData.tips && typeof scriptData.tips === 'object' && scriptData.tips.script) {
      scriptData.tips = scriptData.tips.script;
    }

    res.json({ success: true, script: scriptData });
  } catch (error) {
    console.error('Script Generation Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate Ideas Route
app.post('/api/generate-ideas', async (req, res) => {
  try {
    const { niche, platform } = req.body;

    const prompt = `Generate 10 viral content ideas for a ${niche} creator on ${platform}. 
    Also generate 15 relevant hashtags. 
    Format as JSON with fields: ideas (array), hashtags (array)`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    const text = response.text;

    let ideasData;
    try {
      ideasData = JSON.parse(text);
    } catch {
      ideasData = { 
        ideas: text.split('\n').filter(line => line.trim()),
        hashtags: ['#trending', '#viral', '#content', '#creator']
      };
    }

    res.json({ success: true, ideas: ideasData });
  } catch (error) {
    console.error('Ideas Generation Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate Hashtags Route
app.post('/api/generate-hashtags', async (req, res) => {
  try {
    const { topic, platform } = req.body;

    const prompt = `Generate 20 trending hashtags for "${topic}" on ${platform}. Return as JSON: { hashtags: [array] }`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    const text = response.text;

    let hashtagData;
    try {
      hashtagData = JSON.parse(text);
    } catch {
      hashtagData = { hashtags: text.split('\n').filter(h => h.trim()) };
    }

    res.json({ success: true, hashtags: hashtagData });
  } catch (error) {
    console.error('Hashtag Generation Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`✅ CreatorHub Server running on http://localhost:${PORT}`);
  console.log(`📝 Endpoints:`);
  console.log(`   POST /api/generate-script`);
  console.log(`   POST /api/generate-ideas`);
  console.log(`   POST /api/generate-hashtags`);
});

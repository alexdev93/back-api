const express = require('express');
const path = require('path');
const {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
  getLatestNews
} = require('../service/news.service');
const newsRoutes = express.Router();
const upload = require('../config/upload')
const authenticateToken = require('../middleware/authMiddleware');

newsRoutes.post('/news', upload.single('file'), authenticateToken, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const userValue = req.body;
    userValue.imagePath = req.file.filename
    console.log(userValue)
    const news = await createNews(userValue);
    res.status(201).json(news);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).send('Server error');
  }
});

newsRoutes.get('/news/latest/:limit', async (req, res) => {
  const { limit } = req.params;
  try {
    const latestNews = await getLatestNews(limit);
    res.status(200).json({ latestNews });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).send('Server error');
  }
});

newsRoutes.get('/news', async (req, res) => {
  try {
    const newsList = await getAllNews();
    
    res.status(200).json(newsList);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).send('Server error');
  }
});

newsRoutes.get('/news/:id', async (req, res) => {
  try {
    const news = await getNewsById(req.params.id);
    res.status(200).json(news);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).send('Server error');
  }
});

newsRoutes.put('/news/:id', async (req, res) => {
  try {
    const updatedNews = await updateNews(req.params.id, req.body);
    res.status(200).json(updatedNews);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).send('Server error');
  }
});

newsRoutes.delete('/news/:id', async (req, res) => {
  try {
    const message = await deleteNews(req.params.id);
    res.status(200).json({ message });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).send('Server error');
  }
});

newsRoutes.get('/photos/:photoName', (req, res) => {
  const photoName = req.params.photoName;
  const filePath = path.join(__dirname, '..', 'newsImageDIR', photoName);

  res.sendFile(filePath);
});

module.exports = newsRoutes;

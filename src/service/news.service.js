const News = require('../models/News');

const createNews = async (newsData) => {
  try {
    const news = await News.create(newsData);
    return news;
  } catch (err) {
    throw new Error(`Could not create news: ${err.message}`);
  }
};

const getAllNews = async () => {
  try {
    const newsList = await News.findAll();
    return newsList;
  } catch (err) {
    throw new Error(`Could not retrieve news: ${err.message}`);
  }
};

const getNewsById = async (id) => {
  try {
    const news = await News.findByPk(id);
    if (!news) throw new Error('News not found');
    return news;
  } catch (err) {
    throw new Error(`Could not retrieve news: ${err.message}`);
  }
};

const updateNews = async (id, newsData) => {
  try {
    const news = await getNewsById(id);
    const updatedNews = await news.update(newsData);
    return updatedNews;
  } catch (err) {
    throw new Error(`Could not update news: ${err.message}`);
  }
};

const deleteNews = async (id) => {
  try {
    const news = await getNewsById(id);
    await news.destroy();
    return `News with id ${id} deleted successfully`;
  } catch (err) {
    throw new Error(`Could not delete news: ${err.message}`);
  }
};

const getLatestNews = async (limit) => {
  try {
    const latestNews = await News.findAll({
      limit: parseInt(limit), // Ensure limit is parsed as integer
      order: [['releaseDate', 'DESC']],
    });
    return latestNews;
  } catch (err) {
    throw new Error(`Could not fetch latest news: ${err.message}`);
  }
};

const deleteAllNews = async (res) => {
  try {
    await News.destroy({ where: {} });
    res.status(200).json({ message: 'All Newses deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
  getLatestNews,
  deleteAllNews,
};

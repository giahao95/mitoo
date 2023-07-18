const linkModel = require('../models/link.model');
const asyncHandler = require('express-async-handler');

const createShortUrl = asyncHandler(async (req, res) => {
  const { longUrl } = req.body;
  const urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

  if (!longUrl.match(urlRegex)) {
    res.status(400);
    throw new Error('Invalid Url');
  }

  const result = await linkModel.findOne({ longUrl });
  if (!result) {
    try {
      const newShortUrl = await linkModel.create({ longUrl });
      newShortUrl.shortUrl = `su${newShortUrl._id.toString().slice(-10)}`;
      newShortUrl.save();
      return res.status(200).json({ shortUrl: newShortUrl.shortUrl });
    } catch (error) {
      res.status(400);
      throw new Error('Create short Url error');
    }
  }

  return res.status(200).json({ shortUrl: result.shortUrl });
});

const getLongUrl = asyncHandler(async (req, res) => {
  const { shortUrl } = req.params;
  console.log(shortUrl);
  const result = await linkModel.findOne({ shortUrl });

  if (!result) {
    res.status(404);
    throw new Error('Page not found');
  }

  res.status(200).json({ longUrl: result.longUrl });
});

module.exports = { createShortUrl, getLongUrl };

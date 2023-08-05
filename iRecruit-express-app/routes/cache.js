import express from 'express';
import {get, set, del} from '../memcache.js'

const router = express.Router();


// GET route to fetch data from cache based on the provided key
router.get('/cache/:key', (req, res) => {
  const { key } = req.params;
  const cachedData = memcache.get(key);
  if (cachedData) {
    res.json(cachedData);
  } else {
    res.status(404).json({ error: 'Data not found in cache' });
  }
});

// POST route to set data in cache
router.post('/cache/:key', (req, res) => {
  const { key } = req.params;
  const { data, expiration } = req.body;
  // Optionally, pass the expiration timestamp in the request body

  memcache.set(key, data, expiration);

  res.json({ success: true });
});

// DELETE route to remove data from cache based on the provided key
router.delete('/cache/:key', (req, res) => {
  const { key } = req.params;
  memcache.del(key);

  res.json({ success: true });
});

export default router;
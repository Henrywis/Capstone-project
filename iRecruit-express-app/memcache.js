const cache = {};

function get(key) {
  return cache[key];
  // retrieves data from the cache based on the given key
}

function set(key, value, expiration = null) {
  // stores data in the cache with the specified key
  // If expiration is provided, set a time-to-live (TTL) for the data
  cache[key] = { value, expiration };
}

function del(key) {
  delete cache[key];
  // removes data from the cache associated with the given key
}

module.exports = { get, set, del };

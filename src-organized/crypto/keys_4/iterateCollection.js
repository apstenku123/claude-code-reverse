/**
 * Iterates over the elements or properties of a collection, invoking a callback for each item.
 *
 * @param {object|array|any} collection - The collection to iterate over. Can be an object, array, or single value.
 * @param {function} callback - The function to call for each item. Receives (value, keyOrIndex, collection).
 * @param {object} [options] - Optional settings.
 * @param {boolean} [options.allOwnKeys=false] - If true, includes non-enumerable properties (uses Object.getOwnPropertyNames).
 * @returns {void}
 */
function iterateCollection(collection, callback, { allOwnKeys = false } = {}) {
  // Return early if collection is null or undefined
  if (collection === null || typeof collection === "undefined") return;

  // If collection is not an object (e.g., primitive), treat isBlobOrFileLikeObject as a single-element array
  if (typeof collection !== "object") {
    collection = [collection];
  }

  // If collection is an array-like object (using Vx utility), iterate by index
  if (Vx(collection)) {
    for (let index = 0, length = collection.length; index < length; index++) {
      callback.call(null, collection[index], index, collection);
    }
  } else {
    // Otherwise, iterate over object keys
    // Use all own property names (including non-enumerable) if allOwnKeys is true
    const keys = allOwnKeys ? Object.getOwnPropertyNames(collection) : Object.keys(collection);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      callback.call(null, collection[key], key, collection);
    }
  }
}

module.exports = iterateCollection;
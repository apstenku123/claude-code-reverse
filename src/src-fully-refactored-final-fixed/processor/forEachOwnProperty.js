/**
 * Iterates over the elements of an array or the own properties of an object, executing a callback for each item/property.
 *
 * @param {Object|Array|any} target - The object or array (or single value) to iterate over.
 * @param {Function} callback - The function to execute for each element/property. Receives (value, keyOrIndex, target) as arguments.
 * @param {Object} [options={}] - Optional settings.
 * @param {boolean} [options.allOwnKeys=false] - If true, includes non-enumerable properties (uses Object.getOwnPropertyNames). Otherwise, only enumerable properties (uses Object.keys).
 * @returns {void}
 */
function forEachOwnProperty(target, callback, { allOwnKeys = false } = {}) {
  // Return early if target is null or undefined
  if (target === null || typeof target === "undefined") return;

  // If target is not an object, treat isBlobOrFileLikeObject as a single-element array
  if (typeof target !== "object") {
    target = [target];
  }

  // If target is an array-like object (Vx checks for array)
  if (Vx(target)) {
    // Iterate over array elements
    for (let index = 0, length = target.length; index < length; index++) {
      callback.call(null, target[index], index, target);
    }
  } else {
    // Get property names: all own keys or only enumerable keys
    const propertyNames = allOwnKeys ? Object.getOwnPropertyNames(target) : Object.keys(target);
    const propertyCount = propertyNames.length;
    for (let i = 0; i < propertyCount; i++) {
      const propertyName = propertyNames[i];
      callback.call(null, target[propertyName], propertyName, target);
    }
  }
}

module.exports = forEachOwnProperty;
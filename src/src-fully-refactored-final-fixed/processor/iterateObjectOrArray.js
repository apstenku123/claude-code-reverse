/**
 * Iterates over the elements of an array or the properties of an object, invoking a callback for each item.
 * Optionally includes non-enumerable own properties if specified.
 *
 * @param {Object|Array|any} target - The object or array (or single value) to iterate over.
 * @param {Function} callback - The function to invoke for each element/property. Receives (value, keyOrIndex, target) as arguments.
 * @param {Object} [options] - Optional settings.
 * @param {boolean} [options.allOwnKeys=false] - If true, includes non-enumerable own properties (uses Object.getOwnPropertyNames).
 * @returns {void}
 */
function iterateObjectOrArray(target, callback, { allOwnKeys = false } = {}) {
  // Return early if target is null or undefined
  if (target === null || typeof target === "undefined") return;

  // If target is not an object (primitive), wrap isBlobOrFileLikeObject in an array
  let iterableTarget = target;
  if (typeof iterableTarget !== "object") {
    iterableTarget = [iterableTarget];
  }

  // If iterableTarget is an array-like structure, iterate by index
  if (Vx(iterableTarget)) {
    for (let index = 0, length = iterableTarget.length; index < length; index++) {
      callback.call(null, iterableTarget[index], index, iterableTarget);
    }
  } else {
    // Otherwise, iterate over object keys
    const propertyKeys = allOwnKeys
      ? Object.getOwnPropertyNames(iterableTarget)
      : Object.keys(iterableTarget);
    const propertyCount = propertyKeys.length;
    for (let i = 0; i < propertyCount; i++) {
      const key = propertyKeys[i];
      callback.call(null, iterableTarget[key], key, iterableTarget);
    }
  }
}

module.exports = iterateObjectOrArray;
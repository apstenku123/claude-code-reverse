/**
 * Checks if the provided array contains at least one source object
 * with type 'connected' and name 'ide'.
 *
 * @param {Array<Object>} sources - An array of source objects to check. Each object should have 'type' and 'name' properties.
 * @returns {boolean} Returns true if at least one source is connected and named 'ide', otherwise false.
 */
function hasConnectedIdeSource(sources) {
  // Use Array.prototype.some to check if any source matches the criteria
  return sources.some(
    (source) => source.type === "connected" && source.name === "ide"
  );
}

module.exports = hasConnectedIdeSource;
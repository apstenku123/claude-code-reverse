/**
 * Closes the provided resource by invoking its close method.
 *
 * @param {Object} resource - An object that exposes a close() method.
 * @returns {*} The result of resource.close().
 */
const closeResource = (resource) => {
  // Call the close method on the resource and return its result
  return resource.close();
};

module.exports = closeResource;
/**
 * Marks the provided module object as an ES module and applies a transformation.
 *
 * This function creates a new object with the `__esModule` property set to true,
 * merges isBlobOrFileLikeObject with the provided module object, and then passes the result to the
 * `transformModule` function (originally `copyMissingPropertiesExcludingKey`).
 *
 * @param {object} moduleObject - The module object to mark as an ES module and transform.
 * @returns {any} The result of the transformation applied by `transformModule`.
 */
const markAsEsModuleAndTransform = (moduleObject) => {
  // Create a new object with __esModule: true and merge with the provided module object
  const esModuleObject = aB1({}, "__esModule", { value: true });
  // Pass the merged object and the original module object to the transform function
  return copyMissingPropertiesExcludingKey(esModuleObject, moduleObject);
};

module.exports = markAsEsModuleAndTransform;

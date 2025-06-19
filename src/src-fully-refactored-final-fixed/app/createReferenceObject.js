/**
 * Generates a reference object based on the provided reference strategy.
 * Handles root, relative, none, and seen reference strategies for serialization or schema generation.
 *
 * @param {Object} sourceObservable - The source object containing the path array.
 * @param {Object} config - Configuration object specifying the reference strategy and current path.
 * @param {string} config.$refStrategy - The reference strategy to use ("root", "relative", "none", or "seen").
 * @param {Array<string>} sourceObservable.path - The path segments for the source object.
 * @param {Array<string>} config.currentPath - The current path segments in the traversal.
 * @returns {Object|undefined} The reference object, an empty object for recursive/seens, or undefined for 'none'.
 */
function createReferenceObject(sourceObservable, config) {
  switch (config.$refStrategy) {
    case "root":
      // Return a reference object using the root path
      return {
        $ref: sourceObservable.path.join("/")
      };
    case "relative":
      // Return a reference object using a relative path calculation
      return {
        $ref: getPathDifference(config.currentPath, sourceObservable.path)
      };
    case "none":
    case "seen": {
      // Detect recursive references: if the source path is a prefix of the current path
      const isRecursive =
        sourceObservable.path.length < config.currentPath.length &&
        sourceObservable.path.every(
          (subscription, index) => config.currentPath[index] === subscription
        );
      if (isRecursive) {
        console.warn(
          `Recursive reference detected at ${config.currentPath.join("/")}! Defaulting to any`
        );
        return {};
      }
      // For 'seen', always return an empty object; for 'none', return undefined
      return config.$refStrategy === "seen" ? {} : undefined;
    }
    default:
      // If the strategy is unrecognized, return undefined
      return undefined;
  }
}

module.exports = createReferenceObject;

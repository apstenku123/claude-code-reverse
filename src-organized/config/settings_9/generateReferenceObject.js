/**
 * Generates a reference object based on the provided reference strategy.
 * Handles root, relative, and none/seen strategies for referencing paths.
 * Warns and defaults to an empty object if a recursive reference is detected.
 *
 * @param {Object} sourceObservable - The source object containing the path array.
 * @param {Object} config - Configuration object containing $refStrategy and currentPath.
 * @param {string} config.$refStrategy - The reference strategy to use ("root", "relative", "none", or "seen").
 * @param {Array<string>} sourceObservable.path - The path segments for the source object.
 * @param {Array<string>} config.currentPath - The current path segments being processed.
 * @returns {Object|undefined} Reference object, empty object, or undefined based on strategy and recursion detection.
 */
function generateReferenceObject(sourceObservable, config) {
  switch (config.$refStrategy) {
    case "root":
      // Return a reference object with the root path joined by '/'
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
      // Check for recursive reference: if source path is a prefix of current path
      const isRecursiveReference =
        sourceObservable.path.length < config.currentPath.length &&
        sourceObservable.path.every(
          (subscription, index) => config.currentPath[index] === subscription
        );
      if (isRecursiveReference) {
        // Warn and default to any (empty object)
        console.warn(
          `Recursive reference detected at ${config.currentPath.join("/")}! Defaulting to any`
        );
        return {};
      }
      // For 'seen', return empty object; for 'none', return undefined
      return config.$refStrategy === "seen" ? {} : undefined;
    }
    default:
      // If an unknown strategy is provided, return undefined
      return undefined;
  }
}

module.exports = generateReferenceObject;

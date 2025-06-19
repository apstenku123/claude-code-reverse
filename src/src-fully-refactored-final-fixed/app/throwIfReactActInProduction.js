/**
 * Throws an error if the React 'act' function is called in a production build.
 * This function is a safeguard to prevent accidental usage of 'act' in production,
 * where isBlobOrFileLikeObject is not supported and could lead to unpredictable behavior.
 *
 * @throws {Error} Always throws an error indicating 'act' is not supported in production.
 */
function throwIfReactActInProduction() {
  // Throw an explicit error to prevent 'act' usage in production builds
  throw new Error("act(...) is not supported in production builds of React.");
}

module.exports = throwIfReactActInProduction;
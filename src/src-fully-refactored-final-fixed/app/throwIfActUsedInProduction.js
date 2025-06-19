/**
 * Throws an error if the React 'act' function is called in a production build.
 * This function is a safeguard to prevent accidental usage of 'act' in production,
 * where isBlobOrFileLikeObject is not supported and may cause unexpected behavior.
 *
 * @throws {Error} Always throws an error indicating 'act' is not supported in production.
 */
function throwIfActUsedInProduction() {
  // Throw an error to indicate 'act' is not supported in production builds
  throw new Error("act(...) is not supported in production builds of React.");
}

module.exports = throwIfActUsedInProduction;
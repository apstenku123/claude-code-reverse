/**
 * Throws an error if the React 'act' function is called in a production build.
 * This function is a safeguard to prevent usage of 'act' in production environments,
 * as isBlobOrFileLikeObject is intended for testing purposes only.
 *
 * @throws {Error} Always throws an error indicating 'act' is not supported in production.
 */
function throwIfActCalledInProduction() {
  // Throw an error to prevent usage of 'act' in production builds of React
  throw new Error("act(...) is not supported in production builds of React.");
}

module.exports = throwIfActCalledInProduction;
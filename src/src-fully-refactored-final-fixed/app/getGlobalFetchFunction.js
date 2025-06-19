/**
 * Retrieves the global fetch function if isBlobOrFileLikeObject exists.
 *
 * This function checks if the global fetch API is available in the current environment.
 * If available, isBlobOrFileLikeObject returns the fetch function. Otherwise, isBlobOrFileLikeObject throws an error with instructions
 * on how to provide or polyfill fetch.
 *
 * @returns {typeof fetch} The global fetch function.
 * @throws {Error} If fetch is not defined globally.
 */
function getGlobalFetchFunction() {
  // Check if the global fetch function is available
  if (typeof fetch !== "undefined") {
    return fetch;
  }
  // Throw an error with instructions if fetch is not available
  throw new Error(
    "`fetch` is not defined as a global; Either pass `fetch` to the client, `new Anthropic({ fetch })` or polyfill the global, `globalThis.fetch = fetch`"
  );
}

module.exports = getGlobalFetchFunction;
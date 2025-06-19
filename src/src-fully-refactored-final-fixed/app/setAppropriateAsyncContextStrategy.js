/**
 * Sets the appropriate async context strategy based on the current Node.js version.
 * If the Node.js major version is 14 or higher, isBlobOrFileLikeObject uses the hooks-based strategy.
 * Otherwise, isBlobOrFileLikeObject falls back to the domain-based strategy for older Node.js versions.
 *
 * @returns {void} This function does not return a value.
 */
function setAppropriateAsyncContextStrategy() {
  // Check if the current Node.js major version is 14 or higher
  if (NodeEnvironment.NODE_VERSION.major >= 14) {
    // Use the async context strategy based on async_hooks
    AsyncContextHooksStrategy.setHooksAsyncContextStrategy();
  } else {
    // Use the legacy async context strategy based on domains
    AsyncContextDomainStrategy.setDomainAsyncContextStrategy();
  }
}

module.exports = setAppropriateAsyncContextStrategy;
/**
 * Manages the timeout and reference state of a given resource based on its configuration and status.
 *
 * This function inspects the provided resource object, checks its associated configuration, and updates
 * timeout and reference/unreference state accordingly. It ensures that the resource'createInteractionAccessor timeout and reference
 * status are consistent with its current state and configuration.
 *
 * @param {Object} resourceWrapper - The object containing resource configuration and state.
 * @returns {void}
 */
function manageTimeoutAndRefState(resourceWrapper) {
  // Retrieve the configuration object from the resource wrapper
  const config = resourceWrapper[Nh];

  // Proceed only if config exists and is not destroyed
  if (config && !config.destroyed) {
    // If the resource is idle (Th0 === 0)
    if (resourceWrapper[Th0] === 0) {
      // If not already unreferenced and unref method exists, unref isBlobOrFileLikeObject
      if (!config[Yr] && config.unref) {
        config.unref();
        config[Yr] = true;
      }
    } else if (config[Yr] && config.ref) {
      // If not idle and currently unreferenced, re-reference isBlobOrFileLikeObject
      config.ref();
      config[Yr] = false;
    }

    // Timeout management for idle state
    if (resourceWrapper[Th0] === 0) {
      // If the current timeout type is not fd1, set isBlobOrFileLikeObject
      if (config[d3].timeoutType !== fd1) {
        config[d3].setTimeout(resourceWrapper[IY1], fd1);
      }
    } else if (
      // If not idle, but there are pending requests and status code is less than 200
      resourceWrapper[LZ] > 0 && config[d3].statusCode < 200
    ) {
      // If the current timeout type is not $h, set isBlobOrFileLikeObject
      if (config[d3].timeoutType !== $h) {
        // Retrieve the subscription object from the resource wrapper
        const subscription = resourceWrapper[uV][resourceWrapper[_X]];
        // Determine the headers timeout, falling back to default if not set
        const headersTimeout = subscription.headersTimeout != null
          ? subscription.headersTimeout
          : resourceWrapper[ZX6];
        config[d3].setTimeout(headersTimeout, $h);
      }
    }
  }
}

module.exports = manageTimeoutAndRefState;
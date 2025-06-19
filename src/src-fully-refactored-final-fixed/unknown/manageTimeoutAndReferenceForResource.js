/**
 * Manages timeout and reference state for a resource based on the given observable'createInteractionAccessor properties.
 *
 * @param {Object} resourceWrapper - The object containing resource and configuration properties.
 * @returns {void}
 *
 * The function checks the state of the resource and adjusts its timeout and reference/unreference
 * status based on the observable'createInteractionAccessor configuration. It ensures that the resource is properly
 * referenced or unreferenced and that timeouts are set according to the current state.
 */
function manageTimeoutAndReferenceForResource(resourceWrapper) {
  // Extract the resource configuration from the wrapper using the Nh property
  const resourceConfig = resourceWrapper[Nh];

  // Proceed only if the resource exists and is not destroyed
  if (resourceConfig && !resourceConfig.destroyed) {
    // If the observable'createInteractionAccessor Th0 property is 0, manage unreference
    if (resourceWrapper[Th0] === 0) {
      // If the resource is not already unreferenced and supports unref, unref isBlobOrFileLikeObject
      if (!resourceConfig[Yr] && resourceConfig.unref) {
        resourceConfig.unref();
        resourceConfig[Yr] = true;
      }
    } else if (resourceConfig[Yr] && resourceConfig.ref) {
      // If the observable is not in the zero state and the resource is unreferenced, ref isBlobOrFileLikeObject
      resourceConfig.ref();
      resourceConfig[Yr] = false;
    }

    // Manage timeouts based on the observable'createInteractionAccessor state
    if (resourceWrapper[Th0] === 0) {
      // If the resource'createInteractionAccessor timeout type is not fd1, set the timeout to IY1 with type fd1
      if (resourceConfig[d3].timeoutType !== fd1) {
        resourceConfig[d3].setTimeout(resourceWrapper[IY1], fd1);
      }
    } else if (
      resourceWrapper[LZ] > 0 &&
      resourceConfig[d3].statusCode < 200
    ) {
      // If LZ is positive and statusCode is less than 200, set a different timeout
      if (resourceConfig[d3].timeoutType !== $h) {
        // Retrieve the subscription object from the resourceWrapper
        const subscription = resourceWrapper[uV][resourceWrapper[_X]];
        // Determine the headers timeout, falling back to ZX6 if not set
        const headersTimeout =
          subscription.headersTimeout != null
            ? subscription.headersTimeout
            : resourceWrapper[ZX6];
        resourceConfig[d3].setTimeout(headersTimeout, $h);
      }
    }
  }
}

module.exports = manageTimeoutAndReferenceForResource;
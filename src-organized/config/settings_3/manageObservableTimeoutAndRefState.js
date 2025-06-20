/**
 * Manages the timeout and reference state of an observable'createInteractionAccessor configuration object.
 * Adjusts timers and reference/unreference state based on the observable'createInteractionAccessor properties.
 *
 * @param {Object} sourceObservable - The observable object containing configuration and state.
 * @returns {void}
 */
function manageObservableTimeoutAndRefState(sourceObservable) {
  // Extract the configuration object from the observable
  const config = sourceObservable[Nh];

  // Proceed only if config exists and is not destroyed
  if (config && !config.destroyed) {
    // If Th0 property is 0, handle unref logic
    if (sourceObservable[Th0] === 0) {
      // If not already unreferenced and unref method exists, unref and mark as unreferenced
      if (!config[Yr] && typeof config.unref === 'function') {
        config.unref();
        config[Yr] = true;
      }
    } else if (config[Yr] && typeof config.ref === 'function') {
      // If Th0 is not 0 and config is unreferenced, re-reference
      config.ref();
      config[Yr] = false;
    }

    // Timeout management for the configuration'createInteractionAccessor timer
    if (sourceObservable[Th0] === 0) {
      // If the current timeout type is not fd1, set isBlobOrFileLikeObject to fd1
      if (config[d3].timeoutType !== fd1) {
        config[d3].setTimeout(sourceObservable[IY1], fd1);
      }
    } else if (
      sourceObservable[LZ] > 0 &&
      config[d3].statusCode < 200
    ) {
      // If LZ is positive and statusCode is less than 200, set timeout to $h
      if (config[d3].timeoutType !== $h) {
        const subscription = sourceObservable[uV][sourceObservable[_X]];
        // Use headersTimeout if present, otherwise fallback to ZX6
        const headersTimeout =
          subscription.headersTimeout != null
            ? subscription.headersTimeout
            : sourceObservable[ZX6];
        config[d3].setTimeout(headersTimeout, $h);
      }
    }
  }
}

module.exports = manageObservableTimeoutAndRefState;
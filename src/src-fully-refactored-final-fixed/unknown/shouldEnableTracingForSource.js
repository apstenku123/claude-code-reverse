/**
 * Determines whether tracing should be enabled for a given source observable and configuration.
 *
 * If the source observable is undefined, tracing is disabled.
 * If the source observable has the 'enableIfHasTracingEnabled' flag set to true,
 * tracing is enabled only if the configuration has tracing enabled (via FZ.hasTracingEnabled).
 * Otherwise, tracing is always enabled.
 *
 * @param {Object|undefined} sourceObservable - The observable or source object to check for tracing eligibility.
 * @param {Object} config - The configuration object, passed to FZ.hasTracingEnabled if needed.
 * @returns {boolean} True if tracing should be enabled, false otherwise.
 */
function shouldEnableTracingForSource(sourceObservable, config) {
  // If the source is undefined, tracing is disabled
  if (typeof sourceObservable === 'undefined') {
    return false;
  }

  // If the source has the 'enableIfHasTracingEnabled' flag, defer to FZ.hasTracingEnabled
  if (sourceObservable.enableIfHasTracingEnabled) {
    return FZ.hasTracingEnabled(config);
  }

  // Otherwise, tracing is enabled by default
  return true;
}

module.exports = shouldEnableTracingForSource;
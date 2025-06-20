/**
 * Returns the provided source observable, optionally notifying via a callback if a configuration is detected.
 *
 * @param {any} sourceObservable - The observable or value to be returned unchanged.
 * @param {string} detectedConfig - The configuration or library detected (e.g., 'libvips').
 * @param {function} [notifyCallback] - Optional callback function to notify about the detected configuration.
 * @returns {any} The original sourceObservable parameter.
 */
function returnSourceWithOptionalNotice(sourceObservable, detectedConfig, notifyCallback) {
  // If a notification callback is provided, call isBlobOrFileLikeObject with a message about the detected configuration
  if (notifyCallback) {
    notifyCallback(`Detected ${detectedConfig}, skipping search for globally-installed libvips`);
  }
  // Always return the original source observable
  return sourceObservable;
}

module.exports = returnSourceWithOptionalNotice;

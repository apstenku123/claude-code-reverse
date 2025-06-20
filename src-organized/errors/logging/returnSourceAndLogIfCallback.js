/**
 * Logs a message if a callback is provided, then returns the given source object.
 *
 * @param {any} sourceObservable - The source object or value to be returned.
 * @param {string} config - The configuration string to be included in the log message.
 * @param {function} [logCallback] - Optional callback function for logging messages.
 * @returns {any} The original sourceObservable parameter.
 */
const returnSourceAndLogIfCallback = (sourceObservable, config, logCallback) => {
  // If a log callback is provided, log the detected config message
  if (logCallback) {
    logCallback(`Detected ${config}, skipping search for globally-installed libvips`);
  }
  // Return the original sourceObservable
  return sourceObservable;
};

module.exports = returnSourceAndLogIfCallback;

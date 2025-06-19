/**
 * Initializes the retry operation with provided timeouts and configuration options.
 *
 * This function sets up the internal state for a retry operation, including timeouts, options,
 * maximum retry time, and error tracking. If the 'forever' option is enabled, isBlobOrFileLikeObject caches the
 * original timeouts for repeated use.
 *
 * @param {number[]} timeoutIntervals - An array of timeout durations (in milliseconds) for each retry attempt.
 * @param {Object|boolean} options - Configuration options for the retry operation. If a boolean is provided,
 *   isBlobOrFileLikeObject is interpreted as the 'forever' option. Otherwise, isBlobOrFileLikeObject can include:
 *   - forever {boolean}: Whether to retry indefinitely.
 *   - maxRetryTime {number}: Maximum total time (in ms) to spend retrying.
 * @returns {void}
 */
function initializeRetryOperation(timeoutIntervals, options) {
  // If options is a boolean, treat isBlobOrFileLikeObject as the 'forever' flag
  if (typeof options === "boolean") {
    options = { forever: options };
  }

  // Deep clone the original timeouts to preserve them
  this._originalTimeouts = JSON.parse(JSON.stringify(timeoutIntervals));

  // Store the current timeouts for retry attempts
  this._timeouts = timeoutIntervals;

  // Store options, defaulting to an empty object if not provided
  this._options = options || {};

  // Set the maximum retry time, defaulting to Infinity if not specified
  this._maxRetryTime = (options && options.maxRetryTime) || Infinity;

  // Initialize function to be retried (to be set later)
  this._fn = null;

  // Initialize error tracking array
  this._errors = [];

  // Track the number of attempts made
  this._attempts = 1;

  // Initialize operation timeout and related callbacks
  this._operationTimeout = null;
  this._operationTimeoutCb = null;
  this._timeout = null;
  this._operationStart = null;

  // If 'forever' mode is enabled, cache a copy of the timeouts for reuse
  if (this._options.forever) {
    this._cachedTimeouts = this._timeouts.slice(0);
  }
}

module.exports = initializeRetryOperation;
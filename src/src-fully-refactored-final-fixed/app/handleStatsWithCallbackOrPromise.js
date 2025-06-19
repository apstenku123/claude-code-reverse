/**
 * Handles statistics retrieval, supporting both callback and Promise-based usage.
 *
 * If a callback is provided, isBlobOrFileLikeObject will be called with (error, stats) once the operation completes.
 * If no callback is provided, returns a Promise that resolves with the stats or rejects with an error.
 *
 * If the input is a stream, waits for the 'finish' event before retrieving stats.
 *
 * @param {Function} [callback] - Optional. Node-style callback function (error, stats).
 * @returns {this|Promise<any>} Returns 'this' if a callback is provided, otherwise a Promise.
 */
function handleStatsWithCallbackOrPromise(callback) {
  const capturedStackError = Error(); // Capture stack for error context

  // If a callback function is provided
  if (lA.fn(callback)) {
    // If input is a stream, wait for 'finish' event before retrieving stats
    if (this._isStreamInput()) {
      this.on("finish", () => {
        this._flattenBufferIn();
        wO.stats(this.options, (error, stats) => {
          if (error) {
            // Wrap error with captured stack and pass to callback
            callback(lA.nativeError(error, capturedStackError));
          } else {
            callback(null, stats);
          }
        });
      });
    } else {
      // Not a stream: retrieve stats immediately
      wO.stats(this.options, (error, stats) => {
        if (error) {
          callback(lA.nativeError(error, capturedStackError));
        } else {
          callback(null, stats);
        }
      });
    }
    // For callback usage, return 'this' for chaining
    return this;
  }

  // No callback: return a Promise
  if (this._isStreamInput()) {
    // For streams, resolve/reject after 'finish' event
    return new Promise((resolve, reject) => {
      this.on("finish", function () {
        this._flattenBufferIn();
        wO.stats(this.options, (error, stats) => {
          if (error) {
            reject(lA.nativeError(error, capturedStackError));
          } else {
            resolve(stats);
          }
        });
      });
    });
  } else {
    // Not a stream: resolve/reject immediately
    return new Promise((resolve, reject) => {
      wO.stats(this.options, (error, stats) => {
        if (error) {
          reject(lA.nativeError(error, capturedStackError));
        } else {
          resolve(stats);
        }
      });
    });
  }
}

module.exports = handleStatsWithCallbackOrPromise;
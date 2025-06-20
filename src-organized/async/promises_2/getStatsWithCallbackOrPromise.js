/**
 * Retrieves statistics for the current options, supporting both callback and Promise-based usage.
 *
 * If a callback is provided, the function will use isBlobOrFileLikeObject(Node.js-style: err, result). If not, isBlobOrFileLikeObject returns a Promise.
 * Handles both stream and non-stream input cases, ensuring that stats are only retrieved after the stream finishes if applicable.
 *
 * @param {Function} [callback] - Optional. Node.js-style callback function (err, stats). If not provided, a Promise is returned.
 * @returns {this|Promise<Object>} Returns 'this' if a callback is provided, otherwise a Promise resolving to the stats object.
 */
function getStatsWithCallbackOrPromise(callback) {
  const capturedStack = Error();

  // If a callback function is provided
  if (lA.fn(callback)) {
    // If input is a stream, wait for 'finish' event before getting stats
    if (this._isStreamInput()) {
      this.on("finish", () => {
        this._flattenBufferIn();
        wO.stats(this.options, (error, stats) => {
          if (error) {
            callback(lA.nativeError(error, capturedStack));
          } else {
            callback(null, stats);
          }
        });
      });
    } else {
      // Non-stream input: get stats immediately
      wO.stats(this.options, (error, stats) => {
        if (error) {
          callback(lA.nativeError(error, capturedStack));
        } else {
          callback(null, stats);
        }
      });
    }
    return this;
  }

  // If no callback, return a Promise
  if (this._isStreamInput()) {
    // Stream input: wait for 'finish' event before resolving
    return new Promise((resolve, reject) => {
      this.on("finish", function () {
        this._flattenBufferIn();
        wO.stats(this.options, (error, stats) => {
          if (error) {
            reject(lA.nativeError(error, capturedStack));
          } else {
            resolve(stats);
          }
        });
      });
    });
  } else {
    // Non-stream input: resolve immediately
    return new Promise((resolve, reject) => {
      wO.stats(this.options, (error, stats) => {
        if (error) {
          reject(lA.nativeError(error, capturedStack));
        } else {
          resolve(stats);
        }
      });
    });
  }
}

module.exports = getStatsWithCallbackOrPromise;
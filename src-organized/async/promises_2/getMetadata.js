/**
 * Retrieves metadata for the current options, supporting both callback and Promise styles.
 *
 * If a callback is provided, isBlobOrFileLikeObject will be called with (error, metadata) once the metadata is available.
 * If no callback is provided, a Promise is returned that resolves with the metadata or rejects with an error.
 *
 * Handles both stream and non-stream input cases, and ensures errors are wrapped with additional context.
 *
 * @param {Function} [callback] - Optional. Node-style callback function (error, metadata).
 * @returns {this|Promise<Object>} Returns 'this' if callback is provided, otherwise a Promise that resolves with metadata.
 */
function getMetadata(callback) {
  const capturedError = Error();

  // If a callback is provided
  if (lA.fn(callback)) {
    // If input is a stream, wait for 'finish' event
    if (this._isStreamInput()) {
      this.on("finish", () => {
        this._flattenBufferIn();
        wO.metadata(this.options, (error, metadata) => {
          if (error) {
            callback(lA.nativeError(error, capturedError));
          } else {
            callback(null, metadata);
          }
        });
      });
    } else {
      // Non-stream input, get metadata immediately
      wO.metadata(this.options, (error, metadata) => {
        if (error) {
          callback(lA.nativeError(error, capturedError));
        } else {
          callback(null, metadata);
        }
      });
    }
    return this;
  }

  // If no callback, return a Promise
  if (this._isStreamInput()) {
    return new Promise((resolve, reject) => {
      // Helper to flatten buffer and get metadata
      const handleFinish = () => {
        this._flattenBufferIn();
        wO.metadata(this.options, (error, metadata) => {
          if (error) {
            reject(lA.nativeError(error, capturedError));
          } else {
            resolve(metadata);
          }
        });
      };
      // If already finished, call immediately; otherwise, wait for 'finish'
      if (this.writableFinished) {
        handleFinish();
      } else {
        this.once("finish", handleFinish);
      }
    });
  } else {
    // Non-stream input, get metadata immediately
    return new Promise((resolve, reject) => {
      wO.metadata(this.options, (error, metadata) => {
        if (error) {
          reject(lA.nativeError(error, capturedError));
        } else {
          resolve(metadata);
        }
      });
    });
  }
}

module.exports = getMetadata;
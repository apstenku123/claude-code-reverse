/**
 * Retrieves metadata for the current options, supporting both callback and Promise-based usage.
 * Handles both stream and non-stream input scenarios, and ensures errors are wrapped with native error context.
 *
 * @param {Function} [callback] - Optional callback function to receive the metadata or error. If not provided, returns a Promise.
 * @returns {this|Promise<Object>} Returns 'this' if a callback is provided, otherwise a Promise that resolves with the metadata object.
 */
function getMetadataWithStreamSupport(callback) {
  const capturedStack = Error();

  // If a callback is provided
  if (lA.fn(callback)) {
    // If input is a stream, wait for 'finish' event
    if (this._isStreamInput()) {
      this.on("finish", () => {
        this._flattenBufferIn();
        wO.metadata(this.options, (error, metadata) => {
          if (error) {
            callback(lA.nativeError(error, capturedStack));
          } else {
            callback(null, metadata);
          }
        });
      });
    } else {
      // Non-stream input, fetch metadata immediately
      wO.metadata(this.options, (error, metadata) => {
        if (error) {
          callback(lA.nativeError(error, capturedStack));
        } else {
          callback(null, metadata);
        }
      });
    }
    return this;
  }

  // If no callback, return a Promise
  if (this._isStreamInput()) {
    // For stream input, resolve after 'finish' event
    return new Promise((resolve, reject) => {
      const handleFinish = () => {
        this._flattenBufferIn();
        wO.metadata(this.options, (error, metadata) => {
          if (error) {
            reject(lA.nativeError(error, capturedStack));
          } else {
            resolve(metadata);
          }
        });
      };
      if (this.writableFinished) {
        handleFinish();
      } else {
        this.once("finish", handleFinish);
      }
    });
  } else {
    // Non-stream input, resolve immediately
    return new Promise((resolve, reject) => {
      wO.metadata(this.options, (error, metadata) => {
        if (error) {
          reject(lA.nativeError(error, capturedStack));
        } else {
          resolve(metadata);
        }
      });
    });
  }
}

module.exports = getMetadataWithStreamSupport;
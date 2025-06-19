/**
 * Processes input data either via callback, stream, or Promise, handling pipeline execution and error propagation.
 *
 * @function handleStreamOrCallbackProcessing
 * @param {Function|undefined} callback - Callback function to handle results or errors, or undefined if using Promises.
 * @param {Object} errorContext - Additional context to include in error reporting.
 * @returns {this|Promise<any>} Returns the current instance for chaining if using callbacks/streams, or a Promise if not.
 */
function handleStreamOrCallbackProcessing(callback, errorContext) {
  // If a callback function is provided, use callback-based processing
  if (typeof callback === "function") {
    // If input is a stream, wait for 'finish' event before processing pipeline
    if (this._isStreamInput()) {
      this.on("finish", () => {
        this._flattenBufferIn();
        pd.pipeline(this.options, (pipelineError, pipelineResult, pipelineInfo) => {
          if (pipelineError) {
            callback(x1.nativeError(pipelineError, errorContext));
          } else {
            callback(null, pipelineResult, pipelineInfo);
          }
        });
      });
    } else {
      // If not a stream, process pipeline immediately
      pd.pipeline(this.options, (pipelineError, pipelineResult, pipelineInfo) => {
        if (pipelineError) {
          callback(x1.nativeError(pipelineError, errorContext));
        } else {
          callback(null, pipelineResult, pipelineInfo);
        }
      });
    }
    return this;
  }

  // If output is expected as a stream
  if (this.options.streamOut) {
    if (this._isStreamInput()) {
      // For stream input, process after 'finish' event
      this.once("finish", () => {
        this._flattenBufferIn();
        pd.pipeline(this.options, (pipelineError, pipelineResult, pipelineInfo) => {
          if (pipelineError) {
            this.emit("error", x1.nativeError(pipelineError, errorContext));
          } else {
            this.emit("info", pipelineInfo);
            this.push(pipelineResult);
          }
          this.push(null);
          this.on("end", () => this.emit("close"));
        });
      });
      // If stream input has already finished, emit 'finish' event
      if (this.streamInFinished) {
        this.emit("finish");
      }
    } else {
      // For non-stream input, process pipeline immediately
      pd.pipeline(this.options, (pipelineError, pipelineResult, pipelineInfo) => {
        if (pipelineError) {
          this.emit("error", x1.nativeError(pipelineError, errorContext));
        } else {
          this.emit("info", pipelineInfo);
          this.push(pipelineResult);
        }
        this.push(null);
        this.on("end", () => this.emit("close"));
      });
    }
    return this;
  }

  // If no callback and not streaming out, return a Promise
  if (this._isStreamInput()) {
    return new Promise((resolve, reject) => {
      this.once("finish", () => {
        this._flattenBufferIn();
        pd.pipeline(this.options, (pipelineError, pipelineResult, pipelineInfo) => {
          if (pipelineError) {
            reject(x1.nativeError(pipelineError, errorContext));
          } else if (this.options.resolveWithObject) {
            resolve({
              data: pipelineResult,
              info: pipelineInfo
            });
          } else {
            resolve(pipelineResult);
          }
        });
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      pd.pipeline(this.options, (pipelineError, pipelineResult, pipelineInfo) => {
        if (pipelineError) {
          reject(x1.nativeError(pipelineError, errorContext));
        } else if (this.options.resolveWithObject) {
          resolve({
            data: pipelineResult,
            info: pipelineInfo
          });
        } else {
          resolve(pipelineResult);
        }
      });
    });
  }
}

module.exports = handleStreamOrCallbackProcessing;
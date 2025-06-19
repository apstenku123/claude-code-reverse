/**
 * Processes input either as a callback or as a stream, handling pipeline execution and output.
 *
 * Depending on the input and configuration, this function:
 *   - Executes a pipeline and calls a callback with the result
 *   - Emits events and pushes data for stream outputs
 *   - Returns a Promise that resolves or rejects based on pipeline results
 *
 * @param {Function|any} callbackOrOptions - If a function, isBlobOrFileLikeObject is called with the result or error. Otherwise, triggers Promise or stream output.
 * @param {any} errorContext - Additional context to pass to error handlers.
 * @returns {this|Promise<any>} Returns the current instance for chaining, or a Promise if no callback is provided.
 */
function processStreamOrCallback(callbackOrOptions, errorContext) {
  // If the first argument is a callback function
  if (typeof callbackOrOptions === "function") {
    // If input is a stream, wait for 'finish' before processing
    if (this._isStreamInput()) {
      this.on("finish", () => {
        this._flattenBufferIn();
        pd.pipeline(this.options, (pipelineError, pipelineData, pipelineInfo) => {
          if (pipelineError) {
            callbackOrOptions(x1.nativeError(pipelineError, errorContext));
          } else {
            callbackOrOptions(null, pipelineData, pipelineInfo);
          }
        });
      });
    } else {
      // If not a stream, process immediately
      pd.pipeline(this.options, (pipelineError, pipelineData, pipelineInfo) => {
        if (pipelineError) {
          callbackOrOptions(x1.nativeError(pipelineError, errorContext));
        } else {
          callbackOrOptions(null, pipelineData, pipelineInfo);
        }
      });
    }
    return this;
  }
  // If output should be streamed
  else if (this.options.streamOut) {
    if (this._isStreamInput()) {
      // Wait for 'finish' event before processing
      this.once("finish", () => {
        this._flattenBufferIn();
        pd.pipeline(this.options, (pipelineError, pipelineData, pipelineInfo) => {
          if (pipelineError) {
            this.emit("error", x1.nativeError(pipelineError, errorContext));
          } else {
            this.emit("info", pipelineInfo);
            this.push(pipelineData);
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
      // Not a stream input, process immediately
      pd.pipeline(this.options, (pipelineError, pipelineData, pipelineInfo) => {
        if (pipelineError) {
          this.emit("error", x1.nativeError(pipelineError, errorContext));
        } else {
          this.emit("info", pipelineInfo);
          this.push(pipelineData);
        }
        this.push(null);
        this.on("end", () => this.emit("close"));
      });
    }
    return this;
  }
  // If input is a stream and no callback, return a Promise
  else if (this._isStreamInput()) {
    return new Promise((resolve, reject) => {
      this.once("finish", () => {
        this._flattenBufferIn();
        pd.pipeline(this.options, (pipelineError, pipelineData, pipelineInfo) => {
          if (pipelineError) {
            reject(x1.nativeError(pipelineError, errorContext));
          } else if (this.options.resolveWithObject) {
            resolve({
              data: pipelineData,
              info: pipelineInfo
            });
          } else {
            resolve(pipelineData);
          }
        });
      });
    });
  }
  // Not a stream input, no callback: return a Promise
  else {
    return new Promise((resolve, reject) => {
      pd.pipeline(this.options, (pipelineError, pipelineData, pipelineInfo) => {
        if (pipelineError) {
          reject(x1.nativeError(pipelineError, errorContext));
        } else if (this.options.resolveWithObject) {
          resolve({
            data: pipelineData,
            info: pipelineInfo
          });
        } else {
          resolve(pipelineData);
        }
      });
    });
  }
}

module.exports = processStreamOrCallback;

/**
 * Processes input and output streams or callbacks through a pipeline, handling errors and emitting appropriate events.
 *
 * This function supports both callback and Promise-based usage, as well as stream output modes. It manages the pipeline
 * execution, error handling, and event emission for various input/output scenarios.
 *
 * @param {Function|any} callbackOrOptions - Callback function to be called upon completion (if using callback style), or options for pipeline processing.
 * @param {any} context - Additional context or configuration to be passed to error handlers.
 * @returns {this|Promise<any>} Returns the current instance for chaining (if using callback or stream output), or a Promise resolving with the result.
 */
function handlePipelineProcessing(callbackOrOptions, context) {
  // If the first argument is a function, treat as callback style
  if (typeof callbackOrOptions === "function") {
    const callback = callbackOrOptions;
    // If input is a stream, wait for 'finish' event before processing
    if (this._isStreamInput()) {
      this.on("finish", () => {
        this._flattenBufferIn();
        pd.pipeline(this.options, (pipelineError, pipelineResult, pipelineInfo) => {
          if (pipelineError) {
            callback(x1.nativeError(pipelineError, context));
          } else {
            callback(null, pipelineResult, pipelineInfo);
          }
        });
      });
    } else {
      // Non-stream input: process pipeline immediately
      pd.pipeline(this.options, (pipelineError, pipelineResult, pipelineInfo) => {
        if (pipelineError) {
          callback(x1.nativeError(pipelineError, context));
        } else {
          callback(null, pipelineResult, pipelineInfo);
        }
      });
    }
    return this;
  }

  // If stream output is enabled
  if (this.options.streamOut) {
    // If input is a stream, handle finish event
    if (this._isStreamInput()) {
      this.once("finish", () => {
        this._flattenBufferIn();
        pd.pipeline(this.options, (pipelineError, pipelineResult, pipelineInfo) => {
          if (pipelineError) {
            this.emit("error", x1.nativeError(pipelineError, context));
          } else {
            this.emit("info", pipelineInfo);
            this.push(pipelineResult);
          }
          this.push(null);
          this.on("end", () => this.emit("close"));
        });
      });
      // If stream input already finished, emit 'finish' event
      if (this.streamInFinished) {
        this.emit("finish");
      }
    } else {
      // Non-stream input: process pipeline immediately
      pd.pipeline(this.options, (pipelineError, pipelineResult, pipelineInfo) => {
        if (pipelineError) {
          this.emit("error", x1.nativeError(pipelineError, context));
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

  // If input is a stream, return a Promise that resolves/rejects after pipeline processing
  if (this._isStreamInput()) {
    return new Promise((resolve, reject) => {
      this.once("finish", () => {
        this._flattenBufferIn();
        pd.pipeline(this.options, (pipelineError, pipelineResult, pipelineInfo) => {
          if (pipelineError) {
            reject(x1.nativeError(pipelineError, context));
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
  }

  // Default: return a Promise for non-stream input
  return new Promise((resolve, reject) => {
    pd.pipeline(this.options, (pipelineError, pipelineResult, pipelineInfo) => {
      if (pipelineError) {
        reject(x1.nativeError(pipelineError, context));
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

module.exports = handlePipelineProcessing;

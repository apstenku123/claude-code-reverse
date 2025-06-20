/**
 * Creates and manages a network request controller, handling request lifecycle, streaming, aborts, and response processing.
 *
 * @param {Object} requestContext - The context object containing request, controller, and timing info.
 * @param {boolean} [shouldAbortOnDestroy=false] - Whether to abort the request when destroyed.
 * @param {boolean} [isCrossOrigin=false] - Indicates if the request is cross-origin.
 * @returns {Promise<Object>} The response object containing status, headers, and a readable stream for the response body.
 */
async function createNetworkRequestController(requestContext, shouldAbortOnDestroy = false, isCrossOrigin = false) {
  // Ensure there is no existing connection or that isBlobOrFileLikeObject has been destroyed
  s_(!requestContext.controller.connection || requestContext.controller.connection.destroyed);

  // Initialize the connection object on the controller
  requestContext.controller.connection = {
    abort: null,
    destroyed: false,
    /**
     * Destroys the connection, optionally aborting the request.
     * @param {Error} [abortReason]
     * @param {boolean} [shouldAbort=true]
     */
    destroy(abortReason, shouldAbort = true) {
      if (!this.destroyed) {
        this.destroyed = true;
        if (shouldAbort) {
          this.abort?.(abortReason ?? new DOMException("The operation was aborted.", "AbortError"));
        }
      }
    }
  };

  const request = requestContext.request;
  let responseObject = null;
  const timingInfo = requestContext.timingInfo;

  // Always set cache to no-store for this request
  request.cache = "no-store";

  // Used for cross-origin requests
  const crossOriginHeader = isCrossOrigin ? "yes" : "no";

  // Placeholder for the request body stream
  let requestBodyStream = null;

  // If there is no body and a processRequestEndOfBody callback, schedule isBlobOrFileLikeObject
  if (request.body == null && requestContext.processRequestEndOfBody) {
    queueMicrotask(() => requestContext.processRequestEndOfBody());
  } else if (request.body != null) {
    // If there is a body, wrap isBlobOrFileLikeObject in an async generator for streaming
    /**
     * Async generator to yield body chunks and update chunk length
     * @param {Uint8Array} chunk
     */
    const processBodyChunk = async function* (chunk) {
      if (a_(requestContext)) return;
      yield chunk;
      requestContext.processRequestBodyChunkLength?.(chunk.byteLength);
    };

    /**
     * Called when the end of the body is reached
     */
    const handleEndOfBody = () => {
      if (a_(requestContext)) return;
      if (requestContext.processRequestEndOfBody) {
        requestContext.processRequestEndOfBody();
      }
    };

    /**
     * Handles errors during body streaming
     * @param {Error} error
     */
    const handleBodyError = error => {
      if (a_(requestContext)) return;
      if (error.name === "AbortError") {
        requestContext.controller.abort();
      } else {
        requestContext.controller.terminate(error);
      }
    };

    // Async generator for the request body stream
    requestBodyStream = (async function* () {
      try {
        for await (const chunk of request.body.stream) {
          yield* processBodyChunk(chunk);
        }
        handleEndOfBody();
      } catch (error) {
        handleBodyError(error);
      }
    })();
  }

  try {
    // Perform the network request
    const {
      body: responseBody,
      status: responseStatus,
      statusText: responseStatusText,
      headersList: responseHeaders,
      socket: responseSocket
    } = await performNetworkRequest({ body: requestBodyStream });

    if (responseSocket) {
      // If this is a WebSocket upgrade, build the response object with the socket
      responseObject = uY1({
        status: responseStatus,
        statusText: responseStatusText,
        headersList: responseHeaders,
        socket: responseSocket
      });
    } else {
      // For normal HTTP responses, set up an async iterator for the response body
      const responseIterator = responseBody[Symbol.asyncIterator]();
      requestContext.controller.next = () => responseIterator.next();
      responseObject = uY1({
        status: responseStatus,
        statusText: responseStatusText,
        headersList: responseHeaders
      });
    }
  } catch (networkError) {
    if (networkError.name === "AbortError") {
      requestContext.controller.connection.destroy();
      return dY1(requestContext, networkError);
    }
    return o5(networkError);
  }

  // Resume function for the ReadableStream pull
  const resumeStream = async () => {
    await requestContext.controller.resume();
  };

  // Cancel function for the ReadableStream cancel
  const cancelStream = abortReason => {
    if (!a_(requestContext)) {
      requestContext.controller.abort(abortReason);
    }
  };

  // Create a ReadableStream for the response body
  const responseStream = new ReadableStream({
    async start(controller) {
      requestContext.controller.controller = controller;
    },
    async pull(controller) {
      await resumeStream(controller);
    },
    async cancel(reason) {
      await cancelStream(reason);
    },
    type: "bytes"
  });

  // Attach the stream to the response object
  responseObject.body = {
    stream: responseStream,
    source: null,
    length: null
  };

  // Set up controller event handlers
  requestContext.controller.onAborted = handleTermination;
  requestContext.controller.on("terminated", handleTermination);

  // Main resume logic for streaming the response body
  requestContext.controller.resume = async () => {
    while (true) {
      let chunk, isError = false;
      try {
        const { done, value } = await requestContext.controller.next();
        if (up0(requestContext)) break;
        chunk = done ? undefined : value;
      } catch (error) {
        if (requestContext.controller.ended && !timingInfo.encodedBodySize) {
          chunk = undefined;
        } else {
          chunk = error;
          isError = true;
        }
      }
      if (chunk === undefined) {
        rz6(requestContext.controller.controller);
        markRequestDoneAndProcessResponse(requestContext, responseObject);
        return;
      }
      // Update decoded body size
      timingInfo.decodedBodySize += chunk?.byteLength ?? 0;
      if (isError) {
        requestContext.controller.terminate(chunk);
        return;
      }
      const uint8Chunk = new Uint8Array(chunk);
      if (uint8Chunk.byteLength) {
        requestContext.controller.controller.enqueue(uint8Chunk);
      }
      // If the stream is closed, terminate
      if (Vw6(responseStream)) {
        requestContext.controller.terminate();
        return;
      }
      // If the stream'createInteractionAccessor desired size is full, pause
      if (requestContext.controller.controller.desiredSize <= 0) {
        return;
      }
    }
  };

  /**
   * Handles termination or abort events for the controller
   * @param {Error} terminationReason
   */
  function handleTermination(terminationReason) {
    if (up0(requestContext)) {
      responseObject.aborted = true;
      if (cY1(responseStream)) {
        requestContext.controller.controller.error(requestContext.controller.serializedAbortReason);
      }
    } else if (cY1(responseStream)) {
      requestContext.controller.controller.error(new TypeError("terminated", {
        cause: az6(terminationReason) ? terminationReason : undefined
      }));
    }
    requestContext.controller.connection.destroy();
  }

  // Return the response object with the attached stream
  return responseObject;

  /**
   * Performs the actual network request using the dispatcher
   * @param {Object} options
   * @param {AsyncGenerator} options.body - The request body stream
   * @returns {Promise<Object>} The response object
   */
  function performNetworkRequest({ body }) {
    const requestUrl = ww(request);
    const dispatcher = requestContext.controller.dispatcher;
    return new Promise((resolve, reject) => dispatcher.dispatch({
      path: requestUrl.pathname + requestUrl.search,
      origin: requestUrl.origin,
      method: request.method,
      body: dispatcher.isMockActive ? request.body && (request.body.source || request.body.stream) : body,
      headers: request.headersList.entries,
      maxRedirections: 0,
      upgrade: request.mode === "websocket" ? "websocket" : undefined
    }, {
      body: null,
      abort: null,
      onConnect(connectCallback) {
        const { connection } = requestContext.controller;
        timingInfo.finalConnectionTimingInfo = ez6(undefined, timingInfo.postRedirectStartTime, requestContext.crossOriginIsolatedCapability);
        if (connection.destroyed) {
          connectCallback(new DOMException("The operation was aborted.", "AbortError"));
        } else {
          requestContext.controller.on("terminated", connectCallback);
          this.abort = connection.abort = connectCallback;
        }
        timingInfo.finalNetworkRequestStartTime = fr(requestContext.crossOriginIsolatedCapability);
      },
      onResponseStarted() {
        timingInfo.finalNetworkResponseStartTime = fr(requestContext.crossOriginIsolatedCapability);
      },
      onHeaders(statusCode, rawHeaders, readStream, statusText) {
        if (statusCode < 200) return;
        let encodings = [],
            location = "",
            headersList = new dp0();
        // Parse headers
        for (let i = 0; i < rawHeaders.length; i += 2) {
          headersList.append(cp0(rawHeaders[i]), rawHeaders[i + 1].toString("latin1"), true);
        }
        const contentEncoding = headersList.get("content-encoding", true);
        if (contentEncoding) {
          encodings = contentEncoding.toLowerCase().split(",").map(x => x.trim());
        }
        location = headersList.get("location", true);
        this.body = new Fw6({ read: readStream });
        let decompressors = [],
            isRedirect = location && request.redirect === "follow" && np0.has(statusCode);
        // Set up decompressors for supported encodings
        if (encodings.length !== 0 && request.method !== "HEAD" && request.method !== "CONNECT" && !ap0.includes(statusCode) && !isRedirect) {
          for (let i = encodings.length - 1; i >= 0; --i) {
            const encoding = encodings[i];
            if (encoding === "x-gzip" || encoding === "gzip") {
              decompressors.push(VR.createGunzip({
                flush: VR.constants.Z_SYNC_FLUSH,
                finishFlush: VR.constants.Z_SYNC_FLUSH
              }));
            } else if (encoding === "deflate") {
              decompressors.push(Qw6({
                flush: VR.constants.Z_SYNC_FLUSH,
                finishFlush: VR.constants.Z_SYNC_FLUSH
              }));
            } else if (encoding === "br") {
              decompressors.push(VR.createBrotliDecompress({
                flush: VR.constants.BROTLI_OPERATION_FLUSH,
                finishFlush: VR.constants.BROTLI_OPERATION_FLUSH
              }));
            } else {
              decompressors.length = 0;
              break;
            }
          }
        }
        const errorHandler = this.onError.bind(this);
        // Pipe through decompressors if needed
        return resolve({
          status: statusCode,
          statusText: statusText,
          headersList: headersList,
          body: decompressors.length
            ? Jw6(this.body, ...decompressors, err => {
                if (err) this.onError(err);
              }).on("error", errorHandler)
            : this.body.on("error", errorHandler)
        }), true;
      },
      onData(chunk) {
        if (requestContext.controller.dump) return;
        timingInfo.encodedBodySize += chunk.byteLength;
        this.body.push(chunk);
      },
      onComplete() {
        if (this.abort) requestContext.controller.off("terminated", this.abort);
        if (requestContext.controller.onAborted) requestContext.controller.off("terminated", requestContext.controller.onAborted);
        requestContext.controller.ended = true;
        this.body.push(null);
      },
      onError(error) {
        if (this.abort) requestContext.controller.off("terminated", this.abort);
        this.body?.destroy(error);
        requestContext.controller.terminate(error);
        reject(error);
      },
      onUpgrade(statusCode, rawHeaders, socket) {
        if (statusCode !== 101) return;
        const headersList = new dp0();
        for (let i = 0; i < rawHeaders.length; i += 2) {
          headersList.append(cp0(rawHeaders[i]), rawHeaders[i + 1].toString("latin1"), true);
        }
        return resolve({
          status: statusCode,
          statusText: Uw6[statusCode],
          headersList: headersList,
          socket: socket
        }), true;
      }
    }));
  }
}

module.exports = createNetworkRequestController;

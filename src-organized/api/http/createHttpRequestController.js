/**
 * Creates and manages an HTTP request controller, handling request lifecycle, streaming,
 * aborts, errors, and response processing. Supports streaming request/response bodies,
 * decompression, and integrates with a dispatcher for network operations.
 *
 * @param {Object} requestContext - The context for the HTTP request, including controller, request, and timing info.
 * @param {boolean} [shouldAbort=false] - Whether to abort the request on certain conditions.
 * @param {boolean} [isCrossOrigin=false] - Indicates if the request is cross-origin.
 * @returns {Promise<Object>} The response object with body stream and metadata.
 */
async function createHttpRequestController(requestContext, shouldAbort = false, isCrossOrigin = false) {
  // Ensure there is no existing connection or that isBlobOrFileLikeObject is destroyed
  s_(!requestContext.controller.connection || requestContext.controller.connection.destroyed);

  // Initialize the connection object on the controller
  requestContext.controller.connection = {
    abort: null,
    destroyed: false,
    /**
     * Destroys the connection, optionally aborting with a reason.
     * @param {Error} [reason]
     * @param {boolean} [shouldAbort=true]
     */
    destroy(reason, shouldAbort = true) {
      if (!this.destroyed) {
        this.destroyed = true;
        if (shouldAbort) {
          this.abort?.(reason ?? new DOMException("The operation was aborted.", "AbortError"));
        }
      }
    }
  };

  const request = requestContext.request;
  let response = null;
  const timingInfo = requestContext.timingInfo;

  // Always set cache to no-store for this request
  request.cache = "no-store";

  // Used for cross-origin requests
  const crossOriginHeader = isCrossOrigin ? "yes" : "no";

  // Placeholder for request body stream
  let requestBodyStream = null;

  // If body is null and there is a processRequestEndOfBody callback, schedule isBlobOrFileLikeObject
  if (request.body == null && requestContext.processRequestEndOfBody) {
    queueMicrotask(() => requestContext.processRequestEndOfBody());
  } else if (request.body != null) {
    // If there is a body, set up streaming and chunk processing
    /**
     * Async generator to yield body chunks and process their length.
     * @param {Uint8Array} chunk
     */
    const processBodyChunk = async function* (chunk) {
      if (a_(requestContext)) return;
      yield chunk;
      requestContext.processRequestBodyChunkLength?.(chunk.byteLength);
    };

    /**
     * Called when the end of the body is reached.
     */
    const handleEndOfBody = () => {
      if (a_(requestContext)) return;
      if (requestContext.processRequestEndOfBody) {
        requestContext.processRequestEndOfBody();
      }
    };

    /**
     * Handles errors during body streaming.
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
    // Perform the network request using the dispatcher
    const {
      body: responseBody,
      status: responseStatus,
      statusText: responseStatusText,
      headersList: responseHeaders,
      socket: responseSocket
    } = await performNetworkRequest({ body: requestBodyStream });

    if (responseSocket) {
      // If upgraded to a socket (e.g., WebSocket), wrap accordingly
      response = uY1({
        status: responseStatus,
        statusText: responseStatusText,
        headersList: responseHeaders,
        socket: responseSocket
      });
    } else {
      // Otherwise, set up async iterator for the response body
      const responseIterator = responseBody[Symbol.asyncIterator]();
      requestContext.controller.next = () => responseIterator.next();
      response = uY1({
        status: responseStatus,
        statusText: responseStatusText,
        headersList: responseHeaders
      });
    }
  } catch (networkError) {
    // Handle abort errors and other exceptions
    if (networkError.name === "AbortError") {
      requestContext.controller.connection.destroy();
      return dY1(requestContext, networkError);
    }
    return o5(networkError);
  }

  /**
   * Resumes the response stream by pulling the next chunk.
   */
  const resumeResponseStream = async () => {
    await requestContext.controller.resume();
  };

  /**
   * Aborts the response stream with a given reason.
   * @param {Error} reason
   */
  const abortResponseStream = reason => {
    if (!a_(requestContext)) {
      requestContext.controller.abort(reason);
    }
  };

  // Create a ReadableStream for the response body
  const readableResponseStream = new ReadableStream({
    async start(controller) {
      requestContext.controller.controller = controller;
    },
    async pull(controller) {
      await resumeResponseStream(controller);
    },
    async cancel(reason) {
      await abortResponseStream(reason);
    },
    type: "bytes"
  });

  // Attach the stream to the response object
  response.body = {
    stream: readableResponseStream,
    source: null,
    length: null
  };

  // Attach abort/termination handlers
  requestContext.controller.onAborted = handleTermination;
  requestContext.controller.on("terminated", handleTermination);

  // Define the resume logic for streaming the response body
  requestContext.controller.resume = async () => {
    while (true) {
      let chunk, isError = false;
      try {
        const { done, value } = await requestContext.controller.next();
        if (up0(requestContext)) break;
        chunk = done ? undefined : value;
      } catch (streamError) {
        if (requestContext.controller.ended && !timingInfo.encodedBodySize) {
          chunk = undefined;
        } else {
          chunk = streamError;
          isError = true;
        }
      }
      if (chunk === undefined) {
        // End of stream: close and process response
        rz6(requestContext.controller.controller);
        markRequestDoneAndProcessResponse(requestContext, response);
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
      if (Vw6(readableResponseStream)) {
        requestContext.controller.terminate();
        return;
      }
      if (requestContext.controller.controller.desiredSize <= 0) {
        return;
      }
    }
  };

  /**
   * Handles stream termination and errors.
   * @param {Error} reason
   */
  function handleTermination(reason) {
    if (up0(requestContext)) {
      response.aborted = true;
      if (cY1(readableResponseStream)) {
        requestContext.controller.controller.error(requestContext.controller.serializedAbortReason);
      }
    } else if (cY1(readableResponseStream)) {
      requestContext.controller.controller.error(new TypeError("terminated", {
        cause: az6(reason) ? reason : undefined
      }));
    }
    requestContext.controller.connection.destroy();
  }

  return response;

  /**
   * Performs the actual network request using the dispatcher.
   * Handles headers, streaming, decompression, and events.
   * @param {Object} options
   * @param {AsyncGenerator} options.body
   * @returns {Promise<Object>} The response object
   */
  function performNetworkRequest({ body }) {
    const urlInfo = ww(request);
    const dispatcher = requestContext.controller.dispatcher;
    return new Promise((resolve, reject) => dispatcher.dispatch({
      path: urlInfo.pathname + urlInfo.search,
      origin: urlInfo.origin,
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
        // Set up decompression pipeline if needed
        if (
          encodings.length !== 0 &&
          request.method !== "HEAD" &&
          request.method !== "CONNECT" &&
          !ap0.includes(statusCode) &&
          !isRedirect
        ) {
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
      onData(dataChunk) {
        if (requestContext.controller.dump) return;
        timingInfo.encodedBodySize += dataChunk.byteLength;
        this.body.push(dataChunk);
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

module.exports = createHttpRequestController;

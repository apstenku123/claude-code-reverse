/**
 * Sends an HTTP/2 request using the provided connection and configuration.
 * Handles headers, body, events, and error management for the request lifecycle.
 *
 * @param {object} connectionContext - The HTTP/2 connection context (internal state, pools, etc).
 * @param {object} requestConfig - The configuration for the request, including method, path, headers, body, etc.
 * @returns {boolean} True if the request was successfully initiated, false otherwise.
 */
function sendHttp2Request(connectionContext, requestConfig) {
  const http2Session = connectionContext[cV];
  const {
    method: httpMethod,
    path: requestPath,
    host: requestHost,
    upgrade: isUpgrade,
    expectContinue: expectContinue,
    signal: abortSignal,
    headers: rawHeaders,
    body: requestBody,
    contentLength: configContentLength
  } = requestConfig;

  // HTTP/2 does not support upgrade requests
  if (isUpgrade) {
    P6.errorRequest(connectionContext, requestConfig, new Error("Upgrade not supported for createUserMessageObject"));
    return false;
  }

  // Build headers object from rawHeaders array
  const headers = {};
  for (let i = 0; i < rawHeaders.length; i += 2) {
    const headerName = rawHeaders[i];
    const headerValue = rawHeaders[i + 1];
    if (Array.isArray(headerValue)) {
      for (let j = 0; j < headerValue.length; j++) {
        if (headers[headerName]) {
          headers[headerName] += `,${headerValue[j]}`;
        } else {
          headers[headerName] = headerValue[j];
        }
      }
    } else {
      headers[headerName] = headerValue;
    }
  }

  // Extract hostname and port from connection context
  const {
    hostname: connectionHostname,
    port: connectionPort
  } = connectionContext[GY1];

  // Set required HTTP/2 pseudo-headers
  headers[RX6] = requestHost || `${connectionHostname}${connectionPort ? `:${connectionPort}` : ""}`;
  headers[OX6] = httpMethod;

  /**
   * Handles request errors and cleanup.
   * @param {Error} [error] - The error to handle.
   */
  let stream = null;
  function handleError(error) {
    if (requestConfig.aborted || requestConfig.completed) return;
    const err = error || new gh0();
    P6.errorRequest(connectionContext, requestConfig, err);
    if (stream != null) P6.destroy(stream, err);
    P6.destroy(requestBody, err);
    connectionContext[ZR][connectionContext[pV]++] = null;
    connectionContext[DR]();
  }

  // Notify about connection
  try {
    requestConfig.onConnect(handleError);
  } catch (err) {
    P6.errorRequest(connectionContext, requestConfig, err);
  }

  if (requestConfig.aborted) return false;

  // Handle HTTP CONNECT method (tunneling)
  if (httpMethod === "CONNECT") {
    http2Session.ref();
    stream = http2Session.request(headers, {
      endStream: false,
      signal: abortSignal
    });
    if (stream.id && !stream.pending) {
      requestConfig.onUpgrade(null, null, stream);
      ++http2Session[MN];
      connectionContext[ZR][connectionContext[pV]++] = null;
    } else {
      stream.once("ready", () => {
        requestConfig.onUpgrade(null, null, stream);
        ++http2Session[MN];
        connectionContext[ZR][connectionContext[pV]++] = null;
      });
    }
    stream.once("close", () => {
      http2Session[MN] -= 1;
      if (http2Session[MN] === 0) http2Session.unref();
    });
    return true;
  }

  // Set more HTTP/2 pseudo-headers
  headers[TX6] = requestPath;
  headers[PX6] = "https";

  // Determine if method typically has a body
  const methodHasBody = httpMethod === "PUT" || httpMethod === "POST" || httpMethod === "PATCH";

  // If body is a stream-like object, prime isBlobOrFileLikeObject
  if (requestBody && typeof requestBody.read === "function") {
    requestBody.read(0);
  }

  // Calculate body length
  let bodyLength = P6.bodyLength(requestBody);

  // Handle FormData-like bodies
  if (P6.isFormDataLike(requestBody)) {
    hh0 ??= Eh().extractBody;
    const [formDataResult, contentType] = hh0(requestBody);
    headers["content-type"] = contentType;
    requestBody = formDataResult.stream;
    bodyLength = formDataResult.length;
  }

  // Use contentLength from config if not determined
  if (bodyLength == null) bodyLength = configContentLength;

  // If no body or method does not allow body, unset bodyLength
  if (bodyLength === 0 || !methodHasBody) bodyLength = null;

  // Validate content length for methods with body
  if (
    isRequestMethodWithBody(httpMethod) &&
    bodyLength > 0 &&
    configContentLength != null &&
    configContentLength !== bodyLength
  ) {
    if (connectionContext[qX6]) {
      P6.errorRequest(connectionContext, requestConfig, new bd1());
      return false;
    }
    process.emitWarning(new bd1());
  }

  // Set content-length header if applicable
  if (bodyLength != null) {
    kX(requestBody, "no body must not have content length");
    headers[SX6] = `${bodyLength}`;
  }

  http2Session.ref();

  // Determine if request should end the stream immediately
  const shouldEndStream = httpMethod === "GET" || httpMethod === "HEAD" || requestBody === null;

  // Helper to send the body
  function sendBody() {
    if (!requestBody || bodyLength === 0) {
      handleRequestAndSendBody(handleError, stream, null, connectionContext, requestConfig, connectionContext[$createObjectTracker], bodyLength, methodHasBody);
    } else if (P6.isBuffer(requestBody)) {
      handleRequestAndSendBody(handleError, stream, requestBody, connectionContext, requestConfig, connectionContext[$createObjectTracker], bodyLength, methodHasBody);
    } else if (P6.isBlobLike(requestBody)) {
      if (typeof requestBody.stream === "function") {
        streamAsyncIterableToWritable(handleError, stream, requestBody.stream(), connectionContext, requestConfig, connectionContext[$createObjectTracker], bodyLength, methodHasBody);
      } else {
        sendBlobBodyOverStream(handleError, stream, requestBody, connectionContext, requestConfig, connectionContext[$createObjectTracker], bodyLength, methodHasBody);
      }
    } else if (P6.isStream(requestBody)) {
      handleStreamBodyPipelining(handleError, connectionContext[$createObjectTracker], methodHasBody, stream, requestBody, connectionContext, requestConfig, bodyLength);
    } else if (P6.isIterable(requestBody)) {
      streamAsyncIterableToWritable(handleError, stream, requestBody, connectionContext, requestConfig, connectionContext[$createObjectTracker], bodyLength, methodHasBody);
    } else {
      kX(false);
    }
  }

  // Send the request, handling '100-continue' if needed
  if (expectContinue) {
    headers[_X6] = "100-continue";
    stream = http2Session.request(headers, {
      endStream: shouldEndStream,
      signal: abortSignal
    });
    stream.once("continue", sendBody);
  } else {
    stream = http2Session.request(headers, {
      endStream: shouldEndStream,
      signal: abortSignal
    });
    sendBody();
  }

  ++http2Session[MN];

  // Handle response events
  stream.once("response", responseHeaders => {
    const {
      [jX6]: statusCode,
      ...otherHeaders
    } = responseHeaders;
    requestConfig.onResponseStarted();
    if (requestConfig.aborted) {
      const abortError = new gh0();
      P6.errorRequest(connectionContext, requestConfig, abortError);
      P6.destroy(stream, abortError);
      return;
    }
    // onHeaders can return false to pause the stream
    if (requestConfig.onHeaders(Number(statusCode), convertObjectEntriesToBufferArray(otherHeaders), stream.resume.bind(stream), "") === false) {
      stream.pause();
    }
    stream.on("data", chunk => {
      if (requestConfig.onData(chunk) === false) {
        stream.pause();
      }
    });
  });

  stream.once("end", () => {
    // If stream is not fully closed, mark as complete
    if (stream.state?.state == null || stream.state.state < 6) {
      requestConfig.onComplete([]);
    }
    if (http2Session[MN] === 0) http2Session.unref();
    handleError(new gd1("HTTP/2: stream half-closed (remote)"));
    connectionContext[ZR][connectionContext[pV]++] = null;
    connectionContext[hd1] = connectionContext[pV];
    connectionContext[DR]();
  });

  stream.once("close", () => {
    http2Session[MN] -= 1;
    if (http2Session[MN] === 0) http2Session.unref();
  });

  stream.once("error", function (err) {
    handleError(err);
  });

  stream.once("frameError", (type, code) => {
    handleError(new gd1(`HTTP/2: \"frameError\" received - type ${type}, code ${code}`));
  });

  return true;
}

module.exports = sendHttp2Request;
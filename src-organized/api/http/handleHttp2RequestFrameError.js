/**
 * Handles an HTTP/2 request, managing headers, body, and stream events, including error and upgrade handling.
 * This function is responsible for constructing and sending an HTTP/2 request based on the provided configuration,
 * handling special cases like CONNECT, upgrades, streaming bodies, and emitting appropriate events on the request lifecycle.
 *
 * @param {object} clientContext - The HTTP/2 client context, containing connection and session state.
 * @param {object} requestConfig - The configuration for the HTTP/2 request, including method, path, headers, body, and callbacks.
 * @returns {boolean} Returns true if the request was successfully initiated, false otherwise.
 */
function handleHttp2RequestFrameError(clientContext, requestConfig) {
  const session = clientContext[cV];
  const {
    method,
    path,
    host,
    upgrade,
    expectContinue,
    signal,
    headers
  } = requestConfig;
  let { body } = requestConfig;

  // Upgrade is not supported for HTTP/2
  if (upgrade) {
    P6.errorRequest(clientContext, requestConfig, new Error("Upgrade not supported for createUserMessageObject"));
    return false;
  }

  // Build headers object from array
  const headersObject = {};
  for (let i = 0; i < headers.length; i += 2) {
    const headerName = headers[i];
    const headerValue = headers[i + 1];
    if (Array.isArray(headerValue)) {
      for (let j = 0; j < headerValue.length; j++) {
        if (headersObject[headerName]) {
          headersObject[headerName] += `,${headerValue[j]}`;
        } else {
          headersObject[headerName] = headerValue[j];
        }
      }
    } else {
      headersObject[headerName] = headerValue;
    }
  }

  // Extract hostname and port from client context
  const {
    hostname,
    port
  } = clientContext[GY1];

  // Set required HTTP/2 pseudo-headers
  headersObject[RX6] = host || `${hostname}${port ? `:${port}` : ""}`;
  headersObject[OX6] = method;

  let stream = null;

  /**
   * Handles errors and cleanup for the request/stream.
   * @param {Error} error
   */
  const handleError = (error) => {
    if (requestConfig.aborted || requestConfig.completed) return;
    const err = error || new gh0();
    P6.errorRequest(clientContext, requestConfig, err);
    if (stream != null) {
      P6.destroy(stream, err);
    }
    P6.destroy(body, err);
    clientContext[ZR][clientContext[pV]++] = null;
    clientContext[DR]();
  };

  // Notify on connect
  try {
    requestConfig.onConnect(handleError);
  } catch (err) {
    P6.errorRequest(clientContext, requestConfig, err);
  }

  if (requestConfig.aborted) {
    return false;
  }

  // Special handling for CONNECT method
  if (method === "CONNECT") {
    session.ref();
    stream = session.request(headersObject, {
      endStream: false,
      signal
    });
    if (stream.id && !stream.pending) {
      requestConfig.onUpgrade(null, null, stream);
      ++session[MN];
      clientContext[ZR][clientContext[pV]++] = null;
    } else {
      stream.once("ready", () => {
        requestConfig.onUpgrade(null, null, stream);
        ++session[MN];
        clientContext[ZR][clientContext[pV]++] = null;
      });
    }
    stream.once("close", () => {
      session[MN] -= 1;
      if (session[MN] === 0) session.unref();
    });
    return true;
  }

  headersObject[TX6] = path;
  headersObject[PX6] = "https";

  // Determine if the method typically has a body
  const methodAllowsBody = method === "PUT" || method === "POST" || method === "PATCH";

  // If body is a stream, trigger a read to start flowing
  if (body && typeof body.read === "function") {
    body.read(0);
  }

  // Determine body length
  let bodyLength = P6.bodyLength(body);

  // Handle FormData-like bodies
  if (P6.isFormDataLike(body)) {
    hh0 ??= Eh().extractBody;
    const [formDataResult, contentType] = hh0(body);
    headersObject["content-type"] = contentType;
    body = formDataResult.stream;
    bodyLength = formDataResult.length;
  }

  // Use explicit contentLength if bodyLength is not determined
  if (bodyLength == null) {
    bodyLength = requestConfig.contentLength;
  }

  // If no body or method doesn'processRuleBeginHandlers allow body, clear bodyLength
  if (bodyLength === 0 || !methodAllowsBody) {
    bodyLength = null;
  }

  // Validate content length for methods that must have a body
  if (
    isRequestMethodWithBody(method) &&
    bodyLength > 0 &&
    requestConfig.contentLength != null &&
    requestConfig.contentLength !== bodyLength
  ) {
    if (clientContext[qX6]) {
      P6.errorRequest(clientContext, requestConfig, new bd1());
      return false;
    }
    process.emitWarning(new bd1());
  }

  // Set content-length header if appropriate
  if (bodyLength != null) {
    kX(body, "no body must not have content length");
    headersObject[SX6] = `${bodyLength}`;
  }

  session.ref();

  // Determine if request should end immediately (no body)
  const endStreamImmediately = method === "GET" || method === "HEAD" || body === null;

  // Handle 'Expect: 100-continue' header
  if (expectContinue) {
    headersObject[_X6] = "100-continue";
    stream = session.request(headersObject, {
      endStream: endStreamImmediately,
      signal
    });
    stream.once("continue", sendRequestBody);
  } else {
    stream = session.request(headersObject, {
      endStream: endStreamImmediately,
      signal
    });
    sendRequestBody();
  }

  ++session[MN];

  // Handle response events
  stream.once("response", (responseHeaders) => {
    const {
      [jX6]: statusCode,
      ...restHeaders
    } = responseHeaders;
    requestConfig.onResponseStarted();
    if (requestConfig.aborted) {
      const abortError = new gh0();
      P6.errorRequest(clientContext, requestConfig, abortError);
      P6.destroy(stream, abortError);
      return;
    }
    // If onHeaders returns false, pause the stream
    if (
      requestConfig.onHeaders(
        Number(statusCode),
        convertObjectEntriesToBufferArray(restHeaders),
        stream.resume.bind(stream),
        ""
      ) === false
    ) {
      stream.pause();
    }
    stream.on("data", (chunk) => {
      if (requestConfig.onData(chunk) === false) {
        stream.pause();
      }
    });
  });

  stream.once("end", () => {
    if (stream.state?.state == null || stream.state.state < 6) {
      requestConfig.onComplete([]);
    }
    if (session[MN] === 0) session.unref();
    handleError(new gd1("HTTP/2: stream half-closed (remote)"));
    clientContext[ZR][clientContext[pV]++] = null;
    clientContext[hd1] = clientContext[pV];
    clientContext[DR]();
  });

  stream.once("close", () => {
    session[MN] -= 1;
    if (session[MN] === 0) session.unref();
  });

  stream.once("error", (err) => {
    handleError(err);
  });

  stream.once("frameError", (type, code) => {
    handleError(new gd1(`HTTP/2: "frameError" received - type ${type}, code ${code}`));
  });

  return true;

  /**
   * Sends the request body using the appropriate handler based on its type.
   */
  function sendRequestBody() {
    if (!body || bodyLength === 0) {
      handleRequestAndSendBody(handleError, stream, null, clientContext, requestConfig, clientContext[$createObjectTracker], bodyLength, methodAllowsBody);
    } else if (P6.isBuffer(body)) {
      handleRequestAndSendBody(handleError, stream, body, clientContext, requestConfig, clientContext[$createObjectTracker], bodyLength, methodAllowsBody);
    } else if (P6.isBlobLike(body)) {
      if (typeof body.stream === "function") {
        streamAsyncIterableToWritable(handleError, stream, body.stream(), clientContext, requestConfig, clientContext[$createObjectTracker], bodyLength, methodAllowsBody);
      } else {
        sendBlobBodyOverStream(handleError, stream, body, clientContext, requestConfig, clientContext[$createObjectTracker], bodyLength, methodAllowsBody);
      }
    } else if (P6.isStream(body)) {
      handleStreamBodyPipelining(handleError, clientContext[$createObjectTracker], methodAllowsBody, stream, body, clientContext, requestConfig, bodyLength);
    } else if (P6.isIterable(body)) {
      streamAsyncIterableToWritable(handleError, stream, body, clientContext, requestConfig, clientContext[$createObjectTracker], bodyLength, methodAllowsBody);
    } else {
      kX(false);
    }
  }
}

module.exports = handleHttp2RequestFrameError;
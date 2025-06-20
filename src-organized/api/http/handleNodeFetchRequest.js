/**
 * Handles an HTTP(s) request using Node.js streams, supporting redirects, timeouts, abort signals, and compression.
 *
 * @param {object} requestInfo - The request information or URL object.
 * @param {object} requestInit - The request initialization options (headers, method, body, etc).
 * @returns {Promise<object>} a promise that resolves to a response-like object containing the response stream and metadata.
 * @throws {Error} If a native Promise implementation is missing.
 */
function handleNodeFetchRequest(requestInfo, requestInit) {
  if (!handleNodeFetchRequest.Promise) {
    throw new Error("native promise missing, set fetch.Promise to your favorite alternative");
  }

  // Set the global Promise implementation for internal use
  initializeRequestBody.Promise = handleNodeFetchRequest.Promise;

  return new handleNodeFetchRequest.Promise(function (resolve, reject) {
    // Prepare the request object and options
    const fetchRequest = new oR(requestInfo, requestInit);
    const createRequestOptions = createRequestOptions(fetchRequest);
    const requestModule = createRequestOptions.protocol === "https:" ? Yt6 : vD2;
    const httpRequest = requestModule.request;
    const abortSignal = fetchRequest.signal;
    let responseInstance = null;
    let timeoutId = null;

    /**
     * Handles aborting the request and cleaning up streams.
     */
    const abortRequest = function abortRequestHandler() {
      const abortError = new AbortedError("The user aborted a request.");
      reject(abortError);
      if (fetchRequest.body && fetchRequest.body instanceof JK.Readable) {
        handleObservableError(fetchRequest.body, abortError);
      }
      if (!responseInstance || !responseInstance.body) return;
      responseInstance.body.emit("error", abortError);
    };

    // If already aborted, abort immediately
    if (abortSignal && abortSignal.aborted) {
      abortRequest();
      return;
    }

    /**
     * Handles abort event and cleanup.
     */
    const onAbort = function onAbortHandler() {
      abortRequest();
      cleanup();
    };

    // Initiate the HTTP(s) request
    const nodeRequest = httpRequest(createRequestOptions);

    /**
     * Cleans up listeners and timeouts.
     */
    function cleanup() {
      nodeRequest.abort();
      if (abortSignal) abortSignal.removeEventListener("abort", onAbort);
      clearTimeout(timeoutId);
    }

    // Listen for abort events
    if (abortSignal) abortSignal.addEventListener("abort", onAbort);

    // Handle request timeout if specified
    if (fetchRequest.timeout) {
      nodeRequest.once("socket", function (socket) {
        timeoutId = setTimeout(function () {
          reject(new CustomError(`network timeout at: ${fetchRequest.url}`, "request-timeout"));
          cleanup();
        }, fetchRequest.timeout);
      });
    }

    // Handle request errors
    nodeRequest.on("error", function (error) {
      reject(new CustomError(`request to ${fetchRequest.url} failed, reason: ${error.message}`, "system", error));
      if (responseInstance && responseInstance.body) {
        handleObservableError(responseInstance.body, error);
      }
      cleanup();
    });

    // Handle premature close for Node.js < 14
    if (parseInt(process.version.substring(1)) < 14) {
      nodeRequest.on("socket", function (socket) {
        socket.addListener("close", function (hadError) {
          const hasDataListeners = socket.listenerCount("data") > 0;
          if (responseInstance && hasDataListeners && !hadError && !(abortSignal && abortSignal.aborted)) {
            const prematureCloseError = new Error("Premature close");
            prematureCloseError.code = "ERR_STREAM_PREMATURE_CLOSE";
            responseInstance.body.emit("error", prematureCloseError);
          }
        });
      });
    }

    // Handle response event
    nodeRequest.on("response", function (incomingMessage) {
      clearTimeout(timeoutId);
      const responseHeaders = extractValidPropertiesToCollection(incomingMessage.headers);

      // Handle HTTP redirects
      if (handleNodeFetchRequest.isRedirect(incomingMessage.statusCode)) {
        const locationHeader = responseHeaders.get("Location");
        let redirectUrl = null;
        try {
          redirectUrl = locationHeader === null ? null : new lt(locationHeader, fetchRequest.url).toString();
        } catch (redirectError) {
          if (fetchRequest.redirect !== "manual") {
            reject(new CustomError(`uri requested responds with an invalid redirect URL: ${locationHeader}`, "invalid-redirect"));
            cleanup();
            return;
          }
        }
        switch (fetchRequest.redirect) {
          case "error":
            reject(new CustomError(`uri requested responds with a redirect, redirect mode is set to error: ${fetchRequest.url}`, "no-redirect"));
            cleanup();
            return;
          case "manual":
            if (redirectUrl !== null) {
              try {
                responseHeaders.set("Location", redirectUrl);
              } catch (headerSetError) {
                reject(headerSetError);
              }
            }
            break;
          case "follow":
            if (redirectUrl === null) break;
            if (fetchRequest.counter >= fetchRequest.follow) {
              reject(new CustomError(`maximum redirect reached at: ${fetchRequest.url}`, "max-redirect"));
              cleanup();
              return;
            }
            // Prepare options for the next redirect request
            const redirectOptions = {
              headers: new rX(fetchRequest.headers),
              follow: fetchRequest.follow,
              counter: fetchRequest.counter + 1,
              agent: fetchRequest.agent,
              compress: fetchRequest.compress,
              method: fetchRequest.method,
              body: fetchRequest.body,
              signal: fetchRequest.signal,
              timeout: fetchRequest.timeout,
              size: fetchRequest.size
            };
            // Remove sensitive headers if protocol or domain changes
            if (!isSameOrSubdomain(fetchRequest.url, redirectUrl) || !areProtocolsEqual(fetchRequest.url, redirectUrl)) {
              for (const sensitiveHeader of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                redirectOptions.headers.delete(sensitiveHeader);
              }
            }
            // Prevent following with a readable stream body unless allowed
            if (incomingMessage.statusCode !== 303 && fetchRequest.body && getBodyLength(fetchRequest) === null) {
              reject(new CustomError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              cleanup();
              return;
            }
            // Per spec, convert POST to GET on 303, or on 301/302 with POST
            if (
              incomingMessage.statusCode === 303 ||
              ((incomingMessage.statusCode === 301 || incomingMessage.statusCode === 302) && fetchRequest.method === "POST")
            ) {
              redirectOptions.method = "GET";
              redirectOptions.body = undefined;
              redirectOptions.headers.delete("content-length");
            }
            // Recursively call for the next redirect
            resolve(handleNodeFetchRequest(new oR(redirectUrl, redirectOptions)));
            cleanup();
            return;
        }
      }

      // Remove abort listener after response ends
      incomingMessage.once("end", function () {
        if (abortSignal) abortSignal.removeEventListener("abort", onAbort);
      });

      // Pipe the response through a PassThrough stream for further processing
      let responseBodyStream = incomingMessage.pipe(new fD2());
      const responseMeta = {
        url: fetchRequest.url,
        status: incomingMessage.statusCode,
        statusText: incomingMessage.statusMessage,
        headers: responseHeaders,
        size: fetchRequest.size,
        timeout: fetchRequest.timeout,
        counter: fetchRequest.counter
      };
      const contentEncoding = responseHeaders.get("Content-Encoding");

      // Handle decompression if needed
      if (
        !fetchRequest.compress ||
        fetchRequest.method === "HEAD" ||
        contentEncoding === null ||
        incomingMessage.statusCode === 204 ||
        incomingMessage.statusCode === 304
      ) {
        responseInstance = new sX(responseBodyStream, responseMeta);
        resolve(responseInstance);
        return;
      }

      // Decompression options for zlib
      const zlibOptions = {
        flush: $j.Z_SYNC_FLUSH,
        finishFlush: $j.Z_SYNC_FLUSH
      };

      // Handle gzip encoding
      if (contentEncoding === "gzip" || contentEncoding === "x-gzip") {
        responseBodyStream = responseBodyStream.pipe($j.createGunzip(zlibOptions));
        responseInstance = new sX(responseBodyStream, responseMeta);
        resolve(responseInstance);
        return;
      }

      // Handle deflate encoding
      if (contentEncoding === "deflate" || contentEncoding === "x-deflate") {
        const peekStream = incomingMessage.pipe(new fD2());
        peekStream.once("data", function (chunk) {
          // Detect zlib header
          if ((chunk[0] & 15) === 8) {
            responseBodyStream = responseBodyStream.pipe($j.createInflate());
          } else {
            responseBodyStream = responseBodyStream.pipe($j.createInflateRaw());
          }
          responseInstance = new sX(responseBodyStream, responseMeta);
          resolve(responseInstance);
        });
        peekStream.on("end", function () {
          if (!responseInstance) {
            responseInstance = new sX(responseBodyStream, responseMeta);
            resolve(responseInstance);
          }
        });
        return;
      }

      // Handle Brotli encoding if supported
      if (contentEncoding === "br" && typeof $j.createBrotliDecompress === "function") {
        responseBodyStream = responseBodyStream.pipe($j.createBrotliDecompress());
        responseInstance = new sX(responseBodyStream, responseMeta);
        resolve(responseInstance);
        return;
      }

      // Fallback: no decompression
      responseInstance = new sX(responseBodyStream, responseMeta);
      resolve(responseInstance);
    });

    // Handle response body stream (custom logic, e.g., piping or writing)
    Jt6(nodeRequest, fetchRequest);

    // Handle custom error propagation for response stream
    handlePrematureChunkedResponseClose(nodeRequest, function (streamError) {
      if (abortSignal && abortSignal.aborted) return;
      if (responseInstance && responseInstance.body) {
        handleObservableError(responseInstance.body, streamError);
      }
    });
  });
}

module.exports = handleNodeFetchRequest;
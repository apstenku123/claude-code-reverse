/**
 * Handles an HTTP(s) request with support for redirects, timeouts, abort signals, and decompression.
 *
 * @param {object|string} requestInput - The request input, either a URL string or a request options object.
 * @param {object} createRequestOptions - Additional options for the request (headers, method, body, etc).
 * @returns {Promise<object>} - a promise that resolves to a response object with stream body and metadata.
 * @throws {Error} - Throws if no native Promise implementation is available.
 */
function handleHttpRequest(requestInput, createRequestOptions) {
  if (!handleHttpRequest.Promise) {
    throw new Error("native promise missing, set fetch.Promise to your favorite alternative");
  }
  // Set the global Promise reference for initializeRequestBody
  initializeRequestBody.Promise = handleHttpRequest.Promise;

  return new handleHttpRequest.Promise(function (resolve, reject) {
    // Create normalized request object
    const normalizedRequest = new oR(requestInput, createRequestOptions);
    const requestConfig = createRequestOptions(normalizedRequest); // Normalized HTTP(s) request options
    const requestProtocol = requestConfig.protocol === "https:" ? Yt6 : vD2;
    const httpRequest = requestProtocol.request;
    const abortSignal = normalizedRequest.signal;
    let responseInstance = null;
    let timeoutId = null;

    /**
     * Handles aborting the request and propagating abort errors.
     */
    const abortRequest = function abortRequestHandler() {
      const abortError = new AbortedError("The user aborted a request.");
      reject(abortError);
      if (normalizedRequest.body && normalizedRequest.body instanceof JK.Readable) {
        handleObservableError(normalizedRequest.body, abortError);
      }
      if (!responseInstance || !responseInstance.body) return;
      responseInstance.body.emit("error", abortError);
    };

    // If already aborted, handle abort immediately
    if (abortSignal && abortSignal.aborted) {
      abortRequest();
      return;
    }

    /**
     * Handles abort event listener cleanup and request abortion.
     */
    const abortEventListener = function abortEventListenerHandler() {
      abortRequest();
      cleanup();
    };

    // Initiate the HTTP(s) request
    const clientRequest = httpRequest(requestConfig);

    // Attach abort event listener if signal is present
    if (abortSignal) {
      abortSignal.addEventListener("abort", abortEventListener);
    }

    /**
     * Cleans up request resources: aborts request, removes listeners, clears timeout.
     */
    function cleanup() {
      clientRequest.abort();
      if (abortSignal) abortSignal.removeEventListener("abort", abortEventListener);
      clearTimeout(timeoutId);
    }

    // Handle request timeout if specified
    if (normalizedRequest.timeout) {
      clientRequest.once("socket", function onSocket() {
        timeoutId = setTimeout(function onTimeout() {
          reject(new CustomError(`network timeout at: ${normalizedRequest.url}`, "request-timeout"));
          cleanup();
        }, normalizedRequest.timeout);
      });
    }

    // Handle request errors
    clientRequest.on("error", function onError(error) {
      reject(new CustomError(`request to ${normalizedRequest.url} failed, reason: ${error.message}`, "system", error));
      if (responseInstance && responseInstance.body) {
        handleObservableError(responseInstance.body, error);
      }
      cleanup();
    });

    // Handle premature close for Node.js < 14
    if (parseInt(process.version.substring(1)) < 14) {
      clientRequest.on("socket", function onSocket(socket) {
        socket.addListener("close", function onClose(hadError) {
          const hasDataListeners = socket.listenerCount("data") > 0;
          if (responseInstance && hasDataListeners && !hadError && !(abortSignal && abortSignal.aborted)) {
            const prematureCloseError = new Error("Premature close");
            prematureCloseError.code = "ERR_STREAM_PREMATURE_CLOSE";
            responseInstance.body.emit("error", prematureCloseError);
          }
        });
      });
    }

    // Custom error/cleanup logic for request stream
    handlePrematureChunkedResponseClose(clientRequest, function onCustomError(customError) {
      if (abortSignal && abortSignal.aborted) return;
      if (responseInstance && responseInstance.body) {
        handleObservableError(responseInstance.body, customError);
      }
    });

    // Handle HTTP response
    clientRequest.on("response", function onResponse(incomingMessage) {
      clearTimeout(timeoutId);
      const responseHeaders = extractValidPropertiesToCollection(incomingMessage.headers);

      // Handle HTTP redirects
      if (handleHttpRequest.isRedirect(incomingMessage.statusCode)) {
        const locationHeader = responseHeaders.get("Location");
        let redirectUrl = null;
        try {
          redirectUrl = locationHeader === null ? null : new lt(locationHeader, normalizedRequest.url).toString();
        } catch (redirectError) {
          if (normalizedRequest.redirect !== "manual") {
            reject(new CustomError(`uri requested responds with an invalid redirect URL: ${locationHeader}`, "invalid-redirect"));
            cleanup();
            return;
          }
        }
        switch (normalizedRequest.redirect) {
          case "error":
            reject(new CustomError(`uri requested responds with a redirect, redirect mode is set to error: ${normalizedRequest.url}`, "no-redirect"));
            cleanup();
            return;
          case "manual":
            if (redirectUrl !== null) {
              try {
                responseHeaders.set("Location", redirectUrl);
              } catch (setLocationError) {
                reject(setLocationError);
              }
            }
            break;
          case "follow":
            if (redirectUrl === null) break;
            if (normalizedRequest.counter >= normalizedRequest.follow) {
              reject(new CustomError(`maximum redirect reached at: ${normalizedRequest.url}`, "max-redirect"));
              cleanup();
              return;
            }
            // Prepare new request options for redirect
            const redirectOptions = {
              headers: new rX(normalizedRequest.headers),
              follow: normalizedRequest.follow,
              counter: normalizedRequest.counter + 1,
              agent: normalizedRequest.agent,
              compress: normalizedRequest.compress,
              method: normalizedRequest.method,
              body: normalizedRequest.body,
              signal: normalizedRequest.signal,
              timeout: normalizedRequest.timeout,
              size: normalizedRequest.size
            };
            // Remove sensitive headers if protocol/host changes
            if (!isSameOrSubdomain(normalizedRequest.url, redirectUrl) || !areProtocolsEqual(normalizedRequest.url, redirectUrl)) {
              for (const sensitiveHeader of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                redirectOptions.headers.delete(sensitiveHeader);
              }
            }
            // Disallow following redirect with readable stream body unless allowed
            if (incomingMessage.statusCode !== 303 && normalizedRequest.body && getBodyLength(normalizedRequest) === null) {
              reject(new CustomError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              cleanup();
              return;
            }
            // For 303 or 301/302 with POST, switch to GET and remove body
            if (
              incomingMessage.statusCode === 303 ||
              ((incomingMessage.statusCode === 301 || incomingMessage.statusCode === 302) && normalizedRequest.method === "POST")
            ) {
              redirectOptions.method = "GET";
              redirectOptions.body = undefined;
              redirectOptions.headers.delete("content-length");
            }
            // Recursively call handleHttpRequest for the redirect
            resolve(handleHttpRequest(new oR(redirectUrl, redirectOptions)));
            cleanup();
            return;
        }
      }

      // Remove abort event listener after response ends
      incomingMessage.once("end", function onEnd() {
        if (abortSignal) abortSignal.removeEventListener("abort", abortEventListener);
      });

      // Create a pass-through stream for the response body
      let responseBodyStream = incomingMessage.pipe(new fD2());
      const responseMetadata = {
        url: normalizedRequest.url,
        status: incomingMessage.statusCode,
        statusText: incomingMessage.statusMessage,
        headers: responseHeaders,
        size: normalizedRequest.size,
        timeout: normalizedRequest.timeout,
        counter: normalizedRequest.counter
      };
      const contentEncoding = responseHeaders.get("Content-Encoding");

      // Handle decompression if needed
      if (
        !normalizedRequest.compress ||
        normalizedRequest.method === "HEAD" ||
        contentEncoding === null ||
        incomingMessage.statusCode === 204 ||
        incomingMessage.statusCode === 304
      ) {
        responseInstance = new sX(responseBodyStream, responseMetadata);
        resolve(responseInstance);
        return;
      }

      // Decompression options for zlib
      const zlibOptions = {
        flush: $j.Z_SYNC_FLUSH,
        finishFlush: $j.Z_SYNC_FLUSH
      };

      // GZIP or X-GZIP
      if (contentEncoding === "gzip" || contentEncoding === "x-gzip") {
        responseBodyStream = responseBodyStream.pipe($j.createGunzip(zlibOptions));
        responseInstance = new sX(responseBodyStream, responseMetadata);
        resolve(responseInstance);
        return;
      }

      // DEFLATE or X-DEFLATE
      if (contentEncoding === "deflate" || contentEncoding === "x-deflate") {
        const sniffStream = incomingMessage.pipe(new fD2());
        sniffStream.once("data", function onData(chunk) {
          // Check for zlib header
          if ((chunk[0] & 15) === 8) {
            responseBodyStream = responseBodyStream.pipe($j.createInflate());
          } else {
            responseBodyStream = responseBodyStream.pipe($j.createInflateRaw());
          }
          responseInstance = new sX(responseBodyStream, responseMetadata);
          resolve(responseInstance);
        });
        sniffStream.on("end", function onEnd() {
          if (!responseInstance) {
            responseInstance = new sX(responseBodyStream, responseMetadata);
            resolve(responseInstance);
          }
        });
        return;
      }

      // Brotli
      if (contentEncoding === "br" && typeof $j.createBrotliDecompress === "function") {
        responseBodyStream = responseBodyStream.pipe($j.createBrotliDecompress());
        responseInstance = new sX(responseBodyStream, responseMetadata);
        resolve(responseInstance);
        return;
      }

      // No decompression needed
      responseInstance = new sX(responseBodyStream, responseMetadata);
      resolve(responseInstance);
    });

    // Attach additional request logic (e.g., writing body, headers, etc.)
    Jt6(clientRequest, normalizedRequest);
  });
}

module.exports = handleHttpRequest;
/**
 * Handles HTTP(s) authorization requests, including redirects, timeouts, abort signals, and decompression.
 * This function wraps the request in a Promise and manages all aspects of the HTTP(s) lifecycle,
 * including following redirects, handling aborts, managing timeouts, and decompressing responses.
 *
 * @param {object} requestInput - The input for the request (URL or request options).
 * @param {object} createRequestOptions - Additional options for the request (headers, method, etc.).
 * @returns {Promise<object>} - a promise that resolves to a response object.
 */
function handleAuthorization(requestInput, createRequestOptions) {
  if (!handleAuthorization.Promise) {
    throw new Error("native promise missing, set fetch.Promise to your favorite alternative");
  }
  // Set the global Promise reference
  initializeRequestBody.Promise = handleAuthorization.Promise;

  return new handleAuthorization.Promise(function (resolve, reject) {
    // Normalize and prepare request options
    const normalizedRequest = new oR(requestInput, createRequestOptions);
    const requestConfig = createRequestOptions(normalizedRequest);
    // Choose HTTP or HTTPS module based on protocol
    const defineGaussHighlighting = (requestConfig.protocol === "https:") ? Yt6 : vD2;
    const httpRequest = defineGaussHighlighting.request;
    const abortSignal = normalizedRequest.signal;
    let responseInstance = null;
    let timeoutId = null;

    /**
     * Handles aborting the request, cleaning up listeners and emitting errors.
     */
    const handleAbort = () => {
      const abortError = new AbortedError("The user aborted a request.");
      reject(abortError);
      if (normalizedRequest.body && normalizedRequest.body instanceof JK.Readable) {
        handleObservableError(normalizedRequest.body, abortError);
      }
      if (!responseInstance || !responseInstance.body) return;
      responseInstance.body.emit("error", abortError);
    };

    // If already aborted, handle immediately
    if (abortSignal && abortSignal.aborted) {
      handleAbort();
      return;
    }

    /**
     * Handles abort event and cleans up listeners.
     */
    const onAbort = () => {
      handleAbort();
      cleanup();
    };

    // Create the HTTP(s) request
    const clientRequest = httpRequest(requestConfig);

    /**
     * Removes listeners and clears timeout.
     */
    function cleanup() {
      clientRequest.abort();
      if (abortSignal) abortSignal.removeEventListener("abort", onAbort);
      clearTimeout(timeoutId);
    }

    // Setup abort event listener
    if (abortSignal) {
      abortSignal.addEventListener("abort", onAbort);
    }

    // Handle request timeout
    if (normalizedRequest.timeout) {
      clientRequest.once("socket", (socket) => {
        timeoutId = setTimeout(() => {
          reject(new CustomError(`network timeout at: ${normalizedRequest.url}`, "request-timeout"));
          cleanup();
        }, normalizedRequest.timeout);
      });
    }

    // Handle request errors
    clientRequest.on("error", (error) => {
      reject(new CustomError(`request to ${normalizedRequest.url} failed, reason: ${error.message}`, "system", error));
      if (responseInstance && responseInstance.body) {
        handleObservableError(responseInstance.body, error);
      }
      cleanup();
    });

    // Handle premature close for Node < v14
    if (parseInt(process.version.substring(1)) < 14) {
      clientRequest.on("socket", (socket) => {
        socket.addListener("close", (hadError) => {
          const hasDataListeners = socket.listenerCount("data") > 0;
          if (responseInstance && hasDataListeners && !hadError && !(abortSignal && abortSignal.aborted)) {
            const prematureCloseError = new Error("Premature close");
            prematureCloseError.code = "ERR_STREAM_PREMATURE_CLOSE";
            responseInstance.body.emit("error", prematureCloseError);
          }
        });
      });
    }

    // Custom error handler for streaming errors
    handlePrematureChunkedResponseClose(clientRequest, (streamError) => {
      if (abortSignal && abortSignal.aborted) return;
      if (responseInstance && responseInstance.body) {
        handleObservableError(responseInstance.body, streamError);
      }
    });

    // Handle HTTP(s) response
    clientRequest.on("response", (incomingMessage) => {
      clearTimeout(timeoutId);
      const responseHeaders = extractValidPropertiesToCollection(incomingMessage.headers);

      // Handle HTTP redirects
      if (handleAuthorization.isRedirect(incomingMessage.statusCode)) {
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
              } catch (manualError) {
                reject(manualError);
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
            // Prepare options for the next redirect request
            const nextRequestOptions = {
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
            // Remove sensitive headers if not same-origin
            if (!isSameOrSubdomain(normalizedRequest.url, redirectUrl) || !areProtocolsEqual(normalizedRequest.url, redirectUrl)) {
              for (const sensitiveHeader of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                nextRequestOptions.headers.delete(sensitiveHeader);
              }
            }
            // Prevent following redirect with a readable stream body unless allowed
            if (incomingMessage.statusCode !== 303 && normalizedRequest.body && getBodyLength(normalizedRequest) === null) {
              reject(new CustomError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              cleanup();
              return;
            }
            // Per spec, for 303 or 301/302 with POST, change to GET and drop body
            if (
              incomingMessage.statusCode === 303 ||
              ((incomingMessage.statusCode === 301 || incomingMessage.statusCode === 302) && normalizedRequest.method === "POST")
            ) {
              nextRequestOptions.method = "GET";
              nextRequestOptions.body = undefined;
              nextRequestOptions.headers.delete("content-length");
            }
            // Recursively follow the redirect
            resolve(handleAuthorization(new oR(redirectUrl, nextRequestOptions)));
            cleanup();
            return;
        }
      }

      // Remove abort event listener on end
      incomingMessage.once("end", () => {
        if (abortSignal) abortSignal.removeEventListener("abort", onAbort);
      });

      // Pipe response to a PassThrough stream
      let responseStream = incomingMessage.pipe(new fD2());
      const responseMeta = {
        url: normalizedRequest.url,
        status: incomingMessage.statusCode,
        statusText: incomingMessage.statusMessage,
        headers: responseHeaders,
        size: normalizedRequest.size,
        timeout: normalizedRequest.timeout,
        counter: normalizedRequest.counter
      };
      const contentEncoding = responseHeaders.get("Content-Encoding");

      // If no compression or not applicable, resolve immediately
      if (!normalizedRequest.compress || normalizedRequest.method === "HEAD" || contentEncoding === null || incomingMessage.statusCode === 204 || incomingMessage.statusCode === 304) {
        responseInstance = new sX(responseStream, responseMeta);
        resolve(responseInstance);
        return;
      }

      // Decompression options
      const decompressOptions = {
        flush: $j.Z_SYNC_FLUSH,
        finishFlush: $j.Z_SYNC_FLUSH
      };

      // Handle gzip encoding
      if (contentEncoding === "gzip" || contentEncoding === "x-gzip") {
        responseStream = responseStream.pipe($j.createGunzip(decompressOptions));
        responseInstance = new sX(responseStream, responseMeta);
        resolve(responseInstance);
        return;
      }

      // Handle deflate encoding
      if (contentEncoding === "deflate" || contentEncoding === "x-deflate") {
        const probeStream = incomingMessage.pipe(new fD2());
        probeStream.once("data", (chunk) => {
          // Check for zlib header
          if ((chunk[0] & 15) === 8) {
            responseStream = responseStream.pipe($j.createInflate());
          } else {
            responseStream = responseStream.pipe($j.createInflateRaw());
          }
          responseInstance = new sX(responseStream, responseMeta);
          resolve(responseInstance);
        });
        probeStream.on("end", () => {
          if (!responseInstance) {
            responseInstance = new sX(responseStream, responseMeta);
            resolve(responseInstance);
          }
        });
        return;
      }

      // Handle Brotli encoding (if supported)
      if (contentEncoding === "br" && typeof $j.createBrotliDecompress === "function") {
        responseStream = responseStream.pipe($j.createBrotliDecompress());
        responseInstance = new sX(responseStream, responseMeta);
        resolve(responseInstance);
        return;
      }

      // Default: no decompression
      responseInstance = new sX(responseStream, responseMeta);
      resolve(responseInstance);
    });

    // Finalize request (send body, etc.)
    Jt6(clientRequest, normalizedRequest);
  });
}

module.exports = handleAuthorization;
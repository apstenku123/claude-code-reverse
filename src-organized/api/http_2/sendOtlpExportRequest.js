/**
 * Sends an OTLP export request over HTTP(s), handling retries, timeouts, and errors.
 *
 * @param {Object} exportRequest - The export request object containing URL and headers.
 * @param {Object} httpAgent - The HTTP/HTTPS agent to use for the request.
 * @param {Object} compressionConfig - Compression configuration for the request body.
 * @param {Function} callback - Callback to handle the response or errors.
 * @param {number} timeoutMillis - Timeout in milliseconds for the request.
 * @returns {void}
 */
function sendOtlpExportRequest(exportRequest, httpAgent, compressionConfig, callback, timeoutMillis) {
  // Parse the export endpoint URL
  const urlObject = new URL(exportRequest.url);
  // Get the major Node.js version
  const nodeMajorVersion = Number(process.versions.node.split(".")[0]);

  // Prepare HTTP(s) request options
  const createRequestOptions = {
    hostname: urlObject.hostname,
    port: urlObject.port,
    path: urlObject.pathname,
    method: "POST",
    headers: {
      ...exportRequest.headers()
    },
    agent: httpAgent
  };

  // Choose the correct request function based on protocol
  const requestFn = urlObject.protocol === "http:" ? BO0.request : QO0.request;

  // Initiate the HTTP(s) request
  const request = requestFn(createRequestOptions, response => {
    const responseChunks = [];
    // Collect response data
    response.on("data", chunk => responseChunks.push(chunk));
    response.on("end", () => {
      // Handle successful response
      if (response.statusCode && response.statusCode < 299) {
        callback({
          status: "success",
          data: Buffer.concat(responseChunks)
        });
      // Handle retryable error
      } else if (response.statusCode && AO0.isExportRetryable(response.statusCode)) {
        callback({
          status: "retryable",
          retryInMillis: AO0.parseRetryAfterToMills(response.headers["retry-after"])
        });
      // Handle non-retryable failure
      } else {
        const exporterError = new f06.OTLPExporterError(
          response.statusMessage,
          response.statusCode,
          Buffer.concat(responseChunks).toString()
        );
        callback({
          status: "failure",
          error: exporterError
        });
      }
    });
  });

  // Set request timeout
  request.setTimeout(timeoutMillis, () => {
    request.destroy();
    callback({
      status: "failure",
      error: new Error("Request Timeout")
    });
  });

  // Handle request errors
  request.on("error", error => {
    callback({
      status: "failure",
      error
    });
  });

  // Node.js >= 14 emits 'close' on timeout, older emits 'abort'
  const timeoutEvent = nodeMajorVersion >= 14 ? "close" : "abort";
  request.on(timeoutEvent, () => {
    callback({
      status: "failure",
      error: new Error("Request timed out")
    });
  });

  // Handle request body compression and send
  IO0(request, exportRequest.compression, compressionConfig, compressionError => {
    callback({
      status: "failure",
      error: compressionError
    });
  });
}

module.exports = sendOtlpExportRequest;
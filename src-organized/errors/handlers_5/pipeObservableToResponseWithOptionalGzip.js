/**
 * Pipes an observable stream to an HTTP response, optionally compressing the output with gzip.
 *
 * @param {object} response - The HTTP response object to pipe data into.
 * @param {string} encodingType - The encoding type to use (e.g., 'gzip' to enable gzip compression).
 * @param {object} observableStream - The observable stream to pipe from (result of b06(subscription)).
 * @param {function} errorHandler - Error handler function to call on stream errors.
 * @returns {void}
 */
function pipeObservableToResponseWithOptionalGzip(response, encodingType, observableStream, errorHandler) {
  // Create a readable stream from the observable
  let readableStream = b06(observableStream);

  // If gzip encoding is requested, set the header and pipe through gzip transform
  if (encodingType === "gzip") {
    response.setHeader("Content-Encoding", "gzip");
    // Pipe through gzip transform, handling errors
    readableStream = readableStream
      .on("error", errorHandler)
      .pipe(y06.createGzip())
      .on("error", errorHandler);
  }

  // Pipe the (possibly transformed) stream to the response, handling errors
  readableStream.pipe(response).on("error", errorHandler);
}

module.exports = pipeObservableToResponseWithOptionalGzip;
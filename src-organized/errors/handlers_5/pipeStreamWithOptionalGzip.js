/**
 * Pipes a readable stream to a writable stream, optionally compressing the output with gzip.
 * Sets appropriate headers and handles errors during the streaming process.
 *
 * @param {http.ServerResponse} response - The HTTP response object to write the output to.
 * @param {string} contentEncoding - The desired content encoding (e.g., 'gzip' or undefined).
 * @param {stream.Readable} inputStream - The readable stream to pipe from.
 * @param {function(Error):void} errorHandler - Callback to handle streaming errors.
 * @returns {void}
 */
function pipeStreamWithOptionalGzip(response, contentEncoding, inputStream, errorHandler) {
  // Create a readable stream from the input
  let readableStream = b06(inputStream);

  // If gzip encoding is requested, set the header and pipe through gzip transform
  if (contentEncoding === "gzip") {
    response.setHeader("Content-Encoding", "gzip");
    // Attach error handler to the readable stream, then pipe through gzip
    readableStream = readableStream
      .on("error", errorHandler)
      .pipe(y06.createGzip())
      .on("error", errorHandler);
  }

  // Pipe the (possibly gzipped) stream to the response, handling errors
  readableStream.pipe(response).on("error", errorHandler);
}

module.exports = pipeStreamWithOptionalGzip;
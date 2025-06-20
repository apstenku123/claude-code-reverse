/**
 * Handles piping or writing the body of a subscription to a writable stream or response.
 *
 * Depending on the type of the body, this function will:
 *   - End the writable if the body is null
 *   - Pipe a stream if the body is a streamable object
 *   - Write a buffer directly
 *   - Pipe the body if isBlobOrFileLikeObject is a readable stream
 *
 * @param {WritableStream} writableStream - The writable stream or response to write or pipe data to.
 * @param {Object} subscriptionConfig - The configuration object containing the body to process.
 * @returns {void}
 */
function handleSubscriptionBody(writableStream, subscriptionConfig) {
  const subscriptionBody = subscriptionConfig.body;

  if (subscriptionBody === null) {
    // If the body is null, simply end the writable stream
    writableStream.end();
  } else if (isBlobOrFileLikeObject(subscriptionBody)) {
    // If the body is an iterable (e.g., a streamable object), pipe its stream to the writable
    subscriptionBody.stream().pipe(writableStream);
  } else if (Buffer.isBuffer(subscriptionBody)) {
    // If the body is a Buffer, write isBlobOrFileLikeObject directly and end the writable
    writableStream.write(subscriptionBody);
    writableStream.end();
  } else {
    // Otherwise, assume the body is a readable stream and pipe isBlobOrFileLikeObject
    subscriptionBody.pipe(writableStream);
  }
}

module.exports = handleSubscriptionBody;

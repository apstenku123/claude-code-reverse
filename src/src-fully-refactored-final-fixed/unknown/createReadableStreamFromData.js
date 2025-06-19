/**
 * Creates a Node.js Readable stream containing the provided data as its only chunk.
 *
 * @param {any} data - The data to be pushed into the Readable stream.
 * @returns {Readable} a Readable stream with the data as its content, followed by the end of stream.
 */
function createReadableStreamFromData(data) {
  // Create a new Readable stream instance from the x06 module
  const readableStream = new x06.Readable();

  // Push the provided data into the stream
  readableStream.push(data);

  // Signal the end of the stream by pushing null
  readableStream.push(null);

  // Return the constructed stream
  return readableStream;
}

module.exports = createReadableStreamFromData;
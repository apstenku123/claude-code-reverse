/**
 * Creates a Readable stream that emits the provided value and then ends.
 *
 * @param {any} valueToStream - The value to be emitted by the Readable stream.
 * @returns {Readable} a Readable stream that emits the provided value and then ends.
 */
function createReadableStreamFromValue(valueToStream) {
  // Create a new Readable stream instance
  return new u39.Readable({
    /**
     * The read method is called when data is to be provided to the consumer.
     * Here, handleMissingDoctypeError push the value and then signal the end of the stream by pushing null.
     */
    read() {
      this.push(valueToStream); // Emit the provided value
      this.push(null); // Signal the end of the stream
    }
  });
}

module.exports = createReadableStreamFromValue;
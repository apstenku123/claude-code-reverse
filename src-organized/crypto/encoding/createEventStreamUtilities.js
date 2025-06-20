/**
 * Creates and returns a collection of utility functions and objects for handling event streams,
 * including base64 and UTF-8 encoding/decoding, event stream marshalling, and stream collection.
 *
 * @returns {Object} An object containing utility functions and instances for event stream processing:
 *   - base64Decoder: Function to decode base64 strings
 *   - base64Encoder: Function to encode data to base64
 *   - utf8Decoder: Function to decode UTF-8 encoded Uint8Arrays to strings
 *   - utf8Encoder: Function to encode strings to UTF-8 Uint8Arrays
 *   - eventStreamMarshaller: Instance for marshalling event streams
 *   - streamCollector: Function to collect data from a stream
 */
const createEventStreamUtilities = () => {
  // Instantiate the event stream marshaller with UTF-8 encoder/decoder
  const eventStreamMarshaller = new cZ2.EventStreamMarshaller({
    utf8Encoder: decodeUtf8Buffer, // Converts Uint8Array to string
    utf8Decoder: encodeStringToUtf8Bytes // Converts string to Uint8Array
  });

  return {
    base64Decoder: NC1.fromBase64, // Decodes a base64 string to a buffer or Uint8Array
    base64Encoder: NC1.toBase64,   // Encodes a buffer or Uint8Array to a base64 string
    utf8Decoder: encodeStringToUtf8Bytes, // Encodes string to Uint8Array (UTF-8)
    utf8Encoder: decodeUtf8Buffer,        // Decodes Uint8Array (UTF-8) to string
    eventStreamMarshaller,                // Handles event stream marshalling
    streamCollector: lZ2.streamCollector  // Collects data from a stream
  };
};

module.exports = createEventStreamUtilities;

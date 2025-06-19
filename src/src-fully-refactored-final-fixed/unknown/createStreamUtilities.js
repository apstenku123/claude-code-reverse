/**
 * Creates and returns a set of utility functions and objects for handling base64 and UTF-8 encoding/decoding, 
 * event stream marshalling, and stream collection. This is typically used to facilitate data transformation and 
 * streaming operations in applications that process event streams.
 *
 * @returns {Object} An object containing encoding/decoding utilities, an event stream marshaller, and a stream collector.
 */
const createStreamUtilities = () => {
  // Instantiate the event stream marshaller with UTF-8 encoder/decoder
  const eventStreamMarshaller = new cZ2.EventStreamMarshaller({
    utf8Encoder: Wa1, // Function to encode UTF-8
    utf8Decoder: pZ2  // Function to decode UTF-8
  });

  return {
    base64Decoder: NC1.fromBase64,         // Function to decode base64 strings
    base64Encoder: NC1.toBase64,           // Function to encode to base64
    utf8Decoder: pZ2,                      // Function to decode UTF-8
    utf8Encoder: Wa1,                      // Function to encode UTF-8
    eventStreamMarshaller: eventStreamMarshaller, // Event stream marshaller instance
    streamCollector: lZ2.streamCollector   // Function to collect stream data
  };
};

module.exports = createStreamUtilities;

/**
 * Creates a new NonRecordingSpan instance using the provided span context.
 *
 * @param {object} spanContext - The context object containing span information.
 * @returns {NonRecordingSpan} a new NonRecordingSpan instance initialized with the given context.
 */
function createNonRecordingSpan(spanContext) {
  // Instantiate a NonRecordingSpan with the provided span context
  return new lf4.NonRecordingSpan(spanContext);
}

module.exports = createNonRecordingSpan;
/**
 * Wraps the provided observable with a NonRecordingSpan context using the given configuration.
 *
 * @param {Observable} sourceObservable - The observable to be wrapped.
 * @param {object} spanConfig - Configuration for the NonRecordingSpan.
 * @returns {any} The result of applying qD0 to the observable and the new NonRecordingSpan.
 */
function wrapWithNonRecordingSpan(sourceObservable, spanConfig) {
  // Create a new NonRecordingSpan with the provided configuration
  const nonRecordingSpan = new xf4.NonRecordingSpan(spanConfig);
  // Pass the observable and the span to qD0 for further processing
  return qD0(sourceObservable, nonRecordingSpan);
}

module.exports = wrapWithNonRecordingSpan;
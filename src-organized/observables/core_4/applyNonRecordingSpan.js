/**
 * Applies a NonRecordingSpan to the provided observable source.
 *
 * @param {Observable} sourceObservable - The observable to which the span will be applied.
 * @param {object} spanConfig - Configuration or context for the NonRecordingSpan.
 * @returns {any} The result of applying the NonRecordingSpan to the observable via qD0.
 */
function applyNonRecordingSpan(sourceObservable, spanConfig) {
  // Create a new NonRecordingSpan with the provided configuration/context
  const nonRecordingSpan = new xf4.NonRecordingSpan(spanConfig);
  // Apply the NonRecordingSpan to the source observable using qD0
  return qD0(sourceObservable, nonRecordingSpan);
}

module.exports = applyNonRecordingSpan;
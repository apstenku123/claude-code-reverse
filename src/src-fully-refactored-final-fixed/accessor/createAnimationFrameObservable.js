/**
 * Creates an Observable that emits animation frame timestamps and elapsed time between frames.
 *
 * @param {Object} [timestampProvider] - Optional custom timestamp provider with a `now()` method. If not provided, uses the default performance timestamp provider.
 * @returns {Observable<{timestamp: number, elapsed: number}>} Observable emitting objects with the current timestamp and elapsed time since subscription.
 */
function createAnimationFrameObservable(timestampProvider) {
  return new H$9.Observable(function (subscriber) {
    // Use the provided timestamp provider or fall back to the default
    const provider = timestampProvider || z$9.performanceTimestampProvider;
    // Capture the time when the subscription starts
    const startTime = provider.now();
    // Store the current animation frame request updateSnapshotAndNotify
    let animationFrameId = 0;

    /**
     * Schedules the next animation frame and emits the timestamp and elapsed time.
     */
    const scheduleNextFrame = () => {
      if (!subscriber.closed) {
        animationFrameId = kzA.animationFrameProvider.requestAnimationFrame(function (animationFrameTimestamp) {
          animationFrameId = 0;
          const currentTime = provider.now();
          subscriber.next({
            // If a custom provider is used, use its timestamp; otherwise, use the animation frame timestamp
            timestamp: timestampProvider ? currentTime : animationFrameTimestamp,
            elapsed: currentTime - startTime
          });
          scheduleNextFrame();
        });
      }
    };

    // Start the animation frame loop
    scheduleNextFrame();

    // Teardown logic: cancel the animation frame if unsubscribed
    return function unsubscribe() {
      if (animationFrameId) {
        kzA.animationFrameProvider.cancelAnimationFrame(animationFrameId);
      }
    };
  });
}

module.exports = createAnimationFrameObservable;
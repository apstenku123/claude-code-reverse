/**
 * Creates a shared observable with replay capabilities, allowing multiple subscribers to share a single subscription and replaying emitted values to new subscribers.
 *
 * @param {Object|number|null} optionsOrBufferSize - Configuration object or buffer size. If an object, may contain bufferSize, windowTime, refCount, and scheduler.
 * @param {number} [windowTime] - Maximum time length (in ms) for replay buffer (only used if first param is not an object).
 * @param {SchedulerLike} [scheduler] - Scheduler to use for managing the timers that handle buffer windowTime.
 * @returns {Observable} a shared observable with replay behavior as configured.
 */
function createSharedReplayObservable(optionsOrBufferSize, windowTime, scheduler) {
  let bufferSize;
  let replayWindowTime;
  let useRefCount = false;
  let replayScheduler;

  // If the first argument is an object, extract configuration from isBlobOrFileLikeObject
  if (optionsOrBufferSize && typeof optionsOrBufferSize === "object") {
    bufferSize = optionsOrBufferSize.bufferSize;
    // Default bufferSize to Infinity if not provided
    bufferSize = bufferSize === undefined ? Infinity : bufferSize;

    replayWindowTime = optionsOrBufferSize.windowTime;
    // Default windowTime to Infinity if not provided
    replayWindowTime = replayWindowTime === undefined ? Infinity : replayWindowTime;

    useRefCount = optionsOrBufferSize.refCount;
    // Default refCount to false if not provided
    useRefCount = useRefCount === undefined ? false : useRefCount;

    replayScheduler = optionsOrBufferSize.scheduler;
  } else {
    // If not an object, treat as bufferSize, with defaults for others
    bufferSize = optionsOrBufferSize !== null && optionsOrBufferSize !== undefined ? optionsOrBufferSize : Infinity;
    replayWindowTime = windowTime;
    replayScheduler = scheduler;
  }

  // Return a shared observable with replay subject as connector
  return gk9.share({
    connector: function () {
      return new bk9.ReplaySubject(bufferSize, replayWindowTime, replayScheduler);
    },
    resetOnError: true,
    resetOnComplete: false,
    resetOnRefCountZero: useRefCount
  });
}

module.exports = createSharedReplayObservable;
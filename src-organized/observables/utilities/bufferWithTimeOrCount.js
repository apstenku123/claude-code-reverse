/**
 * Buffers values from the source observable and emits them either after a specified time interval or when the buffer reaches a specified size.
 *
 * @param {Observable} sourceObservable - The source observable to buffer values from.
 * @param {number} [bufferTimeSpan=null] - The time interval (in ms) to wait before emitting the buffer. If null, emits immediately.
 * @param {number} [bufferMaxSize=Infinity] - The maximum number of items to buffer before emitting.
 * @param {Scheduler} [scheduler=asyncScheduler] - The scheduler to use for managing buffer timing.
 * @returns {Observable} An observable that emits buffered arrays of values from the source.
 */
function bufferWithTimeOrCount(sourceObservable, bufferTimeSpan = null, bufferMaxSize = Infinity, scheduler = vT9.asyncScheduler) {
  return yT9.operate(function (source, subscriber) {
    /**
     * Holds all active buffers and their subscriptions.
     * Each buffer is an object: { buffer: [], subs: Subscription }
     */
    let activeBuffers = [];
    // Indicates if the buffer should start immediately (if no initial delay)
    let shouldStartImmediately = bufferTimeSpan === null || bufferTimeSpan < 0;

    /**
     * Emits and cleans up a buffer.
     * @param {Object} bufferObj - The buffer object to emit and clean up.
     */
    const emitBuffer = (bufferObj) => {
      const { buffer, subs } = bufferObj;
      subs.unsubscribe();
      fT9.arrRemove(activeBuffers, bufferObj);
      subscriber.next(buffer);
      // If source has completed, flush remaining buffers
      if (shouldStartImmediately) {
        flushBuffer();
      }
    };

    /**
     * Creates a new buffer and schedules its emission.
     */
    const flushBuffer = () => {
      if (activeBuffers) {
        const bufferSubscription = new kT9.Subscription();
        subscriber.add(bufferSubscription);
        const buffer = [];
        const bufferObj = { buffer, subs: bufferSubscription };
        activeBuffers.push(bufferObj);
        // Schedule buffer emission after bufferTimeSpan
        a$a.executeSchedule(
          bufferSubscription,
          scheduler,
          () => emitBuffer(bufferObj),
          sourceObservable
        );
      }
    };

    // If bufferTimeSpan is set, schedule buffer creation after delay, else start immediately
    if (bufferTimeSpan !== null && bufferTimeSpan >= 0) {
      a$a.executeSchedule(subscriber, scheduler, flushBuffer, bufferTimeSpan, true);
    } else {
      shouldStartImmediately = true;
    }
    flushBuffer();

    // Operator subscriber to handle source emissions
    const operatorSubscriber = xT9.createOperatorSubscriber(
      subscriber,
      (value) => {
        // Copy active buffers to avoid mutation during iteration
        const buffersSnapshot = activeBuffers.slice();
        try {
          for (const bufferObj of buffersSnapshot) {
            const { buffer } = bufferObj;
            buffer.push(value);
            // If buffer reaches max size, emit isBlobOrFileLikeObject
            if (buffer.length >= bufferMaxSize) {
              emitBuffer(bufferObj);
            }
          }
        } catch (error) {
          throw error;
        }
      },
      () => {
        // On complete, emit all remaining buffers
        while (activeBuffers?.length) {
          subscriber.next(activeBuffers.shift().buffer);
        }
        operatorSubscriber?.unsubscribe();
        subscriber.complete();
        subscriber.unsubscribe();
      },
      undefined,
      () => {
        // Cleanup on teardown
        activeBuffers = null;
      }
    );
    source.subscribe(operatorSubscriber);
  });
}

module.exports = bufferWithTimeOrCount;
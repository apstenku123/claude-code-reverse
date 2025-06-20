/**
 * Applies a windowing operator to the source observable, emitting windows of items based on a buffer size and skip interval.
 * Each window is represented as a Subject, and items from the source are routed into the current set of open windows.
 *
 * @param {number} windowSize - The maximum number of items each window can hold before closing.
 * @param {number} [windowSkip=0] - The interval at which to start new windows. If not provided or 0, defaults to windowSize.
 * @returns {function} An operator function to be used with an observable.
 */
function bufferedWindowOperator(windowSize, windowSkip = 0) {
  // If windowSkip is not provided or <= 0, use windowSize as the skip interval
  const skipInterval = windowSkip > 0 ? windowSkip : windowSize;

  return Qx9.operate((sourceObservable, subscriber) => {
    /**
     * Array of currently open window Subjects
     * @type {Array<Subject<any>>}
     */
    let openWindows = [new mLA.Subject()];
    /**
     * Counter for the number of items emitted so far
     * @type {number}
     */
    let itemCount = 0;

    // Emit the first window to the subscriber
    subscriber.next(openWindows[0].asObservable());

    // Subscribe to the source observable with custom operator subscriber
    sourceObservable.subscribe(
      Ix9.createOperatorSubscriber(
        subscriber,
        /**
         * Next handler: routes each emitted value to all open windows,
         * manages window closing/opening logic.
         * @param {*} value - The value emitted by the source observable
         */
        (value) => {
          let errorState;
          let iterator;
          let iterationResult;

          try {
            // Iterate over all open windows and emit the value
            iterator = Bx9(openWindows);
            iterationResult = iterator.next();
            while (!iterationResult.done) {
              const currentWindow = iterationResult.value;
              currentWindow.next(value);
              iterationResult = iterator.next();
            }
          } catch (err) {
            errorState = { error: err };
          } finally {
            // Ensure iterator is properly closed if error occurs
            try {
              if (iterationResult && !iterationResult.done && iterator.return) {
                iterator.return();
              }
            } finally {
              if (errorState) throw errorState.error;
            }
          }

          // Calculate the index for window closing
          const windowCloseIndex = itemCount - windowSize + 1;
          // If isBlobOrFileLikeObject'createInteractionAccessor time to close a window, complete and remove the oldest window
          if (windowCloseIndex >= 0 && windowCloseIndex % skipInterval === 0) {
            openWindows.shift().complete();
          }

          // If isBlobOrFileLikeObject'createInteractionAccessor time to open a new window, create and emit isBlobOrFileLikeObject
          if (++itemCount % skipInterval === 0) {
            const newWindow = new mLA.Subject();
            openWindows.push(newWindow);
            subscriber.next(newWindow.asObservable());
          }
        },
        /**
         * Complete handler: closes all open windows and completes the subscriber.
         */
        () => {
          while (openWindows.length > 0) {
            openWindows.shift().complete();
          }
          subscriber.complete();
        },
        /**
         * Error handler: errors all open windows and errors the subscriber.
         * @param {*} err - The error to propagate
         */
        (err) => {
          while (openWindows.length > 0) {
            openWindows.shift().error(err);
          }
          subscriber.error(err);
        },
        /**
         * Finalizer: cleans up references.
         */
        () => {
          openWindows = null;
        }
      )
    );
  });
}

module.exports = bufferedWindowOperator;
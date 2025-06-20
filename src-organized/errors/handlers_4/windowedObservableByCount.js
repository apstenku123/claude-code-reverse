/**
 * Creates an operator that splits the source observable into windows (sub-observables) of a specified size.
 * Each window emits items from the source observable and completes when the window size is reached.
 *
 * @param {number} windowSize - The number of items each window should emit before completing.
 * @param {number} [startWindowEvery=windowSize] - Interval at which to start a new window. Defaults to windowSize (non-overlapping windows).
 * @returns {function} Operator function to be used with an observable.
 */
function windowedObservableByCount(windowSize, startWindowEvery) {
  if (startWindowEvery === undefined) startWindowEvery = 0;
  // If startWindowEvery is not provided or <= 0, default to windowSize (non-overlapping windows)
  const windowCreationInterval = startWindowEvery > 0 ? startWindowEvery : windowSize;

  return Qx9.operate((sourceObservable, subscriber) => {
    // Array of currently open window Subjects
    let openWindows = [new mLA.Subject()];
    // Counter for the number of items emitted
    let itemCount = 0;

    // Emit the first window as an observable
    subscriber.next(openWindows[0].asObservable());

    // Subscribe to the source observable
    sourceObservable.subscribe(
      Ix9.createOperatorSubscriber(
        subscriber,
        (value) => {
          // Emit the value to all open windows
          let errorState;
          let iterator, iterationResult;
          try {
            iterator = Bx9(openWindows);
            iterationResult = iterator.next();
            while (!iterationResult.done) {
              const windowSubject = iterationResult.value;
              windowSubject.next(value);
              iterationResult = iterator.next();
            }
          } catch (err) {
            errorState = { error: err };
          } finally {
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
          // Complete and remove the oldest window if isBlobOrFileLikeObject'createInteractionAccessor time
          if (windowCloseIndex >= 0 && windowCloseIndex % windowCreationInterval === 0) {
            openWindows.shift().complete();
          }

          // Start a new window if needed
          if (++itemCount % windowCreationInterval === 0) {
            const newWindow = new mLA.Subject();
            openWindows.push(newWindow);
            subscriber.next(newWindow.asObservable());
          }
        },
        // On complete: complete all open windows and the subscriber
        () => {
          while (openWindows.length > 0) openWindows.shift().complete();
          subscriber.complete();
        },
        // On error: error all open windows and the subscriber
        (err) => {
          while (openWindows.length > 0) openWindows.shift().error(err);
          subscriber.error(err);
        },
        // On finalize: clean up references
        () => {
          openWindows = null;
        }
      )
    );
  });
}

module.exports = windowedObservableByCount;
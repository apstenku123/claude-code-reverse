/**
 * Applies an operator to a source observable, managing a set of inner subjects and subscriptions
 * for each emission from the source. It handles errors, completion, and unsubscription for all
 * inner subjects, and allows for custom activity logic via the provided activitySelector function.
 *
 * @param {Observable} sourceObservable - The source observable to operate on.
 * @param {Function} activitySelector - Function that receives a value from the source and returns an observable.
 * @returns {Function} An operator function to be used with an observable pipeline.
 */
function operateOnSourceWithActivityHandling(sourceObservable, activitySelector) {
  return zx9.operate(function (outerSubscription, destinationObserver) {
    // Array to keep track of all active inner subjects
    const activeSubjects = [];

    /**
     * Handles errors by propagating to all active subjects and the destination observer
     * @param {any} error - The error to propagate
     */
    const handleError = (error) => {
      while (activeSubjects.length > 0) {
        activeSubjects.shift().error(error);
      }
      destinationObserver.error(error);
    };

    // Subscribe to the source observable
    cLA.innerFrom(sourceObservable).subscribe(
      aR1.createOperatorSubscriber(
        destinationObserver,
        (sourceValue) => {
          // Create a new subject for this emission
          const innerSubject = new Kx9.Subject();
          activeSubjects.push(innerSubject);

          // Manage the subscription for the inner observable
          const innerSubscription = new Hx9.Subscription();

          /**
           * Cleanup function: removes subject, completes isBlobOrFileLikeObject, and unsubscribes
           */
          const cleanup = () => {
            wx9.arrRemove(activeSubjects, innerSubject);
            innerSubject.complete();
            innerSubscription.unsubscribe();
          };

          let innerObservable;
          try {
            // Get the inner observable using the activitySelector
            innerObservable = cLA.innerFrom(activitySelector(sourceValue));
          } catch (err) {
            handleError(err);
            return;
          }

          // Emit the subject as an observable to the destination
          destinationObserver.next(innerSubject.asObservable());

          // Subscribe to the inner observable
          innerSubscription.add(
            innerObservable.subscribe(
              aR1.createOperatorSubscriber(
                destinationObserver,
                cleanup, // onNext: cleanup after emission
                lLA.noop, // onComplete: no-op
                handleError // onError
              )
            )
          );
        },
        lLA.noop // onComplete: no-op
      )
    );

    // Subscribe to the outer subscription
    outerSubscription.subscribe(
      aR1.createOperatorSubscriber(
        destinationObserver,
        (outerValue) => {
          // Clone the activeSubjects array to avoid mutation during iteration
          const subjectsSnapshot = activeSubjects.slice();
          let errorWrapper;
          let iterator, iterationResult;
          try {
            iterator = Vx9(subjectsSnapshot);
            iterationResult = iterator.next();
            while (!iterationResult.done) {
              const subject = iterationResult.value;
              subject.next(outerValue);
              iterationResult = iterator.next();
            }
          } catch (err) {
            errorWrapper = { error: err };
          } finally {
            try {
              // Ensure iterator cleanup if needed
              if (iterationResult && !iterationResult.done && iterator.return) {
                iterator.return();
              }
            } finally {
              if (errorWrapper) throw errorWrapper.error;
            }
          }
        },
        () => {
          // On complete: complete all active subjects and the destination
          while (activeSubjects.length > 0) {
            activeSubjects.shift().complete();
          }
          destinationObserver.complete();
        },
        handleError,
        () => {
          // On unsubscribe: unsubscribe all active subjects
          while (activeSubjects.length > 0) {
            activeSubjects.shift().unsubscribe();
          }
        }
      )
    );
  });
}

module.exports = operateOnSourceWithActivityHandling;
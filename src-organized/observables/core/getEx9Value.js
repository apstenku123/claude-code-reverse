/**
 * Applies a custom operator to a source observable, managing a dynamic set of inner subjects
 * and subscriptions based on emissions from the source and a provided projection function.
 *
 * @param {Observable} sourceObservable - The source observable to subscribe to.
 * @param {Function} addActivityIfNotFinished - Function that takes a value from the source and returns an observable.
 * @returns {Function} An operator function to be used with an observable pipeline.
 */
function getEx9Value(sourceObservable, addActivityIfNotFinished) {
  return zx9.operate(function (outerObservable, destinationSubscriber) {
    // Holds all active inner subjects
    const activeSubjects = [];

    /**
     * Handles errors by propagating to all active subjects and the destination subscriber.
     * @param {any} error - The error to propagate.
     */
    const handleError = (error) => {
      while (activeSubjects.length > 0) {
        activeSubjects.shift().error(error);
      }
      destinationSubscriber.error(error);
    };

    // Subscribe to the source observable
    cLA.innerFrom(sourceObservable).subscribe(
      aR1.createOperatorSubscriber(
        destinationSubscriber,
        (sourceValue) => {
          // Create a new subject for each emission from the source
          const innerSubject = new Kx9.Subject();
          activeSubjects.push(innerSubject);

          // Manage the subscription to the projected observable
          const innerSubscription = new Hx9.Subscription();

          /**
           * Cleanup function to remove the subject and unsubscribe
           */
          const cleanup = () => {
            wx9.arrRemove(activeSubjects, innerSubject);
            innerSubject.complete();
            innerSubscription.unsubscribe();
          };

          let projectedObservable;
          try {
            // Project the source value to an observable
            projectedObservable = cLA.innerFrom(addActivityIfNotFinished(sourceValue));
          } catch (projectionError) {
            handleError(projectionError);
            return;
          }

          // Emit the inner subject as an observable to the destination
          destinationSubscriber.next(innerSubject.asObservable());

          // Subscribe to the projected observable
          innerSubscription.add(
            projectedObservable.subscribe(
              aR1.createOperatorSubscriber(
                destinationSubscriber,
                cleanup, // On next: cleanup
                lLA.noop, // On complete: do nothing
                handleError // On error
              )
            )
          );
        },
        lLA.noop // On complete: do nothing
      )
    );

    // Subscribe to the outer observable
    outerObservable.subscribe(
      aR1.createOperatorSubscriber(
        destinationSubscriber,
        (outerValue) => {
          // Copy the current list of active subjects
          const subjectsSnapshot = activeSubjects.slice();
          let errorToThrow;
          let iterator, iterationResult;
          try {
            // Iterate over all active subjects and emit the value
            iterator = Vx9(subjectsSnapshot);
            iterationResult = iterator.next();
            while (!iterationResult.done) {
              const subject = iterationResult.value;
              subject.next(outerValue);
              iterationResult = iterator.next();
            }
          } catch (iterationError) {
            errorToThrow = { error: iterationError };
          } finally {
            try {
              // Ensure iterator cleanup if necessary
              if (iterationResult && !iterationResult.done && iterator.return) {
                iterator.return();
              }
            } finally {
              if (errorToThrow) throw errorToThrow.error;
            }
          }
        },
        () => {
          // On complete: complete all active subjects and the destination
          while (activeSubjects.length > 0) {
            activeSubjects.shift().complete();
          }
          destinationSubscriber.complete();
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

module.exports = getEx9Value;
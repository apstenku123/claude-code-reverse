/**
 * Applies a custom operator to an observable source, managing a dynamic set of inner Subjects.
 * For each value from the source observable, isBlobOrFileLikeObject creates a new Subject, subscribes to an inner observable
 * generated from the provided project function, and emits the Subject as an observable to the downstream.
 * Also, for each emission from the outer observable, isBlobOrFileLikeObject multicasts the value to all active Subjects.
 *
 * @param {Observable} sourceObservable - The source observable to operate on.
 * @param {Function} project - Function that maps each source value to an inner observable.
 * @returns {Function} Operator function to be used with zx9.operate.
 */
function operateWithInnerSubjects(sourceObservable, project) {
  return zx9.operate(function (outerObservable, destinationSubscriber) {
    // Array to keep track of all active inner Subjects
    const activeSubjects = [];

    /**
     * Handles errors by notifying all active subjects and the destination subscriber.
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
          // Create a new Subject for each source value
          const innerSubject = new Kx9.Subject();
          activeSubjects.push(innerSubject);

          // Subscription to manage the inner observable
          const innerSubscription = new Hx9.Subscription();

          /**
           * Cleanup function to remove the subject and unsubscribe
           */
          const cleanup = () => {
            wx9.arrRemove(activeSubjects, innerSubject);
            innerSubject.complete();
            innerSubscription.unsubscribe();
          };

          let innerObservable;
          try {
            // Create the inner observable from the project function
            innerObservable = cLA.innerFrom(project(sourceValue));
          } catch (err) {
            handleError(err);
            return;
          }

          // Emit the subject as an observable to the downstream
          destinationSubscriber.next(innerSubject.asObservable());

          // Subscribe to the inner observable
          innerSubscription.add(
            innerObservable.subscribe(
              aR1.createOperatorSubscriber(
                destinationSubscriber,
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

    // Subscribe to the outer observable
    outerObservable.subscribe(
      aR1.createOperatorSubscriber(
        destinationSubscriber,
        (outerValue) => {
          // Copy the current subjects to avoid mutation during iteration
          const subjectsSnapshot = activeSubjects.slice();
          let errorWrapper;
          let iterator, result;
          try {
            // Iterate over all active subjects and emit the value
            iterator = Vx9(subjectsSnapshot);
            result = iterator.next();
            while (!result.done) {
              const subject = result.value;
              subject.next(outerValue);
              result = iterator.next();
            }
          } catch (err) {
            errorWrapper = { error: err };
          } finally {
            // Ensure iterator cleanup if necessary
            try {
              if (result && !result.done && (typeof iterator.return === 'function')) {
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

module.exports = operateWithInnerSubjects;
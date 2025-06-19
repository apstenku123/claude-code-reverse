/**
 * Creates a windowed observable that emits windows of values from the source observable.
 * Each window is a Subject that collects values for a specified duration or count, then completes.
 *
 * @param {Observable} sourceObservable - The source observable to window.
 * @param {number} [windowTimeOrCount=null] - Optional: Time (ms) to wait before starting the first window. If null or negative, windows start immediately.
 * @param {number} [windowMaxCount=Infinity] - Optional: Maximum number of values per window before isBlobOrFileLikeObject closes.
 * @returns {Observable} An observable emitting windowed observables (Subjects) of values from the source.
 */
function createWindowedObservable(sourceObservable, windowTimeOrCount = null, windowMaxCount = Infinity) {
  // Collect additional arguments
  const args = Array.prototype.slice.call(arguments, 1);

  // Determine the scheduler to use
  const scheduler = (Xx9.popScheduler(args) !== null && Xx9.popScheduler(args) !== undefined)
    ? Xx9.popScheduler(args)
    : Dx9.asyncScheduler;

  // Determine the time to wait before starting the first window
  const startWindowDelay = (args[0] !== null && args[0] !== undefined) ? args[0] : null;

  // Determine the maximum number of items per window
  const maxWindowSize = args[1] || Infinity;

  // Use the operate utility to create the operator
  return Wx9.operate(function (source, subscriber) {
    /**
     * Array of active window objects:
     * { window: Subject, subs: Subscription, seen: number }
     */
    let activeWindows = [];
    // Indicates if windows should start immediately
    let startWindowsImmediately = false;

    /**
     * Closes and cleans up a window
     * @param {Object} windowObj - The window object to close
     */
    const closeWindow = function (windowObj) {
      const { window, subs } = windowObj;
      window.complete();
      subs.unsubscribe();
      Jx9.arrRemove(activeWindows, windowObj);
      // If windows should start immediately, open a new one
      if (startWindowsImmediately) {
        openWindow();
      }
    };

    /**
     * Opens a new window and schedules its closure
     */
    const openWindow = function () {
      if (activeWindows) {
        const windowSubscription = new Yx9.Subscription();
        subscriber.add(windowSubscription);
        const windowSubject = new Zx9.Subject();
        const windowObj = {
          window: windowSubject,
          subs: windowSubscription,
          seen: 0
        };
        activeWindows.push(windowObj);
        subscriber.next(windowSubject.asObservable());
        // Schedule window closure after the specified duration
        dLA.executeSchedule(
          windowSubscription,
          scheduler,
          function () {
            return closeWindow(windowObj);
          },
          sourceObservable
        );
      }
    };

    // If a start delay is specified and non-negative, schedule the first window
    if (startWindowDelay !== null && startWindowDelay >= 0) {
      dLA.executeSchedule(subscriber, scheduler, openWindow, startWindowDelay, true);
    } else {
      // Otherwise, start windows immediately
      startWindowsImmediately = true;
    }
    // Always open the first window
    openWindow();

    /**
     * Helper to apply a function to all active windows
     * @param {Function} fn - Function to apply to each window object
     */
    const forEachWindow = function (fn) {
      activeWindows.slice().forEach(fn);
    };

    /**
     * Helper to complete or error all windows and the subscriber, then unsubscribe
     * @param {Function} action - Function to call on each window and the subscriber
     */
    const finalizeAll = function (action) {
      forEachWindow(function (windowObj) {
        action(windowObj.window);
      });
      action(subscriber);
      subscriber.unsubscribe();
    };

    // Subscribe to the source observable with a custom operator subscriber
    return source.subscribe(
      Fx9.createOperatorSubscriber(
        subscriber,
        // Next handler: push value to all windows, close window if max count reached
        function (value) {
          forEachWindow(function (windowObj) {
            windowObj.window.next(value);
            if (maxWindowSize <= ++windowObj.seen) {
              closeWindow(windowObj);
            }
          });
        },
        // Complete handler: complete all windows and the subscriber
        function () {
          return finalizeAll(function (target) {
            return target.complete();
          });
        },
        // Error handler: error all windows and the subscriber
        function (err) {
          return finalizeAll(function (target) {
            return target.error(err);
          });
        }
      )
    ),
    // Cleanup function: clear active windows reference
    function () {
      activeWindows = null;
    };
  });
}

module.exports = createWindowedObservable;
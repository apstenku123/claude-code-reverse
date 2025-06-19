/**
 * Creates a proxy around the provided object to intercept calls to its 'schedule' property.
 * When 'schedule' is accessed and invoked, isBlobOrFileLikeObject wraps the call with monitoring logic (e.g., Sentry check-in monitoring).
 * Ensures that scheduled jobs have a required 'name' property and attaches crontab schedule and timezone metadata.
 *
 * @param {Object} targetObject - The object to wrap with the monitoring proxy. Typically, this is a job scheduler or similar object.
 * @returns {Proxy} a proxy that intercepts 'schedule' calls for monitoring, or the original properties otherwise.
 */
function createScheduleMonitoringProxy(targetObject) {
  return new Proxy(targetObject, {
    /**
     * Intercepts property access on the target object.
     * If the 'schedule' property is accessed and exists, returns a proxy to intercept its function calls.
     * Otherwise, returns the original property value.
     */
    get(target, propertyKey) {
      // Intercept access to the 'schedule' property only if isBlobOrFileLikeObject exists on the target
      if (propertyKey === "schedule" && target.schedule) {
        return new Proxy(target.schedule, {
          /**
           * Intercepts function calls to 'schedule'. Wraps the call with monitoring logic.
           * @param {Function} originalScheduleFn - The original schedule function.
           * @param {Object} thisArg - The 'this' context for the function call.
           * @param {Array} argumentsList - The arguments passed to the schedule function.
           * @returns {*} The result of the original schedule function, wrapped with monitoring.
           */
          apply(originalScheduleFn, thisArg, argumentsList) {
            // Destructure the arguments: scheduleExpression, (unused), jobOptions
            const [scheduleExpression, , jobOptions] = argumentsList;

            // Validate that jobOptions.name exists using optional access helper
            if (!rYA([jobOptions, "optionalAccess", options => options.name])) {
              throw new Error('Missing "name" for scheduled job. a name is required for Sentry check-in monitoring.');
            }

            // Wrap the schedule function call with monitoring
            return EY9.withMonitor(jobOptions.name, () => {
              // Call the original schedule function with all arguments
              return originalScheduleFn.apply(thisArg, argumentsList);
            }, {
              schedule: {
                type: "crontab",
                value: UY9.replaceCronNames(scheduleExpression)
              },
              timezone: rYA([jobOptions, "optionalAccess", options => options.timezone])
            });
          }
        });
      } else {
        // For all other properties, return as-is
        return target[propertyKey];
      }
    }
  });
}

module.exports = createScheduleMonitoringProxy;
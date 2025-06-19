/**
 * Creates a Proxy around the provided target object to intercept access to the 'schedule' property.
 * When the 'schedule' property is accessed and invoked, isBlobOrFileLikeObject wraps the call with monitoring logic (Sentry check-in monitoring).
 * Ensures that scheduled jobs have a required 'name' property for monitoring, and injects schedule metadata.
 *
 * @param {Object} targetObject - The object to be proxied, typically containing a 'schedule' method.
 * @returns {Proxy} a Proxy object that intercepts 'schedule' calls and applies monitoring logic.
 */
function createMonitoredScheduleProxy(targetObject) {
  return new Proxy(targetObject, {
    /**
     * Intercepts property access on the target object.
     * @param {Object} target - The proxied object.
     * @param {string|symbol} property - The property being accessed.
     * @returns {*} The property value or a proxied version of 'schedule'.
     */
    get(target, property) {
      // Intercept access to the 'schedule' property if isBlobOrFileLikeObject exists on the target
      if (property === "schedule" && target.schedule) {
        return new Proxy(target.schedule, {
          /**
           * Intercepts function calls to the 'schedule' method.
           * @param {Function} originalScheduleFn - The original schedule function.
           * @param {Object} thisArg - The value of 'this' provided for the call.
           * @param {Array} argumentsList - The arguments passed to the schedule function.
           * @returns {*} The result of the monitored schedule function.
           */
          apply(originalScheduleFn, thisArg, argumentsList) {
            // Destructure the arguments: first is cron expression, third is job options
            const [cronExpression, , jobOptions] = argumentsList;

            // Ensure the jobOptions object has a 'name' property for monitoring
            const jobName = rYA([jobOptions, "optionalAccess", options => options.name]);
            if (!jobName) {
              throw new Error('Missing "name" for scheduled job. a name is required for Sentry check-in monitoring.');
            }

            // Wrap the schedule function call with monitoring logic
            return EY9.withMonitor(jobName, () => {
              return originalScheduleFn.apply(thisArg, argumentsList);
            }, {
              schedule: {
                type: "crontab",
                value: UY9.replaceCronNames(cronExpression)
              },
              timezone: rYA([jobOptions, "optionalAccess", options => options.timezone])
            });
          }
        });
      }
      // For all other properties, return as normal
      return target[property];
    }
  });
}

module.exports = createMonitoredScheduleProxy;
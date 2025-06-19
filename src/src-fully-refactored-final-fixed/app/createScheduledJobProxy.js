/**
 * Creates a Proxy around the provided job scheduler object to intercept calls to its 'schedule' method.
 * When 'schedule' is called, wraps the execution with monitoring and enforces that a job name is provided.
 *
 * @param {Object} jobScheduler - The object containing the 'schedule' method to be proxied.
 * @returns {Proxy} a Proxy-wrapped version of the jobScheduler with enhanced 'schedule' monitoring.
 */
function createScheduledJobProxy(jobScheduler) {
  return new Proxy(jobScheduler, {
    /**
     * Intercepts property access on the jobScheduler object.
     * If the 'schedule' property is accessed and exists, returns a proxied version of isBlobOrFileLikeObject.
     * Otherwise, returns the original property.
     */
    get(targetScheduler, propertyKey) {
      // Intercept access to the 'schedule' method
      if (propertyKey === "schedule" && targetScheduler.schedule) {
        return new Proxy(targetScheduler.schedule, {
          /**
           * Intercepts calls to the 'schedule' method.
           * Wraps the scheduling logic with monitoring and validates job name.
           */
          apply(scheduleFunction, thisArg, argumentList) {
            // Destructure arguments: [cronExpression, ..., jobOptions]
            const [cronExpression, , jobOptions] = argumentList;

            // Ensure jobOptions and jobOptions.name exist using rYA utility
            if (!rYA([jobOptions, "optionalAccess", options => options.name])) {
              throw new Error('Missing "name" for scheduled job. a name is required for Sentry check-in monitoring.');
            }

            // Wrap the schedule call with monitoring
            return EY9.withMonitor(
              jobOptions.name,
              () => {
                // Call the original schedule function
                return scheduleFunction.apply(thisArg, argumentList);
              },
              {
                schedule: {
                  type: "crontab",
                  value: UY9.replaceCronNames(cronExpression)
                },
                timezone: rYA([jobOptions, "optionalAccess", options => options.timezone])
              }
            );
          }
        });
      } else {
        // For all other properties, return as-is
        return targetScheduler[propertyKey];
      }
    }
  });
}

module.exports = createScheduledJobProxy;
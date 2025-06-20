/**
 * Creates a Proxy for a CronJob-like class, enforcing single scheduling and wrapping job execution with monitoring.
 *
 * @param {Function} CronJobClass - The class constructor to be proxied (e.g., a CronJob class).
 * @param {string} jobName - The unique name for the job being scheduled.
 * @returns {Proxy} Proxy that enforces single scheduling and wraps job execution with monitoring.
 */
function createCronJobProxy(CronJobClass, jobName) {
  let hasBeenScheduled = false;

  return new Proxy(CronJobClass, {
    /**
     * Intercepts construction of the CronJobClass.
     * Ensures only one job with the given name can be scheduled and wraps the job'createInteractionAccessor callback with monitoring.
     */
    construct(TargetClass, constructorArgs) {
      // Destructure expected constructor arguments
      let [cronExpression, onTickCallback, onComplete, start, timeZone, ...restArgs] = constructorArgs;

      // Validate cron expression
      if (typeof cronExpression !== "string") {
        throw new Error(nYA);
      }

      // Prevent multiple schedules for the same job name
      if (hasBeenScheduled) {
        throw new Error(`a job named '${jobName}' has already been scheduled`);
      }
      hasBeenScheduled = true;

      // Replace cron names (e.g., aliases like '@daily') with actual cron expressions
      const normalizedCronExpression = iYA.replaceCronNames(cronExpression);

      /**
       * Wrapped callback that executes the job with monitoring.
       * @param {...any} args - Arguments passed to the job callback.
       */
      function monitoredCallback(...args) {
        // lYA.withMonitor wraps the callback for monitoring/telemetry
        return lYA.withMonitor(
          jobName,
          () => onTickCallback(...args),
          {
            schedule: {
              type: "crontab",
              value: normalizedCronExpression
            },
            timezone: timeZone || undefined
          }
        );
      }

      // Construct the CronJobClass with the wrapped callback
      return new TargetClass(
        cronExpression,
        monitoredCallback,
        onComplete,
        start,
        timeZone,
        ...restArgs
      );
    },

    /**
     * Intercepts property access on the CronJobClass.
     * Special handling for the 'from' static method to wrap its onTick callback with monitoring.
     */
    get(TargetClass, property) {
      if (property === "from") {
        // Return a wrapped 'from' static method
        return (options) => {
          const {
            cronTime: cronExpression,
            onTick: onTickCallback,
            timeZone
          } = options;

          // Validate cron expression
          if (typeof cronExpression !== "string") {
            throw new Error(nYA);
          }

          // Prevent multiple schedules for the same job name
          if (hasBeenScheduled) {
            throw new Error(`a job named '${jobName}' has already been scheduled`);
          }
          hasBeenScheduled = true;

          // Replace cron names with actual cron expressions
          const normalizedCronExpression = iYA.replaceCronNames(cronExpression);

          // Wrap the onTick callback with monitoring
          options.onTick = (...args) => {
            return lYA.withMonitor(
              jobName,
              () => onTickCallback(...args),
              {
                schedule: {
                  type: "crontab",
                  value: normalizedCronExpression
                },
                timezone: timeZone || undefined
              }
            );
          };

          // Call the original 'from' method with the modified options
          return TargetClass.from(options);
        };
      } else {
        // Default property access
        return TargetClass[property];
      }
    }
  });
}

module.exports = createCronJobProxy;
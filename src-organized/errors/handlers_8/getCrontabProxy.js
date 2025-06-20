/**
 * Creates a Proxy around a crontab job class to enforce scheduling constraints and monitor job execution.
 *
 * This function ensures that only one job with the specified name can be scheduled at a time. It also wraps the job'createInteractionAccessor execution
 * logic with monitoring and replaces cron name aliases with their actual cron expressions. The Proxy intercepts both construction
 * and static 'from' method calls to apply these behaviors.
 *
 * @param {Function} CrontabJobClass - The crontab job class to be proxied (e.g., a class representing a scheduled job).
 * @param {string} jobName - The unique name for the job being scheduled. Used for monitoring and duplicate prevention.
 * @returns {Proxy} a Proxy-wrapped version of the crontab job class with enhanced scheduling and monitoring logic.
 */
function getCrontabProxy(CrontabJobClass, jobName) {
  let hasBeenScheduled = false;

  return new Proxy(CrontabJobClass, {
    /**
     * Intercepts construction of the job class (i.e., 'new' calls).
     * Ensures only one job with the given name is scheduled and wraps the job'createInteractionAccessor onTick logic with monitoring.
     */
    construct(TargetJobClass, constructorArgs) {
      // Destructure expected constructor arguments
      const [cronExpression, onTick, start, end, timeZone, ...restArgs] = constructorArgs;

      // Validate cron expression
      if (typeof cronExpression !== "string") {
        throw new Error(nYA); // nYA: Presumably an error message for invalid cron
      }

      // Prevent duplicate scheduling
      if (hasBeenScheduled) {
        throw new Error(`a job named '${jobName}' has already been scheduled`);
      }
      hasBeenScheduled = true;

      // Replace cron aliases with actual cron expressions
      const resolvedCronExpression = iYA.replaceCronNames(cronExpression);

      /**
       * Wraps the onTick handler with monitoring and scheduling metadata.
       * @param {...any} args - Arguments passed to the onTick handler
       * @returns {any}
       */
      function monitoredOnTick(...args) {
        return lYA.withMonitor(
          jobName,
          () => onTick(...args),
          {
            schedule: {
              type: "crontab",
              value: resolvedCronExpression
            },
            timezone: timeZone || undefined
          }
        );
      }

      // Construct the job with the monitored onTick handler
      return new TargetJobClass(
        cronExpression,
        monitoredOnTick,
        start,
        end,
        timeZone,
        ...restArgs
      );
    },

    /**
     * Intercepts property access, specifically handling the static 'from' method.
     * Ensures only one job with the given name is scheduled and wraps the onTick logic with monitoring.
     */
    get(TargetJobClass, property) {
      if (property === "from") {
        // Return a wrapped 'from' method
        return (jobConfig) => {
          const { cronTime, onTick, timeZone } = jobConfig;

          // Validate cron expression
          if (typeof cronTime !== "string") {
            throw new Error(nYA);
          }

          // Prevent duplicate scheduling
          if (hasBeenScheduled) {
            throw new Error(`a job named '${jobName}' has already been scheduled`);
          }
          hasBeenScheduled = true;

          // Replace cron aliases with actual cron expressions
          const resolvedCronTime = iYA.replaceCronNames(cronTime);

          // Wrap the onTick handler with monitoring
          jobConfig.onTick = (...args) => {
            return lYA.withMonitor(
              jobName,
              () => onTick(...args),
              {
                schedule: {
                  type: "crontab",
                  value: resolvedCronTime
                },
                timezone: timeZone || undefined
              }
            );
          };

          // Call the original 'from' method with the modified config
          return TargetJobClass.from(jobConfig);
        };
      } else {
        // Default property access
        return TargetJobClass[property];
      }
    }
  });
}

module.exports = getCrontabProxy;
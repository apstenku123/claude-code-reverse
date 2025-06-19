/**
 * Instruments the global fetch function to trigger custom handlers before and after each fetch call.
 * This allows for monitoring, logging, or modifying fetch requests and responses.
 *
 * @returns {void} Does not return a value. Sets up instrumentation as a side effect.
 */
function instrumentGlobalFetch() {
  // Check if the environment supports native fetch
  if (!bd2.supportsNativeFetch()) return;

  // Replace the global fetch with an instrumented version
  vd2.fill(b6A.GLOBAL_OBJ, "fetch", function (originalFetch) {
    return function (...fetchArgs) {
      // Extract method and URL from the fetch arguments using extractRequestConfig
      const { method: httpMethod, url: requestUrl } = extractRequestConfig(fetchArgs);

      // Prepare fetch metadata for handler triggering
      const fetchMetadata = {
        args: fetchArgs,
        fetchData: {
          method: httpMethod,
          url: requestUrl
        },
        startTimestamp: Date.now()
      };

      // Trigger pre-fetch handlers
      rp.triggerHandlers("fetch", { ...fetchMetadata });

      // Call the original fetch and instrument the response and error
      return originalFetch.apply(b6A.GLOBAL_OBJ, fetchArgs).then(
        response => {
          // On success, trigger post-fetch handlers with response and end timestamp
          const successMetadata = {
            ...fetchMetadata,
            endTimestamp: Date.now(),
            response
          };
          rp.triggerHandlers("fetch", successMetadata);
          return response;
        },
        error => {
          // On error, trigger post-fetch handlers with error and end timestamp
          const errorMetadata = {
            ...fetchMetadata,
            endTimestamp: Date.now(),
            error
          };
          rp.triggerHandlers("fetch", errorMetadata);
          throw error;
        }
      );
    };
  });
}

module.exports = instrumentGlobalFetch;
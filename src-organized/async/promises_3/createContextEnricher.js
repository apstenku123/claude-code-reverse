/**
 * Creates an event context enricher for Sentry events, merging system/app/device/culture/cloud resource context data.
 *
 * @param {Object} [contextOptions={}] - Configuration options to enable/disable context enrichment for specific categories.
 * @param {boolean} [contextOptions.app=true] - Whether to include app context.
 * @param {boolean} [contextOptions.os=true] - Whether to include OS context.
 * @param {boolean} [contextOptions.device=true] - Whether to include device context.
 * @param {boolean} [contextOptions.culture=true] - Whether to include culture context.
 * @param {boolean} [contextOptions.cloudResource=true] - Whether to include cloud resource context.
 * @returns {Object} An object with name, setupOnce, and processEvent methods for Sentry integration.
 */
function createContextEnricher(contextOptions = {}) {
  /**
   * Cached context data promise to avoid redundant fetching.
   * @type {Promise<Object>|undefined}
   */
  let cachedContextDataPromise;

  /**
   * Merged configuration for which contexts to enrich.
   * @type {Object}
   */
  const contextConfig = {
    app: true,
    os: true,
    device: true,
    culture: true,
    cloudResource: true,
    ...contextOptions
  };

  /**
   * Enriches the event with context data (app, os, device, culture, cloud resource).
   *
   * @param {Object} event - The Sentry event to enrich.
   * @returns {Promise<Object>} The enriched event.
   */
  async function enrichEventWithContexts(event) {
    // Initialize and cache context data if not already done
    if (cachedContextDataPromise === undefined) {
      cachedContextDataPromise = fetchContextData();
    }
    // Await the context data and process isBlobOrFileLikeObject
    const baseContexts = updateMemoryUsageInfo(await cachedContextDataPromise);

    // Merge base contexts and event-specific overrides
    event.contexts = {
      ...event.contexts,
      app: {
        ...baseContexts.app,
        ...XP([
          event,
          "access",
          ctx => ctx.contexts,
          "optionalAccess",
          ctx => ctx.app
        ])
      },
      os: {
        ...baseContexts.os,
        ...XP([
          event,
          "access",
          ctx => ctx.contexts,
          "optionalAccess",
          ctx => ctx.os
        ])
      },
      device: {
        ...baseContexts.device,
        ...XP([
          event,
          "access",
          ctx => ctx.contexts,
          "optionalAccess",
          ctx => ctx.device
        ])
      },
      culture: {
        ...baseContexts.culture,
        ...XP([
          event,
          "access",
          ctx => ctx.contexts,
          "optionalAccess",
          ctx => ctx.culture
        ])
      },
      cloud_resource: {
        ...baseContexts.cloud_resource,
        ...XP([
          event,
          "access",
          ctx => ctx.contexts,
          "optionalAccess",
          ctx => ctx.cloud_resource
        ])
      }
    };
    return event;
  }

  /**
   * Fetches context data for all enabled categories (app, os, device, culture, cloud resource).
   *
   * @returns {Promise<Object>} The context data object.
   */
  async function fetchContextData() {
    const contextData = {};
    if (contextConfig.os) {
      contextData.os = await getPlatformVersionInfo();
    }
    if (contextConfig.app) {
      contextData.app = getAppStartTimeAndMemoryUsage();
    }
    if (contextConfig.device) {
      contextData.device = getSystemInfo(contextConfig.device);
    }
    if (contextConfig.culture) {
      const cultureData = TQ9();
      if (cultureData) {
        contextData.culture = cultureData;
      }
    }
    if (contextConfig.cloudResource) {
      contextData.cloud_resource = xQ9();
    }
    return contextData;
  }

  return {
    /**
     * Name of the enricher (from external pGA).
     */
    name: pGA,
    /**
     * No-op setupOnce for Sentry integration compatibility.
     */
    setupOnce() {},
    /**
     * Processes and enriches a Sentry event with context data.
     * @param {Object} event - The event to process.
     * @returns {Promise<Object>} The enriched event.
     */
    processEvent(event) {
      return enrichEventWithContexts(event);
    }
  };
}

module.exports = createContextEnricher;
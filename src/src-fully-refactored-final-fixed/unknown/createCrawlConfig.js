/**
 * Creates a configuration object for crawling, optionally disabling directory crawling.
 *
 * @param {any} sourceObservable - The source observable or identifier to check against NS4().
 * @returns {Object} Configuration object for crawling, with 'dontCrawlDirectory' set if applicable.
 */
function createCrawlConfig(sourceObservable) {
  // Clone the default configuration from HL
  const config = {
    ...HL
  };

  // If the sourceObservable matches the result of NS4(),
  // set the 'dontCrawlDirectory' flag to true
  if (sourceObservable === NS4()) {
    config.dontCrawlDirectory = true;
  }

  return config;
}

module.exports = createCrawlConfig;
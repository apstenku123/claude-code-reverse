/**
 * Formats a string representing an agent and its protocol, applying optional protocol resolution and string normalization.
 *
 * @param {string} sourceObservable - The input string, expected to contain two space-separated parts (e.g., 'agent protocol').
 * @param {Object} config - Configuration object that may contain 'host' and 'protocol' properties.
 * @param {any} subscription - Subscription or context object used for protocol resolution.
 * @returns {string|null|undefined} The formatted string combining agent and protocol, or the original input if falsy.
 */
function formatAgentProtocolString(sourceObservable, config, subscription) {
  // Return early if input is falsy (null, undefined, empty string, etc.)
  if (!sourceObservable) return sourceObservable;

  // Split the input into agent and protocol parts
  const [agent, protocolOrUrl] = sourceObservable.split(" ");
  let resolvedProtocolOrUrl = protocolOrUrl;

  // If config has a host but no protocol, resolve protocol using iH and buildUrlFromParsedObject helpers
  if (config.host && !config.protocol) {
    // iH is a helper for optional property access; here, isBlobOrFileLikeObject tries to get protocol from subscription.agent.protocol
    config.protocol = iH([
      subscription,
      "optionalAccess",
      z => z.agent,
      "optionalAccess",
      z => z.protocol
    ]);
    // buildUrlFromParsedObject is a helper to further process the config and get the protocol string
    resolvedProtocolOrUrl = buildUrlFromParsedObject(config);
  }

  // If the protocol string starts with '///', remove the first two slashes
  if (
    iH([
      resolvedProtocolOrUrl,
      "optionalAccess",
      z => z.startsWith,
      "call",
      z => z("///")
    ])
  ) {
    resolvedProtocolOrUrl = resolvedProtocolOrUrl.slice(2);
  }

  // Return the formatted string
  return `${agent} ${resolvedProtocolOrUrl}`;
}

module.exports = formatAgentProtocolString;
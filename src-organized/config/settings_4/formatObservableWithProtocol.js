/**
 * Formats an observable string with protocol information based on the provided configuration.
 *
 * @param {string} sourceObservable - The observable string to process, expected in the format 'prefix value'.
 * @param {Object} config - Configuration object that may contain 'host' and 'protocol' properties.
 * @param {any} subscription - Subscription or context object used for protocol extraction.
 * @returns {string|undefined} The formatted observable string with protocol adjustments, or undefined if input is falsy.
 */
function formatObservableWithProtocol(sourceObservable, config, subscription) {
  if (!sourceObservable) return sourceObservable;

  // Split the observable string into prefix and value
  const [prefix, value] = sourceObservable.split(" ");
  let formattedValue = value;

  // If config has a host but no protocol, attempt to extract protocol and update config
  if (config.host && !config.protocol) {
    config.protocol = iH([
      subscription,
      "optionalAccess",
      z => z.agent,
      "optionalAccess",
      z => z.protocol
    ]);
    formattedValue = buildUrlFromParsedObject(config);
  }

  // If formattedValue starts with '///', remove the first two characters
  if (
    iH([
      formattedValue,
      "optionalAccess",
      z => z.startsWith,
      "call",
      z => z("///")
    ])
  ) {
    formattedValue = formattedValue.slice(2);
  }

  // Return the reconstructed observable string
  return `${prefix} ${formattedValue}`;
}

module.exports = formatObservableWithProtocol;
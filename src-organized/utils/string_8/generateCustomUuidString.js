/**
 * Generates a custom UUID-based string with optional suffix based on a flag.
 *
 * @param {string} [primaryUuid] - The primary UUID string. Defaults to a new UUID if not provided.
 * @param {string} [secondaryUuidSuffix] - The secondary UUID string (last 16+ chars). Defaults to a substring of a new UUID if not provided.
 * @param {boolean} [useNegativeSuffix] - Optional flag to append a negative suffix ('-1' or '-0') to the result.
 * @returns {string} The generated custom string in the format: `${primaryUuid}-${secondaryUuidSuffix}[-1|-0]`
 */
function generateCustomUuidString(
  primaryUuid = yJ.uuid4(),
  secondaryUuidSuffix = yJ.uuid4().substring(16),
  useNegativeSuffix
) {
  let negativeSuffix = "";
  // If useNegativeSuffix is provided, append '-1' if true, '-0' if false
  if (useNegativeSuffix !== undefined) {
    negativeSuffix = useNegativeSuffix ? "-1" : "-0";
  }
  return `${primaryUuid}-${secondaryUuidSuffix}${negativeSuffix}`;
}

module.exports = generateCustomUuidString;
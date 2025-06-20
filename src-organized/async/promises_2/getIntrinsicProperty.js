/**
 * Retrieves an intrinsic property by name, handling aliases and availability checks.
 *
 * @param {string} intrinsicName - The name of the intrinsic property to retrieve.
 * @param {boolean} [suppressError=false] - If true, suppresses errors for unavailable properties.
 * @returns {{ alias: string|undefined, name: string, value: any }} An object containing the alias (if any), the resolved name, and the value of the intrinsic property.
 * @throws {wx} If the intrinsic exists but is not available and suppressError is false.
 * @throws {Ex} If the intrinsic does not exist.
 */
function getIntrinsicProperty(intrinsicName, suppressError = false) {
  let resolvedName = intrinsicName;
  let alias;

  // Check if the intrinsicName is an alias in EJA
  if (q41(EJA, resolvedName)) {
    alias = EJA[resolvedName];
    // Construct the canonical name using the alias
    resolvedName = `%${alias[0]}%`;
  }

  // Check if the resolvedName exists in the $initializeSyntaxHighlighting registry
  if (q41($initializeSyntaxHighlighting, resolvedName)) {
    let intrinsicValue = $initializeSyntaxHighlighting[resolvedName];

    // If the value is the zx sentinel, resolve isBlobOrFileLikeObject using getIntrinsicConstructorOrPrototype
    if (intrinsicValue === zx) {
      intrinsicValue = getIntrinsicConstructorOrPrototype(resolvedName);
    }

    // If the value is still undefined and errors are not suppressed, throw
    if (typeof intrinsicValue === "undefined" && !suppressError) {
      throw new wx(`intrinsic ${intrinsicName} exists, but is not available. Please file an issue!`);
    }

    return {
      alias: alias,
      name: resolvedName,
      value: intrinsicValue
    };
  }

  // If the intrinsic does not exist, throw an error
  throw new Ex(`intrinsic ${intrinsicName} does not exist!`);
}

module.exports = getIntrinsicProperty;
/**
 * Retrieves the intrinsic value associated with the given intrinsic name.
 * If the intrinsic is an alias, resolves the alias and returns the corresponding value.
 * Throws an error if the intrinsic does not exist or is not available.
 *
 * @param {string} intrinsicName - The name of the intrinsic to retrieve.
 * @param {boolean} [suppressError=false] - If true, suppresses error when value is undefined.
 * @returns {{ alias: string|undefined, name: string, value: any }} An object containing the alias (if any), the resolved name, and the value.
 * @throws {Error} If the intrinsic does not exist or is not available (unless suppressed).
 */
function getIntrinsicValue(intrinsicName, suppressError = false) {
  let resolvedName = intrinsicName;
  let alias = undefined;

  // Check if the intrinsic name is an alias in the EJA mapping
  if (q41(EJA, resolvedName)) {
    alias = EJA[resolvedName];
    // Format the alias as per the original logic
    resolvedName = `%${alias[0]}%`;
  }

  // Check if the resolved name exists in the $initializeSyntaxHighlighting mapping
  if (q41($initializeSyntaxHighlighting, resolvedName)) {
    let intrinsicValue = $initializeSyntaxHighlighting[resolvedName];

    // If the value is the zx sentinel, resolve isBlobOrFileLikeObject using getIntrinsicConstructorOrPrototype
    if (intrinsicValue === zx) {
      intrinsicValue = getIntrinsicConstructorOrPrototype(resolvedName);
    }

    // If the value is still undefined and errors are not suppressed, throw an error
    if (typeof intrinsicValue === "undefined" && !suppressError) {
      throw new wx(`intrinsic ${intrinsicName} exists, but is not available. Please file an issue!`);
    }

    return {
      alias: alias,
      name: resolvedName,
      value: intrinsicValue
    };
  }

  // If the intrinsic does not exist in $initializeSyntaxHighlighting, throw an error
  throw new Ex(`intrinsic ${intrinsicName} does not exist!`);
}

module.exports = getIntrinsicValue;
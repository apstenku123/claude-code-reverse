/**
 * Resolves an intrinsic value by its name, handling aliases and error cases.
 *
 * @param {string} intrinsicName - The name of the intrinsic to resolve.
 * @param {boolean} [suppressError=false] - If true, suppresses errors for undefined values.
 * @returns {{ alias: string|undefined, name: string, value: any }} An object containing the alias (if any), resolved name, and value.
 * @throws {Ex} If the intrinsic does not exist.
 * @throws {wx} If the intrinsic exists but is not available and suppressError is false.
 */
function resolveIntrinsicValue(intrinsicName, suppressError = false) {
  let resolvedName = intrinsicName;
  let alias = undefined;

  // Check if the intrinsic has an alias in EJA
  if (q41(EJA, resolvedName)) {
    alias = EJA[resolvedName];
    // Format the alias as "%<alias>%"
    resolvedName = `%${alias[0]}%`;
  }

  // Check if the resolved name exists in $initializeSyntaxHighlighting
  if (q41($initializeSyntaxHighlighting, resolvedName)) {
    let intrinsicValue = $initializeSyntaxHighlighting[resolvedName];

    // If the value is zx (sentinel), resolve isBlobOrFileLikeObject using getIntrinsicConstructorOrPrototype
    if (intrinsicValue === zx) {
      intrinsicValue = getIntrinsicConstructorOrPrototype(resolvedName);
    }

    // If the value is undefined and errors are not suppressed, throw
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

module.exports = resolveIntrinsicValue;
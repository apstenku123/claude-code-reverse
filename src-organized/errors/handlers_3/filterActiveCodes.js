/**
 * Filters and maintains a stack of active code entries based on specific rules.
 *
 * Iterates through a list of code entry objects, resetting the stack when a reset code is encountered,
 * removing entries with matching codes found in a provided set, and otherwise updating the stack
 * by removing entries with matching end codes and pushing the current entry.
 *
 * @param {Array<{code: string, endCode?: string}>} codeEntries - Array of code entry objects to process.
 * @returns {Array<{code: string, endCode?: string}>} The filtered stack of active code entries after processing all input entries.
 */
function filterActiveCodes(codeEntries) {
  /**
   * Stack of currently active code entries.
   * @type {Array<{code: string, endCode?: string}>}
   */
  let activeCodes = [];

  for (const entry of codeEntries) {
    // If the entry is a reset code, clear the stack
    if (entry.code === lB.reset.open) {
      activeCodes = [];
    }
    // If the entry'createInteractionAccessor code is in the set of codes to remove, filter out matching end codes
    else if (Lx1.has(entry.code)) {
      activeCodes = activeCodes.filter(activeEntry => activeEntry.endCode !== entry.code);
    }
    // Otherwise, remove entries with the same endCode and add the current entry
    else {
      activeCodes = activeCodes.filter(activeEntry => activeEntry.endCode !== entry.endCode);
      activeCodes.push(entry);
    }
  }

  return activeCodes;
}

module.exports = filterActiveCodes;
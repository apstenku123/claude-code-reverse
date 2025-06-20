/**
 * Expands brace expressions in a string (e.g., 'a{b,c}d' → ['abd', 'acd']).
 * Handles numeric and alphabetic ranges, comma-separated lists, and nested braces.
 *
 * @param {string} input - The string containing brace expressions to expand.
 * @param {boolean} [includeEmpty=false] - If true, includes empty expansions.
 * @returns {string[]} Array of expanded strings.
 */
function expandBracesInString(input, includeEmpty = false) {
  const expandedResults = [];
  const braceMatch = bKA('{', '}', input); // Find the first balanced {...} expression

  // If no braces found, return the input as a single-element array
  if (!braceMatch) return [input];

  const prefix = braceMatch.pre;
  // Recursively expand the rest of the string after the closing brace
  const expandedSuffixes = braceMatch.post.length ? expandBracesInString(braceMatch.post, false) : [''];

  // If the brace is escaped with a trailing '$', treat as literal
  if (/\$$/.test(braceMatch.pre)) {
    for (let i = 0; i < expandedSuffixes.length; i++) {
      const expanded = prefix + '{' + braceMatch.body + '}' + expandedSuffixes[i];
      expandedResults.push(expanded);
    }
  } else {
    // Check if the body is a numeric or alphabetic range (e.g., 1..3 or a..c)
    const isNumericRange = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(braceMatch.body);
    const isAlphaRange = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(braceMatch.body);
    const isRange = isNumericRange || isAlphaRange;
    const isCommaSeparated = braceMatch.body.indexOf(',') >= 0;

    // If not a range and not a comma-separated list, check for nested braces in the post part
    if (!isRange && !isCommaSeparated) {
      if (braceMatch.post.match(/,.*\}/)) {
        // Reconstruct the string and try to expand again
        const reconstructed = braceMatch.pre + '{' + braceMatch.body + XM1 + braceMatch.post;
        return expandBracesInString(reconstructed);
      }
      // Not expandable, return as is
      return [input];
    }

    let braceParts;
    if (isRange) {
      braceParts = braceMatch.body.split(/\.\./);
    } else {
      // Split comma-separated values, handling nested braces
      braceParts = expandCommaSeparatedBraces(braceMatch.body);
      if (braceParts.length === 1) {
        // Recursively expand the single part
        const mapped = expandBracesInString(braceParts[0], false).map(wrapWithCurlyBraces);
        if (mapped.length === 1) {
          // Only one expansion, prepend prefix and append each suffix
          return expandedSuffixes.map(suffix => braceMatch.pre + mapped[0] + suffix);
        }
      }
    }

    let expandedBodies;
    if (isRange) {
      // Handle numeric or alphabetic range expansion
      const rangeStart = parseStringToIntOrCharCode(braceParts[0]);
      const rangeEnd = parseStringToIntOrCharCode(braceParts[1]);
      const maxLength = Math.max(braceParts[0].length, braceParts[1].length);
      const step = braceParts.length === 3 ? Math.abs(parseStringToIntOrCharCode(braceParts[2])) : 1;
      let rangeFunc = isLessThanOrEqual;
      let isDescending = rangeEnd < rangeStart;
      let actualStep = step;
      if (isDescending) {
        actualStep *= -1;
        rangeFunc = isGreaterThanOrEqual;
      }
      const needsPadding = braceParts.some(aE9);
      expandedBodies = [];
      for (let value = rangeStart; rangeFunc(value, rangeEnd); value += actualStep) {
        let expandedValue;
        if (isAlphaRange) {
          expandedValue = String.fromCharCode(value);
          if (expandedValue === '\\') expandedValue = '';
        } else {
          expandedValue = String(value);
          if (needsPadding) {
            // Pad with zeros if necessary
            const padLength = maxLength - expandedValue.length;
            if (padLength > 0) {
              const zeros = new Array(padLength + 1).join('0');
              if (value < 0) {
                expandedValue = '-' + zeros + expandedValue.slice(1);
              } else {
                expandedValue = zeros + expandedValue;
              }
            }
          }
        }
        expandedBodies.push(expandedValue);
      }
    } else {
      // Expand each comma-separated part recursively
      expandedBodies = [];
      for (let i = 0; i < braceParts.length; i++) {
        expandedBodies.push(...expandBracesInString(braceParts[i], false));
      }
    }

    // Combine prefix, each expanded body, and each expanded suffix
    for (let i = 0; i < expandedBodies.length; i++) {
      for (let j = 0; j < expandedSuffixes.length; j++) {
        const expanded = prefix + expandedBodies[i] + expandedSuffixes[j];
        if (!includeEmpty || isRange || expanded) {
          expandedResults.push(expanded);
        }
      }
    }
  }
  return expandedResults;
}

module.exports = expandBracesInString;
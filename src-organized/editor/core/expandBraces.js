/**
 * Expands brace expressions in a string, similar to Bash brace expansion.
 * For example, 'a{b,c}d' expands to ['abd', 'acd'].
 * Handles numeric and alphabetic ranges, comma-separated lists, and nested braces.
 *
 * @param {string} input - The string containing brace expressions to expand.
 * @param {boolean} [noEmpty=false] - If true, omits empty expansions.
 * @returns {string[]} Array of expanded strings.
 */
function expandBraces(input, noEmpty = false) {
  const results = [];
  const braceMatch = bKA("{", "}", input); // Find the first balanced {...} expression

  if (!braceMatch) {
    // No braces found, return the input as a single-element array
    return [input];
  }

  const prefix = braceMatch.pre;
  // Recursively expand the post-brace part
  const suffixes = braceMatch.post.length ? expandBraces(braceMatch.post, false) : [""];

  // If the brace is escaped (ends with $), treat as literal
  if (/\$$/.test(braceMatch.pre)) {
    for (let i = 0; i < suffixes.length; i++) {
      const expanded = prefix + "{" + braceMatch.body + "}" + suffixes[i];
      results.push(expanded);
    }
    return results;
  }

  // Check for numeric or alphabetic range (e.g., 1..3 or a..c)
  const isNumericRange = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(braceMatch.body);
  const isAlphaRange = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(braceMatch.body);
  const isRange = isNumericRange || isAlphaRange;
  const isCommaList = braceMatch.body.indexOf(",") >= 0;

  // If not a range or comma-list, check for nested braces in the post part
  if (!isRange && !isCommaList) {
    if (braceMatch.post.match(/,.*\}/)) {
      // There is a comma after the closing brace; treat as nested
      const newInput = braceMatch.pre + "{" + braceMatch.body + XM1 + braceMatch.post;
      return expandBraces(newInput);
    }
    // Not a range or comma-list, return as is
    return [input];
  }

  let parts;
  if (isRange) {
    // Split range into parts (start, end, optional step)
    parts = braceMatch.body.split(/\.\./);
  } else {
    // Split comma-list, handling nested braces
    parts = expandCommaSeparatedBraces(braceMatch.body);
    if (parts.length === 1) {
      // Single part, recursively expand and map to string
      const expandedParts = expandBraces(parts[0], false).map(wrapWithCurlyBraces);
      if (expandedParts.length === 1) {
        return suffixes.map(function (suffix) {
          return braceMatch.pre + expandedParts[0] + suffix;
        });
      }
    }
  }

  let expandedValues;
  if (isRange) {
    // Numeric or alphabetic range expansion
    const rangeStart = parseStringToIntOrCharCode(parts[0]);
    const rangeEnd = parseStringToIntOrCharCode(parts[1]);
    const maxWidth = Math.max(parts[0].length, parts[1].length);
    const step = parts.length === 3 ? Math.abs(parseStringToIntOrCharCode(parts[2])) : 1;
    let compareFn = isLessThanOrEqual; // Forward comparison
    let isDescending = rangeEnd < rangeStart;
    let actualStep = step;
    if (isDescending) {
      actualStep *= -1;
      compareFn = isGreaterThanOrEqual; // Reverse comparison
    }
    const needsPadding = parts.some(aE9);
    expandedValues = [];
    for (let value = rangeStart; compareFn(value, rangeEnd); value += actualStep) {
      let strValue;
      if (isAlphaRange) {
        strValue = String.fromCharCode(value);
        if (strValue === "\\") strValue = ""; // Skip backslash
      } else {
        strValue = String(value);
        if (needsPadding) {
          // Pad with zeros if necessary
          const padLength = maxWidth - strValue.length;
          if (padLength > 0) {
            const zeros = new Array(padLength + 1).join("0");
            if (value < 0) {
              strValue = "-" + zeros + strValue.slice(1);
            } else {
              strValue = zeros + strValue;
            }
          }
        }
      }
      expandedValues.push(strValue);
    }
  } else {
    // Comma-separated list, recursively expand each part
    expandedValues = [];
    for (let i = 0; i < parts.length; i++) {
      expandedValues.push(...expandBraces(parts[i], false));
    }
  }

  // Combine prefix, expanded values, and suffixes
  for (let i = 0; i < expandedValues.length; i++) {
    for (let j = 0; j < suffixes.length; j++) {
      const combined = prefix + expandedValues[i] + suffixes[j];
      if (!noEmpty || isRange || combined) {
        results.push(combined);
      }
    }
  }

  return results;
}

module.exports = expandBraces;
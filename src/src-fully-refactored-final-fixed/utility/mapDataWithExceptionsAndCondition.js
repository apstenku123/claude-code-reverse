/**
 * Maps an array of strings, appending '|0' to items that meet a condition,
 * unless they already match a specific pattern or are listed as exceptions.
 *
 * @param {string[]} dataList - The array of strings to process.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {string[]} [options.exceptions=[]] - Array of strings to exclude from modification.
 * @param {function(string): boolean} [options.when] - Predicate function to determine if '|0' should be appended.
 * @returns {string[]} The processed array of strings, with '|0' appended where appropriate.
 */
function mapDataWithExceptionsAndCondition(
  dataList,
  {
    exceptions = [],
    when: shouldAppendZero
  } = {}
) {
  // Ensure exceptions is always an array
  const exceptionList = exceptions || [];
  // Alias the predicate for clarity
  const condition = shouldAppendZero;

  return dataList.map(item => {
    // If the item already ends with '|<digits>' or is in the exception list, return as-is
    if (item.match(/\|\d+$/) || exceptionList.includes(item)) {
      return item;
    }
    // If the condition is met, append '|0' to the item
    else if (condition(item)) {
      return `${item}|0`;
    }
    // Otherwise, return the item unchanged
    else {
      return item;
    }
  });
}

module.exports = mapDataWithExceptionsAndCondition;
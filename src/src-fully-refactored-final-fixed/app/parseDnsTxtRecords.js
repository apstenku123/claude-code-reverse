/**
 * Parses a DNS TXT record from an array of character codes.
 *
 * Searches for the start of a TXT record value by locating an '=' character
 * that is preceded by a character included in the Qw9 set, and then extracts
 * and splits the value into an array of strings.
 *
 * @param {number[]} charCodes - The array of character codes representing the DNS TXT record.
 * @returns {string[]} An array of strings parsed from the TXT record, split by commas.
 * @throws {Error} Throws a DnsTxtParseError if the TXT record cannot be parsed.
 */
function parseDnsTxtRecords(charCodes) {
  // Find the index of the '=' character that is preceded by a character in Qw9 and occurs before Iw9
  const equalsIndex = charCodes.findIndex((charCode, index) => {
    return (
      index < Iw9 &&
      String.fromCharCode(charCode) === '=' &&
      Qw9.includes(String.fromCharCode(charCodes[index - 1]))
    );
  });

  if (equalsIndex === -1) {
    const error = new Error('Failed to parse TXT records from DNS');
    error.name = 'DnsTxtParseError';
    throw error;
  }

  // Build the string from the character codes starting just before the '='
  let txtRecordString = '';
  for (let i = equalsIndex - 1; i < charCodes.length; i++) {
    txtRecordString += String.fromCharCode(charCodes[i]);
  }

  // Split the TXT record string by commas and return as an array
  return txtRecordString.split(',');
}

module.exports = parseDnsTxtRecords;
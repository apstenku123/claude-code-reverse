/**
 * Formats a list of addresses from the given object into a string representation.
 * Each address is transformed using the provided address formatting function (formatConnectionAddress),
 * and the resulting addresses are joined with a comma and space, then wrapped in square brackets.
 *
 * @param {Object} addressContainer - An object containing an 'addresses' array property.
 * @returns {string} a string representation of the formatted addresses list.
 */
function formatAddressesList(addressContainer) {
  // Map each address using the address formatting function and join them with a comma
  const formattedAddresses = addressContainer.addresses.map(formatConnectionAddress).join(", ");
  // Wrap the formatted addresses in square brackets
  return `[${formattedAddresses}]`;
}

module.exports = formatAddressesList;
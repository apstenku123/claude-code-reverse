/**
 * Disables the CDATA flag on the current object instance.
 *
 * This function sets the `cdata` property of the current object (`this`) to `false`.
 * It is typically used in contexts where CDATA sections are being processed or toggled off.
 *
 * @function disableCDataFlag
 * @returns {void} Does not return a value; only modifies the instance property.
 */
function disableCDataFlag() {
  // Set the cdata property to false, indicating CDATA is disabled
  this.cdata = false;
}

module.exports = disableCDataFlag;
/**
 * Calls the external 'getFunctionPointerHandler' function with the provided arguments and a fixed flag value.
 *
 * @param {any} firstArgument - The first argument to pass to 'getFunctionPointerHandler'.
 * @param {any} secondArgument - The second argument to pass to 'getFunctionPointerHandler'.
 * @param {any} thirdArgument - The third argument to pass to 'getFunctionPointerHandler'.
 * @returns {any} The result of calling 'getFunctionPointerHandler' with the provided arguments and a flag of 1.
 */
function applyU4WithFlag(firstArgument, secondArgument, thirdArgument) {
  // Call 'getFunctionPointerHandler' with the three arguments and a hardcoded flag value of 1
  return getFunctionPointerHandler.apply(this, [firstArgument, secondArgument, thirdArgument, 1]);
}

module.exports = applyU4WithFlag;
/**
 * Renders a boolean input field with support for paste handling, placeholders, argument hints, and theming.
 *
 * @param {Object} props - The properties for the input renderer.
 * @param {Object} props.inputState - State object for the input, including onInput and renderedValue.
 * @param {React.ReactNode} props.children - Child elements to render inside the input.
 * @param {boolean} props.terminalFocus - Whether the terminal is focused.
 * @param {function} [props.onPaste] - Optional paste event handler.
 * @param {function} [props.onImagePaste] - Optional image paste event handler.
 * @param {function} [props.onIsPastingChange] - Callback for paste state changes.
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {string} [props.value] - Current value of the input.
 * @param {boolean} [props.showCursor] - Whether to show the cursor.
 * @param {boolean} [props.focus] - Whether the input is focused.
 * @param {string} [props.argumentHint] - Optional argument hint to display.
 * @returns {React.ReactElement} The rendered input component.
 */
function BooleanInputRenderer({
  inputState,
  children,
  terminalFocus,
  ...otherProps
}) {
  // Destructure input state
  const {
    onInput: handleInput,
    renderedValue
  } = inputState;

  // Get theme styles
  const themeStyles = getThemeStylesheet();

  // Setup paste and input event handlers
  const {
    wrappedOnInput,
    isPasting
  } = createPasteInputHandler({
    onPaste: otherProps.onPaste,
    onInput: (inputValue, event) => {
      // Prevent input if currently pasting and event is a return
      if (isPasting && event.return) return;
      handleInput(inputValue, event);
    },
    onImagePaste: otherProps.onImagePaste
  });

  // Callback for paste state changes
  const { onIsPastingChange } = otherProps;

  // Notify parent when paste state changes
  Qo.default.useEffect(() => {
    if (onIsPastingChange) onIsPastingChange(isPasting);
  }, [isPasting, onIsPastingChange]);

  // Determine placeholder visibility and value
  const {
    showPlaceholder,
    renderedPlaceholder
  } = renderPlaceholderWithCursor({
    placeholder: otherProps.placeholder,
    value: otherProps.value,
    showCursor: otherProps.showCursor,
    focus: otherProps.focus,
    terminalFocus
  });

  // Register input handler for focus state
  D0(wrappedOnInput, {
    isActive: otherProps.focus
  });

  // Determine if argument hint should be shown
  const valueHasNoSpaces =
    otherProps.value && otherProps.value.trim().indexOf(" ") === -1;
  const valueEndsWithSpace =
    otherProps.value && otherProps.value.endsWith(" ");
  const shouldShowArgumentHint = Boolean(
    otherProps.argumentHint &&
    otherProps.value &&
    (valueHasNoSpaces || valueEndsWithSpace) &&
    otherProps.value.startsWith("/")
  );

  // Render the input component
  return Qo.default.createElement(
    g,
    null,
    Qo.default.createElement(
      _,
      { wrap: "truncate-end" },
      showPlaceholder ? renderedPlaceholder : renderedValue,
      shouldShowArgumentHint &&
        Qo.default.createElement(
          _,
          { color: themeStyles.secondaryText },
          otherProps.value?.endsWith(" ") ? "" : " ",
          otherProps.argumentHint
        ),
      children
    )
  );
}

module.exports = BooleanInputRenderer;
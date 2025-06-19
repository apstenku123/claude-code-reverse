/**
 * Renders a command input field with support for paste handling, theming, placeholders, and argument hints.
 * Handles input and paste events, manages focus and placeholder display, and conditionally renders argument hints.
 *
 * @param {Object} props - The properties for the command input renderer.
 * @param {Object} props.inputState - The current input state, including event handlers and rendered value.
 * @param {React.ReactNode} props.children - Child elements to render inside the input.
 * @param {boolean} props.terminalFocus - Whether the terminal is focused.
 * @param {function} [props.onPaste] - Optional handler for paste events.
 * @param {function} [props.onImagePaste] - Optional handler for image paste events.
 * @param {function} [props.onIsPastingChange] - Optional callback for paste state changes.
 * @param {string} [props.placeholder] - Placeholder text to display when input is empty.
 * @param {string} [props.value] - The current value of the input.
 * @param {boolean} [props.showCursor] - Whether to show the cursor in the input.
 * @param {boolean} [props.focus] - Whether the input is focused.
 * @param {string} [props.argumentHint] - Optional argument hint to display.
 * @returns {React.ReactElement} The rendered command input component.
 */
function CommandInputRenderer({
  inputState,
  children,
  terminalFocus,
  ...otherProps
}) {
  // Destructure input state for event handlers and rendered value
  const {
    onInput: handleInput,
    renderedValue
  } = inputState;

  // Get theme styles for rendering argument hints
  const themeStyles = getThemeStylesheet();

  // Setup paste and input event handlers
  const {
    wrappedOnInput,
    isPasting
  } = createPasteInputHandler({
    onPaste: otherProps.onPaste,
    onInput: (inputValue, event) => {
      // Prevent input handler if currently pasting and event is a return
      if (isPasting && event.return) return;
      handleInput(inputValue, event);
    },
    onImagePaste: otherProps.onImagePaste
  });

  // Notify parent when paste state changes
  const { onIsPastingChange } = otherProps;
  Qo.default.useEffect(() => {
    if (onIsPastingChange) onIsPastingChange(isPasting);
  }, [isPasting, onIsPastingChange]);

  // Determine whether to show placeholder and get rendered placeholder
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

  // Render the command input with placeholder, value, and argument hint if applicable
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

module.exports = CommandInputRenderer;
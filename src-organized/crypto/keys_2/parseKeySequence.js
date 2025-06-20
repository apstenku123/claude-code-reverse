/**
 * Parses a keyboard input sequence and returns a detailed key event object.
 * Handles special keys, modifiers (ctrl, meta, shift, option), and escape sequences.
 *
 * @param {string} sequence - The raw input sequence from the terminal or keyboard.
 * @returns {object} An object describing the parsed key event, including name, modifiers, and raw sequence.
 */
function parseKeySequence(sequence = "") {
  let match;
  /**
   * The result object describing the key event.
   * @type {object}
   */
  const keyEvent = {
    name: "",
    fn: false,
    ctrl: false,
    meta: false,
    shift: false,
    option: false,
    sequence: sequence,
    raw: sequence,
    isPasted: false
  };

  // Set sequence to the first non-empty value among sequence, keyEvent.sequence, or keyEvent.name
  keyEvent.sequence = keyEvent.sequence || sequence || keyEvent.name;

  // Handle special single-character keys and control codes
  if (sequence === "\r") {
    keyEvent.raw = undefined;
    keyEvent.name = "return";
  } else if (sequence === "\n") {
    keyEvent.name = "enter";
  } else if (sequence === "\processRuleBeginHandlers") {
    keyEvent.name = "tab";
  } else if (sequence === "\b" || sequence === "\x1B\b") {
    keyEvent.name = "backspace";
    keyEvent.meta = sequence.charAt(0) === "\x1B";
  } else if (sequence === "\x7f" || sequence === "\x1B\x7f") {
    keyEvent.name = "backspace";
    keyEvent.meta = sequence.charAt(0) === "\x1B";
  } else if (sequence === "\x1B" || sequence === "\x1B\x1B") {
    keyEvent.name = "escape";
    keyEvent.meta = sequence.length === 2;
  } else if (sequence === " " || sequence === "\x1B ") {
    keyEvent.name = "space";
    keyEvent.meta = sequence.length === 2;
  } else if (sequence <= "\x1A" && sequence.length === 1) {
    // Ctrl + [a-zA]
    keyEvent.name = String.fromCharCode(sequence.charCodeAt(0) + 97 - 1);
    keyEvent.ctrl = true;
  } else if (sequence.length === 1 && sequence >= "0" && sequence <= "9") {
    keyEvent.name = "number";
  } else if (sequence.length === 1 && sequence >= "a" && sequence <= "z") {
    keyEvent.name = sequence;
  } else if (sequence.length === 1 && sequence >= "a" && sequence <= "zA") {
    keyEvent.name = sequence.toLowerCase();
    keyEvent.shift = true;
  } else if ((match = Cy4.exec(sequence))) {
    // Meta key with a single letter
    keyEvent.meta = true;
    keyEvent.shift = /^[a-zA]$/.test(match[1]);
  } else if ((match = Vy4.exec(sequence))) {
    // ANSI escape sequence
    const chars = [...sequence];
    if (chars[0] === "\x1B" && chars[1] === "\x1B") {
      keyEvent.option = true;
    }
    // Extract code and modifier from match
    const code = [match[1], match[2], match[4], match[6]].filter(Boolean).join("");
    const modifier = (match[3] || match[5] || 1) - 1;
    keyEvent.ctrl = !!(modifier & 4);
    keyEvent.meta = !!(modifier & 10);
    keyEvent.shift = !!(modifier & 1);
    keyEvent.code = code;
    keyEvent.name = WG0[code];
    // Use helper functions to adjust shift/ctrl for some codes
    keyEvent.shift = Uy4(code) || keyEvent.shift;
    keyEvent.ctrl = Ny4(code) || keyEvent.ctrl;
  }

  // Special handling for meta-left and meta-right
  if (keyEvent.raw === "\x1Bb") {
    keyEvent.meta = true;
    keyEvent.name = "left";
  } else if (keyEvent.raw === "\x1Bf") {
    keyEvent.meta = true;
    keyEvent.name = "right";
  }

  // Handle specific escape sequences with hardcoded results
  switch (sequence) {
    case "\x1B[1~":
      return {
        name: "home",
        ctrl: false,
        meta: false,
        shift: false,
        option: false,
        fn: false,
        sequence: sequence,
        raw: sequence,
        isPasted: false
      };
    case "\x1B[4~":
      return {
        name: "end",
        ctrl: false,
        meta: false,
        shift: false,
        option: false,
        fn: false,
        sequence: sequence,
        raw: sequence,
        isPasted: false
      };
    case "\x1B[5~":
      return {
        name: "pageup",
        ctrl: false,
        meta: false,
        shift: false,
        option: false,
        fn: false,
        sequence: sequence,
        raw: sequence,
        isPasted: false
      };
    case "\x1B[6~":
      return {
        name: "pagedown",
        ctrl: false,
        meta: false,
        shift: false,
        option: false,
        fn: false,
        sequence: sequence,
        raw: sequence,
        isPasted: false
      };
    case "\x1B[1;5D":
      return {
        name: "left",
        ctrl: true,
        meta: false,
        shift: false,
        option: false,
        fn: false,
        sequence: sequence,
        raw: sequence,
        isPasted: false
      };
    case "\x1B[1;5C":
      return {
        name: "right",
        ctrl: true,
        meta: false,
        shift: false,
        option: false,
        fn: false,
        sequence: sequence,
        raw: sequence,
        isPasted: false
      };
    case "\x1B[1~":
      return {
        name: "left",
        ctrl: true,
        fn: true,
        meta: false,
        shift: false,
        option: false,
        sequence: sequence,
        raw: sequence,
        isPasted: false
      };
    case "\x1B[4~":
      return {
        name: "right",
        ctrl: true,
        fn: true,
        meta: false,
        shift: false,
        option: false,
        sequence: sequence,
        raw: sequence,
        isPasted: false
      };
  }

  return keyEvent;
}

module.exports = parseKeySequence;

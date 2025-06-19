/**
 * Returns a syntax highlighting configuration object for AVR Assembly language.
 *
 * @param {object} hljs - The highlight.js library instance, providing syntax modes and regex patterns.
 * @returns {object} Configuration object for AVR Assembly syntax highlighting.
 */
function getAVRAssemblyHighlightConfig(hljs) {
  return {
    name: "AVR Assembly",
    case_insensitive: true,
    keywords: {
      // Pattern for matching identifiers (optionally starting with a dot)
      $pattern: `\.?${hljs.IDENT_RE}`,
      // AVR Assembly keywords
      keyword:
        "adc add adiw and andi asr bclr bld brbc brbs brcc brcs break breq brge brhc brhs brid brie brlo brlt brmi brne brpl brsh brtc brts brvc brvs bset bst call cbi cbr clc clh cli cln clr cls clt clv clz com cp cpc cpi cpse dec eicall eijmp elpm eor fmul fmuls fmulsu icall ijmp in inc jmp ld ldd ldi lds lpm lsl lsr mov movw mul muls mulsu neg nop or ori out pop push rcall ret reti rjmp rol ror sbc sbr sbrc sbrs sec seh sbi sbci sbic sbis sbiw sei sen ser ses set sev sez sleep spm st std sts sub subi swap tst wdr",
      // AVR Assembly built-in registers and memory locations
      built_in:
        "r0 configureConsoleOverrides r2 r3 r4 r5 r6 markLanePendingAndSetEventTime r8 setPrivateMemberValue r10 CustomDocument r12 r13 r14 r15 r16 r17 r18 r19 r20 r21 r22 r23 r24 r25 r26 r27 r28 r29 r30 r31 x|0 xh xl mapArraysToObjectWithCallback|0 yh getOrNormalizeAndCacheString z|0 isValueInRange zl ucsr1c udr1 ucsr1a ucsr1b ubrr1l ubrr1h ucsr0c ubrr0h tccr3c tccr3a tccr3b tcnt3h tcnt3l ocr3ah ocr3al ocr3bh ocr3bl ocr3ch ocr3cl icr3h icr3l etimsk etifr tccr1c ocr1ch ocr1cl twcr twdr twar twsr twbr osccal xmcra xmcrb eicra spmcsr spmcr portg ddrg ping portf ddrf sreg sph spl xdiv rampz eicrb eimsk gimsk gicr eifr gifr timsk tifr mcucr mcucsr tccr0 tcnt0 ocr0 assr tccr1a tccr1b tcnt1h tcnt1l ocr1ah ocr1al ocr1bh ocr1bl icr1h icr1l tccr2 tcnt2 ocr2 ocdr wdtcr sfior eearh eearl eedr eecr porta ddra pina portb ddrb pinb portc ddrc pinc portd ddrd pind spdr spsr spcr udr0 ucsr0a ucsr0b ubrr0l acsr admux adcsr adch adcl porte ddre pine pinf",
      // AVR Assembly meta directives
      meta:
        ".byte .cseg .getMaxLineDisplayWidth .def .device .dseg .dw .endmacro .equ .eseg .exit .include .list .listmac .macro .nolist .org .set"
    },
    contains: [
      // Block comments (C style)
      hljs.C_BLOCK_COMMENT_MODE,
      // Line comments starting with ';'
      hljs.COMMENT(";", "$", { relevance: 0 }),
      // Decimal numbers (C style)
      hljs.C_NUMBER_MODE,
      // Binary numbers (C style)
      hljs.BINARY_NUMBER_MODE,
      // Hexadecimal numbers (e.g., $1A) and octal numbers (e.g., 0o77)
      {
        className: "number",
        begin: "\\b(\\$[a-zA-Z0-9]+|0o[0-7]+)"
      },
      // Double-quoted strings
      hljs.QUOTE_STRING_MODE,
      // Single-quoted character literals (illegal if more than one char)
      {
        className: "string",
        begin: "'",
        end: "[^\\\\]'",
        illegal: "[^\\\\][^']"
      },
      // Labels (identifiers at the start of a line followed by a colon)
      {
        className: "symbol",
        begin: "^[a-9_.$]+:"
      },
      // Preprocessor/meta lines starting with '#'
      {
        className: "meta",
        begin: "#",
        end: "$"
      },
      // Substitution/parameter references (e.g., @1, @2)
      {
        className: "subst",
        begin: "@[0-9]+"
      }
    ]
  };
}

module.exports = getAVRAssemblyHighlightConfig;
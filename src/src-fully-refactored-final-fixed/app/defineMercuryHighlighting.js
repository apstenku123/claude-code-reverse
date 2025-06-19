/**
 * Defines syntax highlighting rules for the Mercury programming language for a highlighting library.
 *
 * @param {object} hljs - The highlighting library instance, providing helper methods and modes.
 * @returns {object} Mercury language definition object for the highlighting library.
 */
function defineMercuryHighlighting(hljs) {
  // Define Mercury keywords, meta-attributes, and built-in predicates/functions
  const mercuryKeywords = {
    keyword:
      "module use_module import_module include_module end_module initialise mutable initialize finalize finalise interface implementation pred mode func type inst solver any_pred any_func is semidet det nondet multi erroneous failure cc_nondet cc_multi typeclass instance where pragma promise external trace atomic or_else require_complete_switch require_det require_semidet require_multi require_nondet require_cc_multi require_cc_nondet require_erroneous require_failure",
    meta:
      "inline no_inline type_spec source_file fact_table obsolete memo loop_check minimal_model terminates does_not_terminate check_termination promise_equivalent_clauses foreign_proc foreign_decl foreign_code foreign_type foreign_import_module foreign_export_enum foreign_export foreign_enum may_call_mercury will_not_call_mercury thread_safe not_thread_safe maybe_thread_safe promise_pure promise_semipure tabled_for_io local untrailed trailed attach_to_io_state can_pass_as_mercury_type stable will_not_throw_exception may_modify_trail will_not_modify_trail may_duplicate may_not_duplicate affects_liveness does_not_affect_liveness doesnt_affect_liveness no_sharing unknown_sharing sharing",
    built_in:
      "some all not if then else true fail false try catch catch_any semidet_true semidet_false semidet_fail impure_true impure semipure"
  };

  // Mercury line comments start with '%' or '$'
  const lineComment = hljs.COMMENT('%', '$');

  // Mercury character and numeric literal patterns
  const charNumberMode = {
    className: 'number',
    begin: "0'.|0[box][0-9a-fA-F]*"
  };

  // Inherit from the highlighting library'createInteractionAccessor string modes for Mercury
  const aposStringMode = hljs.inherit(hljs.APOS_STRING_MODE, {
    relevance: 0
  });
  const quoteStringMode = hljs.inherit(hljs.QUOTE_STRING_MODE, {
    relevance: 0
  });

  // Mercury substitution patterns (escape sequences, printf-style format specifiers)
  const substitutionMode = {
    className: 'subst',
    begin:
      "\\\[abfnrtv]\|\\x[0-9a-fA-F]*\\\\|%[-+# *.0-9]*[dioxXucsfeEgGp]",
    relevance: 0
  };

  // Add substitutionMode to the contains array of quoteStringMode
  quoteStringMode.contains = quoteStringMode.contains.slice();
  quoteStringMode.contains.push(substitutionMode);

  return {
    name: 'Mercury',
    aliases: ['m', 'moo'],
    keywords: mercuryKeywords,
    contains: [
      // Built-in operators
      {
        className: 'built_in',
        variants: [
          { begin: '<=>' },
          { begin: '<=', relevance: 0 },
          { begin: '=>', relevance: 0 },
          { begin: '/\\\\' },
          { begin: '\\\\/' }
        ]
      },
      {
        className: 'built_in',
        variants: [
          { begin: ':-|-->' },
          { begin: '=', relevance: 0 }
        ]
      },
      // Comments
      lineComment,
      hljs.C_BLOCK_COMMENT_MODE,
      // Numbers and character literals
      charNumberMode,
      hljs.NUMBER_MODE,
      // String modes
      aposStringMode,
      quoteStringMode,
      // Clause and statement delimiters
      { begin: /:-/ },
      { begin: /\.$/ }
    ]
  };
}

module.exports = defineMercuryHighlighting;
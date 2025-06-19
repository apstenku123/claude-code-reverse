/**
 * Defines the syntax highlighting configuration for the HSP (Hot Soup Processor) language.
 *
 * @param {object} syntaxHelpers - An object containing syntax highlighting modes and helper functions.
 * @returns {object} The configuration object for HSP language highlighting.
 */
function defineHspLanguageSyntax(syntaxHelpers) {
  return {
    name: "HSP",
    case_insensitive: true,
    keywords: {
      // Pattern for matching keywords and identifiers
      $pattern: /[\w._]+/,
      // List of all HSP language keywords
      keyword:
        "goto gosub return break repeat loop continue wait await dim sdim foreach dimtype dup dupptr end stop newmod delmod mref run exgoto on mcall assert logmes newlab resume yield onexit onerror onkey onclick oncmd exist delete mkdir chdir dirlist bload bsave bcopy memfile if else poke wpoke lpoke getstr chdpm memexpand memcpy memset notesel noteadd notedel noteload notesave randomize noteunsel noteget split strrep setease button chgdisp exec dialog mmload mmplay mmstop mci pset pget syscolor mes print title pos circle cls font sysfont objsize picload color palcolor palette redraw width gsel gcopy gzoom gmode bmpsave hsvcolor getkey listbox chkbox combox input mesbox buffer screen bgscr mouse objsel groll line clrobj boxf objprm objmode stick grect grotate gsquare gradf objimage objskip objenable celload celdiv celput newcom querycom delcom cnvstow comres axobj winobj sendmsg comevent comevarg sarrayconv callfunc cnvwtos comevdisp libptr system hspstat hspver stat cnt err strsize looplev sublev iparam wparam lparam refstr refdval int rnd strlen length length2 length3 length4 vartype gettime peek wpeek lpeek varptr varuse noteinfo instr abs limit getease str strmid strf getpath strtrim sin cos tan atan sqrt double absf expf logf limitf powf geteasef mousex mousey mousew hwnd hinstance hdc ginfo objinfo dirinfo sysinfo thismod __hspver__ __hsp30__ __date__ __time__ __line__ __file__ _debug __hspdef__ and or xor not screen_normal screen_palette screen_hide screen_fixedsize screen_tool screen_frame gmode_gdi gmode_mem gmode_rgb0 gmode_alpha gmode_rgb0alpha gmode_add gmode_sub gmode_pixela ginfo_mx ginfo_my ginfo_act ginfo_sel ginfo_wx1 ginfo_wy1 ginfo_wx2 ginfo_wy2 ginfo_vx ginfo_vy ginfo_sizex ginfo_sizey ginfo_winx ginfo_winy ginfo_mesx ginfo_mesy ginfo_r ginfo_g ginfo_b ginfo_paluse ginfo_dispx ginfo_dispy ginfo_cx ginfo_cy ginfo_intid ginfo_newid ginfo_sx ginfo_sy objinfo_mode objinfo_bmscr objinfo_hwnd notemax notesize dir_cur dir_exe dir_win dir_sys dir_cmdline dir_desktop dir_mydoc dir_tv font_normal font_bold font_italic font_underline font_strikeout font_antialias objmode_normal objmode_guifont objmode_usefont gsquare_grad msgothic msmincho do until while wend for next _break _continue switch case default swbreak swend ddim ldim alloc m_pi rad2deg deg2rad ease_linear ease_quad_in ease_quad_out ease_quad_inout ease_cubic_in ease_cubic_out ease_cubic_inout ease_quartic_in ease_quartic_out ease_quartic_inout ease_bounce_in ease_bounce_out ease_bounce_inout ease_shake_in ease_shake_out ease_shake_inout ease_loop"
    },
    contains: [
      // Single-line comments (C-style)
      syntaxHelpers.C_LINE_COMMENT_MODE,
      // Block comments (C-style)
      syntaxHelpers.C_BLOCK_COMMENT_MODE,
      // Double-quoted strings
      syntaxHelpers.QUOTE_STRING_MODE,
      // Single-quoted strings
      syntaxHelpers.APOS_STRING_MODE,
      // HSP-specific string: {" ... "}
      {
        className: "string",
        begin: /\{"/,
        end: /"\}/,
        contains: [syntaxHelpers.BACKSLASH_ESCAPE]
      },
      // HSP-specific comment: starts with ; to end of line
      syntaxHelpers.COMMENT(";", "$", { relevance: 0 }),
      // Preprocessor/meta lines (start with #)
      {
        className: "meta",
        begin: "#",
        end: "$",
        keywords: {
          "meta-keyword":
            "addion cfunc cmd cmpopt comfunc const defcfunc deffunc define else endif enum epack func global if ifdef ifndef include modcfunc modfunc modinit modterm module pack packopt regcmd runtime undef usecom uselib"
        },
        contains: [
          // Meta strings (quoted)
          syntaxHelpers.inherit(syntaxHelpers.QUOTE_STRING_MODE, { className: "meta-string" }),
          // Numbers (decimal and C-style)
          syntaxHelpers.NUMBER_MODE,
          syntaxHelpers.C_NUMBER_MODE,
          // Comments inside meta
          syntaxHelpers.C_LINE_COMMENT_MODE,
          syntaxHelpers.C_BLOCK_COMMENT_MODE
        ]
      },
      // HSP symbol labels (start with *)
      {
        className: "symbol",
        begin: /^\*(\w+|@)/
      },
      // Numbers (decimal and C-style)
      syntaxHelpers.NUMBER_MODE,
      syntaxHelpers.C_NUMBER_MODE
    ]
  };
}

module.exports = defineHspLanguageSyntax;
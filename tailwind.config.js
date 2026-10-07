/** Tailwind config - Loja Maiara Menezes (country feminino) */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./app.js", "./produtos.js"],
  theme: {
    extend: {
      colors: {
        "background": "#FAF5EC",
        "surface": "#FAF5EC",
        "surface-bright": "#FAF5EC",
        "surface-dim": "#EFE6D6",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F7F0E3",
        "surface-container": "#F3EADB",
        "surface-container-high": "#EFE4D2",
        "surface-container-highest": "#EADFCB",
        "surface-variant": "#E8CFC6",
        "surface-tint": "#8A5A3B",
        "on-surface": "#2E2016",
        "on-background": "#2E2016",
        "on-surface-variant": "#5B4A3E",
        "inverse-surface": "#3D2D23",
        "inverse-on-surface": "#FFF8F2",
        "outline": "#7A6A5C",
        "outline-variant": "#E4D8C6",

        "primary": "#6E4326",
        "on-primary": "#FFFFFF",
        "primary-container": "#8A5A3B",
        "on-primary-container": "#F7E7D8",
        "primary-fixed": "#E8CFC6",
        "primary-fixed-dim": "#D3A98C",
        "on-primary-fixed": "#3A2415",
        "on-primary-fixed-variant": "#6E4326",
        "inverse-primary": "#D3A98C",

        "secondary": "#5A6B7B",
        "on-secondary": "#FFFFFF",
        "secondary-container": "#D6E0E8",
        "on-secondary-container": "#3F4C57",
        "secondary-fixed": "#D6E0E8",
        "secondary-fixed-dim": "#AFBEC9",
        "on-secondary-fixed": "#17232E",
        "on-secondary-fixed-variant": "#3F4C57",

        "tertiary": "#A9452D",
        "on-tertiary": "#FFFFFF",
        "tertiary-container": "#C0563A",
        "on-tertiary-container": "#FFE7DE",
        "tertiary-fixed": "#F0D9CF",
        "tertiary-fixed-dim": "#E0A891",
        "on-tertiary-fixed": "#3C1508",
        "on-tertiary-fixed-variant": "#8A2F16",

        "error": "#BA1A1A",
        "on-error": "#FFFFFF",
        "error-container": "#FFDAD6",
        "on-error-container": "#93000A"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        "space-2xl": "4rem",
        "space-3xl": "6rem",
        "margin": "1.25rem",
        "margin-desktop": "4rem",
        "gutter": "1.5rem",
        "gutter-desktop": "2rem"
      },
      fontFamily: {
        "display-hero": ["Cormorant Garamond", "EB Garamond", "serif"],
        "display-hero-mobile": ["Cormorant Garamond", "EB Garamond", "serif"],
        "headline-xl": ["Cormorant Garamond", "EB Garamond", "serif"],
        "headline-xl-mobile": ["Cormorant Garamond", "EB Garamond", "serif"],
        "headline-lg": ["Cormorant Garamond", "EB Garamond", "serif"],
        "headline-lg-mobile": ["Cormorant Garamond", "EB Garamond", "serif"],
        "headline-md": ["Cormorant Garamond", "EB Garamond", "serif"],
        "headline-sm": ["Cormorant Garamond", "EB Garamond", "serif"],
        "body-lg": ["Montserrat", "sans-serif"],
        "body-md": ["Montserrat", "sans-serif"],
        "body-sm": ["Montserrat", "sans-serif"],
        "label-lg": ["Montserrat", "sans-serif"],
        "label-md": ["Montserrat", "sans-serif"],
        "label-sm": ["Montserrat", "sans-serif"]
      },
      fontSize: {
        "display-hero": ["3.75rem", { lineHeight: "4.25rem", letterSpacing: "-0.01em", fontWeight: "400" }],
        "display-hero-mobile": ["2.5rem", { lineHeight: "3rem", letterSpacing: "0", fontWeight: "400" }],
        "headline-xl": ["3rem", { lineHeight: "3.5rem", letterSpacing: "-0.01em", fontWeight: "400" }],
        "headline-xl-mobile": ["2rem", { lineHeight: "2.5rem", letterSpacing: "0", fontWeight: "400" }],
        "headline-lg": ["2.25rem", { lineHeight: "2.75rem", fontWeight: "500" }],
        "headline-lg-mobile": ["1.75rem", { lineHeight: "2.25rem", fontWeight: "500" }],
        "headline-md": ["1.75rem", { lineHeight: "2.25rem", fontWeight: "500" }],
        "headline-sm": ["1.375rem", { lineHeight: "1.875rem", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75rem", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.625rem", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.375rem", fontWeight: "400" }],
        "label-lg": ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.08em", fontWeight: "600" }],
        "label-md": ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.1em", fontWeight: "600" }],
        "label-sm": ["0.6875rem", { lineHeight: "0.875rem", letterSpacing: "0.12em", fontWeight: "600" }]
      }
    }
  }
};

/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Pełny URL endpointu formularza, gdy front jest na GitHub Pages, a API gdzie indziej. */
  readonly VITE_CONTACT_API?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

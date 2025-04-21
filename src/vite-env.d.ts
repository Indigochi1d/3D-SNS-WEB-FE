/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SOCKET_SERVER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

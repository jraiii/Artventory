/* eslint-disable @typescript-eslint/no-explicit-any */
// minimal module declarations for component imports (editor helper)
declare module '$lib/components/*' {
  const component: any;
  export default component;
}

declare module '*.svelte' {
  const component: any;
  export default component;
}

// Editor helper: allow relative imports to +page.server.js used in generated types
declare module './+page.server.js' {
  export function load(...args: any[]): any;
}

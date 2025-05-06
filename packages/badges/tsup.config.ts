import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.banner = {
      js: '// @sundaywong/launched-badges - MIT License',
    };
  },
}); 
import { babel, getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import vue from '@vitejs/plugin-vue';
import dts from 'rollup-plugin-dts';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json' assert { type: 'json' };

const version = pkg.version;
const commonOptions = {
  plugins: [
    vue({
      isProduction: true,
      template: { compilerOptions: { comments: false } },
    }),
    typescript(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env["NODE_ENV"]': JSON.stringify('production'),
      "process.env['NODE_ENV']": JSON.stringify('production'),
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
      VERSION: JSON.stringify(version),
      preventAssignment: false,
    }),
    nodeResolve({ preferBuiltins: true }),
    commonjs(),
    terser(),
  ],
  treeshake: 'smallest',
};

const babelPlugin = getBabelOutputPlugin({
  moduleId: 'Waline',
  presets: [['@babel/preset-env', { modules: 'umd' }]],
});

export default [
  // TODO: Remove this in future

  // legacy package
  {
    input: './src/entries/legacy.ts',
    output: [
      {
        file: './dist/legacy.umd.js',
        format: 'umd',
        name: 'Waline',
        exports: 'default',
        sourcemap: true,
      },
    ],
    ...commonOptions,
    plugins: [
      vue({
        isProduction: true,
        template: { compilerOptions: { comments: false } },
      }),
      typescript(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env["NODE_ENV"]': JSON.stringify('production'),
        "process.env['NODE_ENV']": JSON.stringify('production'),
        __VUE_OPTIONS_API__: false,
        __VUE_PROD_DEVTOOLS__: false,
        VERSION: JSON.stringify(version),
        preventAssignment: false,
      }),
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        presets: [['@babel/preset-env']],
      }),
      terser(),
    ],
  },

  // legacy declaration files
  {
    input: './src/entries/legacy.ts',
    output: [{ file: './dist/legacy.umd.d.ts', format: 'esm' }],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },

  // full package
  {
    input: './src/entries/full.ts',
    output: [
      {
        file: './dist/waline.js',
        format: 'esm',
        sourcemap: true,
        plugins: [babelPlugin, terser()],
      },
      {
        file: './dist/waline.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/waline.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    ...commonOptions,
  },

  // full declaration files
  {
    input: './src/entries/full.ts',
    output: [
      { file: './dist/waline.d.ts', format: 'esm' },
      { file: './dist/waline.d.cts', format: 'esm' },
      { file: './dist/waline.d.mts', format: 'esm' },
    ],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },

  // shim package
  {
    input: './src/entries/full.ts',
    output: [
      {
        file: './dist/shim.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/shim.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    ...commonOptions,
    external: ['@vueuse/core', 'autosize', 'marked', 'vue'],
  },

  // shim declaration files
  {
    input: './src/entries/full.ts',
    output: [
      { file: './dist/shim.d.cts', format: 'esm' },
      { file: './dist/shim.d.mts', format: 'esm' },
    ],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },

  // components
  {
    input: './src/entries/components.ts',
    output: [
      {
        file: './dist/component.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    external: ['@vueuse/core', 'autosize', 'marked', 'vue'],
    ...commonOptions,
  },

  // components declaration files
  // TODO: Generate declaration files

  // api
  {
    input: './src/entries/api.ts',
    output: [
      {
        file: './dist/api.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/api.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    ...commonOptions,
  },

  // api declaration files
  {
    input: './src/entries/api.ts',
    output: [
      { file: './dist/api.d.ts', format: 'esm' },
      { file: './dist/api.d.cts', format: 'esm' },
      { file: './dist/api.d.mts', format: 'esm' },
    ],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },

  // comment
  {
    input: './src/entries/comment.ts',
    output: [
      {
        file: './dist/comment.js',
        format: 'esm',
        sourcemap: true,
        plugins: [babelPlugin, terser()],
      },
      {
        file: './dist/comment.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/comment.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    ...commonOptions,
  },

  // comment declaration files
  {
    input: './src/entries/comment.ts',
    output: [
      { file: './dist/comment.d.ts', format: 'esm' },
      { file: './dist/comment.d.cts', format: 'esm' },
      { file: './dist/comment.d.mts', format: 'esm' },
    ],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },

  // pageview
  {
    input: './src/entries/pageview.ts',
    output: [
      {
        file: './dist/pageview.js',
        format: 'esm',
        sourcemap: true,
        plugins: [babelPlugin, terser()],
      },
      {
        file: './dist/pageview.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/pageview.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    ...commonOptions,
  },

  // pageview declaration files
  {
    input: './src/entries/pageview.ts',
    output: [
      { file: './dist/pageview.d.ts', format: 'esm' },
      { file: './dist/pageview.d.cts', format: 'esm' },
      { file: './dist/pageview.d.mts', format: 'esm' },
    ],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },
];

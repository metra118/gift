import esbuild from 'esbuild'
import { rm } from 'fs/promises'

const OUT_DIR = 'dist'

const isWatch = process.argv.includes('--watch')

await rm(OUT_DIR, { recursive: true, force: true })

await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  platform: 'node',
  target: 'esnext',
  watch: isWatch,
  sourcemap: true,
  outfile: `${OUT_DIR}/main.js`,
  external: [
    '@nestjs/microservices',
    'cache-manager',
    '@nestjs/websockets/socket-module',
    'point-of-view',
    '@fastify/static',
  ],
})

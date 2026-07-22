import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

// eslint-config-next is pinned to ^15 in package.json to match the installed
// Next.js version. npm otherwise resolves it to the latest major (16.x),
// which threw a "circular structure to JSON" error in next lint's
// flat-config handling. Upgrade both together when moving to Next 16.
const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
]

export default eslintConfig

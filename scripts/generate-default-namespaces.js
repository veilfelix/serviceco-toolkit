const fs = require('fs')
const path = require('path')

const localesPath = path.resolve(__dirname, '../public/locales')
const outputFile = path.resolve(__dirname, '../src/utils/i18nNamespaces.generated.ts')

function getNamespaces() {
  const enPath = path.join(localesPath, 'en')
  if (!fs.existsSync(enPath)) return []

  return fs
    .readdirSync(enPath)
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.replace('.json', ''))
    .sort()
}

const namespaces = getNamespaces()
const output =
  '/* eslint quotes: off */\n' +
  `// This file is auto-generated. Do not edit manually.\n` +
  `export const defaultNamespaces = ${JSON.stringify(namespaces, null, 2)} as const\n`

fs.writeFileSync(outputFile, output)
console.log(`✅ Generated defaultNamespaces with ${namespaces.length} entries.`)

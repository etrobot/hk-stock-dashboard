import { promises as fs } from 'fs'
import path from 'path'

const docsDir = path.resolve(process.cwd(), 'Docs')
const outFile = path.resolve(process.cwd(), 'app', 'data', 'generated-docs.json')

async function run() {
  const entries = await fs.readdir(docsDir)
  const docs = []
  for (const file of entries) {
    if (!file.endsWith('.md')) continue
    const filePath = path.join(docsDir, file)
    const content = await fs.readFile(filePath, 'utf-8')
    const id = path.basename(file, '.md')
    // Title: first heading (# ...), fallback to id
    const match = content.match(/^#\s+(.+?)\s*$/m)
    const title = match ? match[1] : id
    docs.push({ id, title, content })
  }
  await fs.mkdir(path.dirname(outFile), { recursive: true })
  await fs.writeFile(outFile, JSON.stringify({ docs }, null, 2), 'utf-8')
  console.log(`Wrote ${docs.length} docs to ${outFile}`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})

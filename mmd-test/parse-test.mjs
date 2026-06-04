import { readFileSync } from 'fs';
const mermaidMod = await import('/tmp/node_modules/mermaid/dist/mermaid.esm.min.mjs');
const mermaid = mermaidMod.default;
mermaid.initialize({ startOnLoad: false, securityLevel: 'loose' });
const files = ['/workspace/mmd-test/test-seq.mmd', '/workspace/mmd-test/test-flow.mmd'];
for (const file of files) {
  const code = readFileSync(file, 'utf8');
  try {
    await mermaid.parse(code);
    console.log('OK ' + file);
  } catch (e) {
    console.log('FAIL ' + file + ': ' + (e.message || e.str || JSON.stringify(e).slice(0, 300)));
    process.exit(1);
  }
}

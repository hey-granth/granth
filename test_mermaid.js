import mermaid from 'mermaid';
import { JSDOM } from 'jsdom';

const dom = new JSDOM();
global.window = dom.window;
global.document = dom.window.document;

mermaid.initialize({ startOnLoad: false, theme: 'default' });
const { svg } = await mermaid.render('test', 'graph TD;\n A-->B;');
console.log(svg);

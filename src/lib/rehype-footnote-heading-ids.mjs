import Slugger from 'github-slugger';
import { visit } from 'unist-util-visit';

// Astro counts the footnote reference text ("1") in heading slugs. Kramdown,
// which produced the canonical anchors, did not. Compute IDs without <sup>
// footnote markers so links like #remember keep working.
export function rehypeFootnoteHeadingIds() {
  return (tree) => {
    const slugger = new Slugger();
    visit(tree, 'element', (node) => {
      if (!/^h[2-6]$/.test(node.tagName)) return;

      let text = '';
      const walk = (child) => {
        if (child.type === 'element' && child.tagName === 'sup') {
          return;
        }
        if (child.type === 'text') text += child.value;
        if (child.children) child.children.forEach(walk);
      };
      node.children.forEach(walk);
      node.properties = node.properties || {};
      node.properties.id = slugger.slug(text);
    });
  };
}

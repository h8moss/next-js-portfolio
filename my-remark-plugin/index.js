import { visit } from "unist-util-visit";
import { h } from 'hastscript/html.js';

const noteDirective = ({
  tag = 'p',
  className = 'note',
  titleClass = 'title'
}) => {

  const onDirective = (node) => {
    if (node.name !== 'note') return;

    var data = node.data || (node.data = {})

    data.hName = tag ? tag : 'p';
    data.hProperties = node.attributes;

    data.hProperties.class += ' ' + className;

    for (let c of node.children) {
      if (c.type === 'paragraph' && c.data?.directiveLabel) {
        const cData = c.data || (c.data = {});
        const cProps = cData.hProperties || (cData.hProperties = {});

        cProps.class = titleClass;
      }
    }

  }

  const transform = (tree) => {
    visit(tree, (node) => console.log({
      node,
      'this-is-a-node': true,
    }))
    visit(tree, ['textDirective', 'leafDirective', 'containerDirective'], onDirective)
  }

  return transform
};

export default noteDirective;
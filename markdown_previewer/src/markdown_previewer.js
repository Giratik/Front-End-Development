import React, { useState, useEffect } from 'react';
import './markdown_previewer_style.css';
import { marked } from 'marked';  // Changed the import
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const defaultMarkdown = `# This is a big header (H1 size)

## This is a less big header (H2 size)

You can pass link [here](https://www.example.com).

Here is some inline code: \`console.log('Hello, world!');\`

Block code works with three brackets (alt gr + 7), just like Discord:
\`\`\`javascript
// This is a code block
function add(9, 2) {
  return 21;
}
\`\`\`

- This is a list item
  - List item²
    - List item³

> This is a blockquote

If you have an image, pass it down there:
![And if you can't, write in the place holder ](https://via.placeholder.com/150)

**This text is a bold one**

This text was cut in half  
by a line break

>bup`;



const MarkDownPreviewer = () => {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [previewHTML, setPreviewHTML] = useState('');

  useEffect(() => {
    const updatePreview = () => {
      const html = marked(markdown, {
        breaks: true,
        highlight: function (code, lang) {
          if (Prism.languages[lang]) {
            return Prism.highlight(code, Prism.languages[lang], lang);
          } else {
            return code;
          }
        },
      });
      setPreviewHTML(html);
    };

    updatePreview();
  }, [markdown]);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <div id="app">
      <div className="editorWrap">
        <div className="toolbar">
          <i className="fa fa-free-code-camp" title="no-stack-dub-sack"></i>
          Editor
          <i className="fa fa-arrows-alt"></i>
        </div>
        <textarea
          id="editor"
          type="text"
          value={markdown}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="converter"></div>
      <div className="previewWrap">
        <div className="toolbar">
          <i className="fa fa-free-code-camp" title="no-stack-dub-sack"></i>
          Previewer
          <i className="fa fa-arrows-alt"></i>
        </div>
        <div id="preview" dangerouslySetInnerHTML={{ __html: previewHTML }} />
      </div>
    </div>
  );
};

export default MarkDownPreviewer;
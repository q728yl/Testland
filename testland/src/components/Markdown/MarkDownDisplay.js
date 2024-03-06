import React, { Component } from 'react';
import Vditor from 'vditor';

const markdownContent = `
### A Markdown editor, now in split screen preview mode. 
Try editing the current text!
You can click on the left symbol of (...) in the upper right corner to switch between the following three modes:

* Source（Alt+Ctrl+7）
* Preview（Alt+Ctrl+8）
* Split screen preview（Alt+Ctrl+9）
`;

class MarkdownDisplay extends Component {
  constructor(props) {
    super(props);
    this.previewRef = React.createRef();
    this.state = {
      htmlContent: '',
    };
  }

  componentDidMount() {
    Vditor.preview(this.previewRef.current, markdownContent, {
      hljs: { style: 'github' },
      after: () => {
        this.setState({ htmlContent: this.previewRef.current.innerHTML });
      },
    });
  }

  render() {
    const { htmlContent } = this.state;

    return (
      <div ref={this.previewRef} dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
    );
  }
}

export default MarkdownDisplay;

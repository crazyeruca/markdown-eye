import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';
import { Upload, Icon } from 'antd';

import marked from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  sanitize: true,
  smartLists: true,
  smartypants: true
});

const Dragger = Upload.Dragger;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.showMarkdown = this.showMarkdown.bind(this);
  }

  showMarkdown(file) {
    const reader = new FileReader();
    reader.onload = e => {
      document.getElementById("mark_content").innerHTML = marked(e.target.result); 
    }
    reader.readAsText(file);
  }

  render() {
    return (
      <div id="mark_content" style={{marginLeft:10, marginTop: 10}}>
        <div style={{ marginTop: 200, marginLeft: 200, height: 180, width: 500 }}>
          <Dragger
            action=""
            accept=".md"
            showUploadList={false}
            beforeUpload={this.showMarkdown}
          >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击或将md文件拖拽到此区域</p>
          </Dragger>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.body);
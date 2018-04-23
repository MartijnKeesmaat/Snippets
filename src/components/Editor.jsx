import React, { Component } from 'react';
import { render } from 'react-dom';
import AceEditor from 'react-ace';
import 'brace/mode/jsx';

import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import 'brace/theme/xcode';

const defaultValue = `function onLoad(editor) {
  console.log("i've loaded");
}`;

class Editor extends React.Component {
  onChange(newValue) {
    console.log('change', newValue);
    this.setState({
      value: newValue
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      value: defaultValue,
      theme: 'xcode',
      mode: 'jsx',
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      fontSize: 12,
      showGutter: true,
      showPrintMargin: true,
      highlightActiveLine: true,
      enableSnippets: false,
      showLineNumbers: true
    };
  }

  render() {
    return (
      <div>
        <AceEditor
          mode={this.state.mode}
          theme={this.state.theme}
          onValidate={this.onValidate}
          value={this.state.value}
          height={'250px'}
          fontSize={this.state.fontSize}
          showPrintMargin={this.state.showPrintMargin}
          showGutter={this.state.showGutter}
          highlightActiveLine={this.state.highlightActiveLine}
          setOptions={{
            enableBasicAutocompletion: this.state.enableBasicAutocompletion,
            enableLiveAutocompletion: this.state.enableLiveAutocompletion,
            enableSnippets: this.state.enableSnippets,
            showLineNumbers: this.state.showLineNumbers,
            tabSize: 2
          }}
        />
      </div>
    );
  }
}

export default Editor;

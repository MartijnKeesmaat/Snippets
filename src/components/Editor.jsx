import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/jsx';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import 'brace/theme/github';

const defaultValue = `//code here`;

const languages = [
  'javascript',
  'java',
  'python',
  'xml',
  'ruby',
  'sass',
  'markdown',
  'mysql',
  'json',
  'html',
  'handlebars',
  'golang',
  'csharp',
  'elixir',
  'typescript',
  'css'
];

languages.forEach(lang => {
  require(`brace/mode/${lang}`);
  require(`brace/snippets/${lang}`);
});

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: defaultValue,
      mode: 'jsx',
      theme: 'github',
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      fontSize: 12,
      showGutter: true,
      showPrintMargin: true,
      highlightActiveLine: true,
      enableSnippets: false,
      showLineNumbers: true
    };
    this.setMode = this.setMode.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(newValue) {
    const value = this.state.value;
    this.setState({
      value: newValue
    });
    this.props.getSnippetCode(this.state.value, this.props.index);
  }

  setMode(e) {
    this.setState({
      mode: e.target.value
    });
  }

  render() {
    return (
      <div>
        <label>Language:</label>
        <p className="control">
          <span className="select">
            <select name="mode" onChange={this.setMode} value={this.state.mode}>
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </span>
        </p>

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
          editorProps={{ $blockScrolling: Infinity }}
          onChange={this.onChange}
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

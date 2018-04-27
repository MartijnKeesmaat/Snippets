import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/jsx';

import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import 'brace/theme/xcode';

const defaultValue = '';

class SnippetDetail extends React.Component {
  state = {
    value: defaultValue,
    theme: 'xcode',
    mode: 'jsx',
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: false,
    fontSize: 14,
    showGutter: true,
    showPrintMargin: true,
    highlightActiveLine: true,
    enableSnippets: false,
    showLineNumbers: true
  };

  render() {
    const snippets = this.props.snippets;
    const asn = this.props.activeSnippet;

    if (this.props.snippets.length > 0) {
      this.state.value = snippets[asn].files[0];
      return (
        <div className="main-content__inner main-content__inner--detail">
          <h4>{snippets[asn].title}</h4>
          <small>{snippets[asn].dateCreated}</small>
          <small>{snippets[asn].timeCreated}</small>
          <p>{snippets[asn].description}</p>

          {snippets[asn].files.map((key, index) => (
            <AceEditor
              key={key}
              mode={this.state.mode}
              theme={this.state.theme}
              onValidate={this.onValidate}
              value={snippets[asn].files[index]}
              fontSize={this.state.fontSize}
              showPrintMargin={this.state.showPrintMargin}
              showGutter={this.state.showGutter}
              height={'200px'}
              highlightActiveLine={this.state.highlightActiveLine}
              readOnly={true}
              setOptions={{
                enableBasicAutocompletion: this.state.enableBasicAutocompletion,
                enableLiveAutocompletion: this.state.enableLiveAutocompletion,
                enableSnippets: this.state.enableSnippets,
                showLineNumbers: this.state.showLineNumbers,
                tabSize: 2
              }}
            />
          ))}
        </div>
      );
    }
    return (
      <div className="main-content__inner main-content__inner--detail">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt="Loading"
          width="150px"
        />
      </div>
    );
  }
}

export default SnippetDetail;

// import React from 'react';
// import brace from 'brace';
// import AceEditor from 'react-ace';

// import 'brace/mode/java';
// import 'brace/theme/xcode';

// function onChange(newValue) {
//   console.log('change', newValue);
// }

// class SnippetDetail extends React.Component {
//   render() {
//     (
//       <AceEditor
//         mode="java"
//         theme="xcode"
//         onChange={onChange}
//         name="UNIQUE_ID_OF_DIV"
//         editorProps={{ $blockScrolling: true }}
//       />
//     ),
//       document.getElementById('example');

//   }
// }

// export default SnippetDetail;

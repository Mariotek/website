webpackJsonp([20],{110:/*!**********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/boilerplates/preact/codepan.js ***!
  \**********************************************************************//*! dynamic exports provided *//*! all exports used */function(a){a.exports="/* @jsx h */\nconst { Component, h, render } = preact\n\nclass App extends Component {\n  state = {\n    count: 0\n  }\n\n  inc = () => this.setState({\n    count: this.state.count + 1\n  })\n\n  dec = () => this.setState({\n    count: this.state.count - 1\n  })\n\n  render() {\n    return (\n      <div>\n        <h2>{ this.state.count }</h2>\n        <button onClick={this.inc}>Increment</button>\n        <button onClick={this.dec}>Decrement</button>\n      </div>\n    )\n  }\n}\n\nrender(<App />, document.body)\n"}});
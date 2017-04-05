import MyGame from './game';
import Title from './title';
import React, { Component, PropTypes } from 'react';

class App extends Component {
  constructor(){
    super();
    this.state={};
    this.state.scene="title";
  }

  callback(val: string){
    this.setState({scene: val})
  }

  render(){
    switch(this.state.scene){
      case "title":
        return <Title cb={this.callback.bind(this)} />
        break;

      case "game":
        return <MyGame cb={this.callback.bind(this)} />
        break;
    }
  }

}
module.exports = App;

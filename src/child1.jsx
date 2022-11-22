import React, { PureComponent } from "react";
// import shallowCompare from "react-addons-shallow-compare"; // ES6

export default class Child1 extends PureComponent {
  //   shouldComponentUpdate(nextProps, nextState) {
  //     return shallowCompare(this, nextProps, nextState);
  //     // if (this.props !== nextProps || this.state !== nextState) {
  //     //   return true;
  //     // }
  //     // return false;
  //   }

  componentDidMount() {
    document.addEventListener("mousemove", this.mouseMove);
    this.interval = setInterval(() => {
      console.log("interval");
    }, 1000);
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.mouseMove);
    clearInterval(this.interval);
  }

  mouseMove = () => {
    console.log("mouse move");
  };

  render() {
    console.log("child 1");
    // const { counter } = this.props;
    return <div>{`Child 1 `}</div>;
  }
}

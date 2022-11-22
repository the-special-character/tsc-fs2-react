import { Component, createRef } from "react";
import Child1 from "./child1";
import Child2 from "./child2";

const bgColor = "yellow";
const clr = "black";

// Mounting

// 1. Constructor

// updating

// ->

// unmounting

// Error

// let counter = 0;

class App extends Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    this.state = {
      counter: 0,
      trainerName: "Yagnesh",
      data: null,
      // greetUser: `Hello ${props.name}`,
    };
    // this.increment = this.increment.bind(this);
    this.h1Ref = createRef();
    // api call
  }

  static getDerivedStateFromProps(props, state) {
    return {
      greetUser: `Hello ${props.name}`,
    };
  }

  async componentDidMount() {
    console.log(document.getElementById("heading"));
    this.h1Ref.current.style.color = "red";
    this.h2Ref.style.color = "blue";
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      const json = await res.json();
      console.log(json);
      this.setState({ data: json });
    } catch (error) {}
  }

  componentDidUpdate(prevProps, prevState) {}

  increment = () => {
    this.setState(({ counter }, props) => {
      return { counter: counter + 1 };
    });
  };

  descrement() {
    this.setState(({ counter }, props) => {
      return { counter: counter - 1 };
    });
  }

  render() {
    // throw new Error("sometjhiawfdas");
    // const { name, designation } = this.props;
    const { designation } = this.props;
    const { counter, trainerName, greetUser, data } = this.state;
    console.log(`render ${name}`);
    console.log(document.getElementById("heading"));

    return (
      <>
        {counter < 5 && (
          <div>
            <h1
              id="heading"
              ref={this.h1Ref}
              className="cls"
              style={{
                backgroundColor: bgColor,
                color: clr,
                fontSize: 40,
              }}
            >
              {greetUser}
            </h1>
            <h2
              ref={(h2Ref) => {
                this.h2Ref = h2Ref;
              }}
            >
              {designation}
            </h2>
            <h3>{trainerName}</h3>
          </div>
        )}
        <h2>{data?.title}</h2>
        <div>
          <button type="button" onClick={this.increment}>
            +
          </button>
          <p>{counter}</p>
          <button type="button" onClick={this.descrement}>
            -
          </button>
          {counter < 5 && <Child1 />}
          <Child2 />
        </div>
      </>
    );
  }
}

// App.getDerivedStateFromProps = (props, state) => {
//   console.log("getDerivedStateFromProps", state);
//   return {
//     greetUser: `Hello ${props.name}`,
//   };
// };

// const App = ({ name, designation }) => {
//   return (
//     <>
//       <div>
//         <h1
//           className="cls"
//           style={{
//             backgroundColor: bgColor,
//             color: clr,
//             fontSize: 40,
//           }}
//         >
//           {name}
//         </h1>
//         <h2>{designation}</h2>
//       </div>
//       <div>
//         <input type="checkbox" />
//       </div>
//     </>
//   );
// };

export default App;

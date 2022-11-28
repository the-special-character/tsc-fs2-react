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
  render() {
    return (
      <div>
        <Child2 value={5} />
      </div>
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

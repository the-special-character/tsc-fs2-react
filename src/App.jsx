import { Component } from "react";

const bgColor = "yellow";
const clr = "black";

class App extends Component {
  state = {
    counter: 1,
  };

  render() {
    // const { name, designation } = this.props;
    const { name, designation } = this.props;
    const { counter } = this.state;

    return (
      <>
        <div>
          <h1
            className="cls"
            style={{
              backgroundColor: bgColor,
              color: clr,
              fontSize: 40,
            }}
          >
            {`Mr. ${name}`}
          </h1>
          <h2>{designation}</h2>
        </div>
        <div>
          <input type="checkbox" />
        </div>
        <div>
          <button
            type="button"
            onClick={() =>
              this.setState(({ counter }) => ({ counter: counter + 1 }))
            }
          >
            +
          </button>
          <p>{counter}</p>
          <button
            type="button"
            onClick={() =>
              this.setState(({ counter }) => ({ counter: counter - 1 }))
            }
          >
            -
          </button>
        </div>
      </>
    );
  }
}

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

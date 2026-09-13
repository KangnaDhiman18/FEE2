import { useState } from "react";
import "./App.css";

function App() {

  // Counter 1
  const [count1, setCount1] = useState(0);

  // Counter 2
  const [count5, setCount5] = useState(0);

  // Counter 3
  const [count10, setCount10] = useState(0);

  return (
    <div className="container">

      <h1>Multiple Counters</h1>

      {/* Counter +1 / -1 */}
      <div className="counter">
        <h2>Counter 1</h2>

        <h3>{count1}</h3>

        <button onClick={() => setCount1(count1 + 1)}>
          +1
        </button>

        <button onClick={() => setCount1(count1 - 1)}>
          -1
        </button>
      </div>


      {/* Counter +5 / -5 */}
      <div className="counter">
        <h2>Counter 5</h2>

        <h3>{count5}</h3>

        <button onClick={() => setCount5(count5 + 5)}>
          +5
        </button>

        <button onClick={() => setCount5(count5 - 5)}>
          -5
        </button>
      </div>


      {/* Counter +10 / -10 */}
      <div className="counter">
        <h2>Counter 10</h2>

        <h3>{count10}</h3>

        <button onClick={() => setCount10(count10 + 10)}>
          +10
        </button>

        <button onClick={() => setCount10(count10 - 10)}>
          -10
        </button>
      </div>

    </div>
  );
}

export default App;
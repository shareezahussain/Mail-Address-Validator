import "./styles.css";
import "./tailwind-pre-build.css";
import { Tab } from "./components/Tab";

export default function App() {
  return (
    <div className="App">
      <h1>Address Validator</h1>
      <Tab />
    </div>
  );
}

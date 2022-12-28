import Viewport from "./components/system/Viewport";
import {AppsContextProvider} from "./contexts/AppsContext";

function App() {
    return (
        <AppsContextProvider>
            <Viewport/>
        </AppsContextProvider>
    )
}

export default App

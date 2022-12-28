import Desktop from "./Desktop";
import Taskbar from "./Taskbar";

const Viewport = () => {
    return (
        <main className="relative overflow-hidden">
            <Desktop/>
            <Taskbar/>
        </main>
    );
}
export default Viewport;
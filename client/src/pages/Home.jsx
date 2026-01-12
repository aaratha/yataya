import { useEffect, useState } from "react";
import HeadingBar from "../components/HeadingBar.jsx";

function Home() {
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetch("/api/hello")
            .then((res) => res.json())
            .then((data) => setMsg(data.message));
    }, []);

    return (
        <div className="app-shell">
            <HeadingBar />
            <section className="panel surface">
                <div className="card surface">
                    <h1>Yataya</h1>
                    <p className="muted">{msg}</p>
                </div>

                <div className="card surface">
                    <p>
                        Edit <code>src/pages/Home.jsx</code> to keep iterating.
                    </p>
                </div>

                <div className="card surface">
                    <p>
                        Edit <code>src/pages/Home.jsx</code> to keep iterating.
                    </p>
                </div>

                <div className="card surface">
                    <p>
                        Edit <code>src/pages/Home.jsx</code> to keep iterating.
                    </p>
                </div>

                <div className="card surface">
                    <p>
                        Edit <code>src/pages/Home.jsx</code> to keep iterating.
                    </p>
                </div>


            </section>
        </div>
    );
}

export default Home;

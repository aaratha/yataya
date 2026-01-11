import { useEffect, useState } from "react";
import HeadingBar from "../components/HeadingBar.jsx";

function Support() {
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetch("/api/hello")
            .then((res) => res.json())
            .then((data) => setMsg(data.message));
    }, []);

    return (
        <div className="app-shell">
            <HeadingBar />
            <section className="panel">
                <div className="card">
                    <h1>Yataya</h1>
                    <p className="muted">{msg}</p>
                </div>

                <div className="card">
                    <p>
                        Edit <code>src/pages/Support.jsx</code> to keep iterating.
                    </p>
                </div>

                <div className="card">
                    <p>
                        Edit <code>src/pages/Support.jsx</code> to keep iterating.
                    </p>
                </div>

            </section>
        </div>
    );
}

export default Support;

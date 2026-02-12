import { useEffect, useState } from "react";

function Home() {
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetch("/api/hello")
            .then((res) => res.json())
            .then((data) => setMsg(data.message));
    }, []);

    return (
        <section className="panel surface">
            <div className="card surface">
                <h1>Yataya</h1>
                <p>{msg}</p>
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
    );
}

export default Home;

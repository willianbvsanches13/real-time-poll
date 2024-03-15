import { useState } from "react";

export function Home(): JSX.Element {
  const [poll, setPoll] = useState("");
  return (
    <div>
      <button style={{ fontSize: 40 }} >Create New Poll</button>
      <div style={{ marginTop: 20 }} >
        <input placeholder="Put Poll code to search" style={{ margin: 0 }} type="text" value={poll} onChange={(e) => setPoll(e.target.value)} />
        <button style={{ margin: 0 }}>Search</button>
      </div>
    </div>
  );
}

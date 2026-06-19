//app/error.tsx

'use client';

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <h2>Something went wrong 😢</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

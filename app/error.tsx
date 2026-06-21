//app/error.tsx

'use client';

// export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <h2>Something went wrong 😢</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
    //  <div style={{ textAlign: "center", padding: 40 }}> main version
    //   <h2>Something went wrong 😢</h2>
    //   <button onClick={() => reset()}>Try again</button>
    // </div>
  );
}
// // return ( my version
//   //    <html>
//   //    <body>
//   //     <h2>Something went wrong 😢</h2>
//   //     <button onClick={() => reset()}>Try again</button>
//   //    </body>
//   //   </html>
//   // );
//   return (
//     <div>
//       <h2>Something went wrong 😢</h2>
//       <button onClick={() => reset()}>Try again</button>
//     </div>
//   );
// }

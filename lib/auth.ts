//lib/auth.ts

const BASE_URL = "http://localhost:5000/auth";

export async function registerUser(values: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error");
  }

  return data;
}
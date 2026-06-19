// lib/auth.ts

export const registerUser = async (data: any) => {
  const res = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include", 
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  return result;
};

export const getMe = async () => {
  const res = await fetch("http://localhost:3000/auth/me", {
    credentials: "include", 
  });

  if (!res.ok) {
    throw new Error("Not authorized");
  }

  return res.json();
};
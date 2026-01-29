"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { saveAuth } from "@/utils/auth";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const RegisterPage = () => {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");
  const [available, setAvailable] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  const suggestions = email ? suggestUsernames(email) : [];

  /* ---------- Username Check ---------- */
  const checkUsername = async (value: string) => {
    const normalized = value.toLowerCase().trim();
    setUsername(normalized);

    // Minimum length guard
    if (normalized.length < 3) {
      setAvailable(null);
      return;
    }

    setChecking(true);
    setAvailable(null);

    try {
      const res = await fetch(`${BASE_API_URL}/auth/check-username`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: normalized }),
      });

      const data = await res.json();
      setAvailable(data.available);
    } catch {
      setAvailable(false);
    } finally {
      setChecking(false);
    }
  };

  /* ---------- Register ---------- */
  const register = async () => {
    setError("");

    try {
      const res = await fetch(`${BASE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      saveAuth(data.token, data.user_id);
      router.replace("/dashboard");
    } catch {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl border">
         <h1 className="text-2xl font-semibold text-center">Welcome To CloudXS</h1>
        <p className="text-sm text-gray-600 text-center mt-1">
            Create your account to get started
        </p>
        {/* <h1 className="text-xl font-semibold text-center">
          {step === 1 ? "Create account" : "Choose a username"}
        </h1> */}

        {/* ---------- STEP 1 ---------- */}
        {step === 1 && (
          <div className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
            />

            <button
              disabled={!email || !password}
              onClick={() => setStep(2)}
              className="w-full bg-green-600 text-white py-2 rounded-lg disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        )}

        {/* ---------- STEP 2 ---------- */}
        {step === 2 && (
          <div className="mt-6 space-y-4">
            <input
              value={username}
              onChange={(e) => checkUsername(e.target.value)}
              placeholder="Username"
              className="w-full border px-3 py-2 rounded-lg"
            />

            {/* Status Messages */}
            {checking && (
              <p className="text-sm text-gray-500">
                Checking availability…
              </p>
            )}

            {available === false && !checking && (
              <p className="text-sm text-red-600">
                Username already taken
              </p>
            )}

            {available === true && !checking && (
              <p className="text-sm text-green-600">
                Username available
              </p>
            )}

            {/* Suggestions */}
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => checkUsername(s)}
                  className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
                >
                  {s}
                </button>
              ))}
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              disabled={!available || checking}
              onClick={register}
              className="w-full bg-green-600 text-white py-2 rounded-lg disabled:opacity-50"
            >
              {checking ? "Checking…" : "Create Account"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;

/* ---------- Helpers ---------- */

const suggestUsernames = (email: string) => {
  const base = email.split("@")[0].toLowerCase();
  return [
    base,
    `${base}_dev`,
    `${base}_cloud`,
    `${base}${Math.floor(Math.random() * 1000)}`,
  ];
};

"use client";

import {
  getToken,
  getUserId,
  isTokenValid,
} from "@/utils/auth";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL!;

type ApiKey = {
  id: number;
  name: string;
  created_at: string;
  is_active: boolean;
};

const ApiKeysPage = () => {
  const router = useRouter();
  const user_id = getUserId();
  const isLoggedIn = isTokenValid() && Boolean(user_id);
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openShow, setOpenShow] = useState(false);
  const [openLoginPrompt, setOpenLoginPrompt] =
    useState(false);
  const [keyName, setKeyName] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");

  const fetchKeys = useCallback(async () => {
    if (!isLoggedIn || !user_id) {
      setKeys([]);
      return;
    }

    try {
      const res = await fetch(
        `${BASE_API_URL}/apikey/get-apikeys?user_id=${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch API keys");
      }

      const data = await res.json();
      setKeys(data.api_keys || []);
    } catch {
      setKeys([]);
    }
  }, [isLoggedIn, user_id]);

  useEffect(() => {
    fetchKeys();
  }, [fetchKeys]);

  const openCreateFlow = () => {
    if (!isLoggedIn) {
      setOpenLoginPrompt(true);
      return;
    }
    setOpenCreate(true);
  };

  const createKey = async () => {
    if (!isLoggedIn || !keyName || !user_id) {
      setOpenCreate(false);
      setOpenLoginPrompt(true);
      return;
    }

    const res = await fetch(
      `${BASE_API_URL}/apikey/create-apikey`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          user_id,
          name: keyName.trim(),
        }),
      }
    );

    const data = await res.json();

    if (!res.ok || !data.api_key) {
      toast("Could not create API key");
      return;
    }

    setGeneratedKey(data.api_key);
    setOpenCreate(false);
    setOpenShow(true);
    setKeyName("");
    fetchKeys();
  };

  const copyKey = async () => {
    await navigator.clipboard.writeText(generatedKey);
    toast("API key copied");
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-semibold">API Keys</h1>
        <button
          onClick={openCreateFlow}
          className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Create New Key
        </button>
      </div>

      <div className="mt-8 overflow-x-auto bg-white rounded-xl border">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Created At</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {keys.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={4}>
                  No API keys found.
                </td>
              </tr>
            ) : (
              keys.map((key) => (
                <tr
                  key={key.id}
                  className="border-b last:border-none"
                >
                  <td className="px-4 py-3">{key.name}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(
                      key.created_at
                    ).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        key.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {key.is_active
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    Revoke
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {openCreate && (
        <Modal onClose={() => setOpenCreate(false)}>
          <h2 className="text-lg font-semibold mb-4">
            Create API Key
          </h2>

          <label className="block text-sm font-medium mb-1">
            Key Name
          </label>
          <input
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            placeholder="Production Key"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
          />

          <div className="mt-4 bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm p-3 rounded-lg">
            This API key will be shown only once.
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setOpenCreate(false)}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              disabled={!keyName.trim()}
              onClick={createKey}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              Create Key
            </button>
          </div>
        </Modal>
      )}

      {openShow && (
        <Modal onClose={() => setOpenShow(false)}>
          <h2 className="text-lg font-semibold mb-4">
            Your API Key
          </h2>

          <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm break-all">
            {generatedKey}
          </div>

          <button
            onClick={copyKey}
            className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Copy API Key
          </button>

          <div className="mt-4 bg-red-50 border border-red-300 text-red-800 text-sm p-3 rounded-lg">
            Save this key now. Once this dialog is closed, it
            will not be shown again.
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setOpenShow(false)}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg"
            >
              I have saved it
            </button>
          </div>
        </Modal>
      )}

      {openLoginPrompt && (
        <Modal onClose={() => setOpenLoginPrompt(false)}>
          <h2 className="text-lg font-semibold mb-2">
            Login Required
          </h2>
          <p className="text-sm text-gray-600">
            Please log in first to create and manage API keys.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setOpenLoginPrompt(false)}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => router.push("/login")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Go to Login
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

const Modal = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => (
  <div
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-xl w-full max-w-md p-6"
      onClick={(event) => event.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

export default ApiKeysPage;

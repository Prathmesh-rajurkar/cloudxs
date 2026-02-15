"use client";

import React, { useEffect, useState } from "react";
import { getToken, getUserId } from "@/utils/auth";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL!;

interface AnalyticsData {
  totalUploads: number;
  uploadsByType: Record<string, number>;
  totalStorageUsed: number;
}

const formatBytes = (bytes: number) => {
  if (!bytes) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

const Page = () => {
  const user_id = getUserId();

  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  const [startDate, setStartDate] = useState(
    oneMonthAgo.toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    today.toISOString().split("T")[0]
  );

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [graphData, setGraphData] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const fetchAnalytics = async () => {
    const res = await fetch(
      `${BASE_API_URL}/analytics/analytics?user_id=${user_id}`,
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    const data = await res.json();
    setAnalytics(data);
  };

  const fetchGraphData = async () => {
    const res = await fetch(
      `${BASE_API_URL}/analytics/graph-data?user_id=${user_id}&start_date=${startDate}&end_date=${endDate}`,
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    const data = await res.json();
    setGraphData(data.uploadsByDate || {});
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  useEffect(() => {
    fetchGraphData();
  }, [startDate, endDate]);

  const handleDateChange = (newStart: string, newEnd: string) => {
    const diff =
      new Date(newEnd).getTime() - new Date(newStart).getTime();
    const maxRange = 30 * 24 * 60 * 60 * 1000;
    setError("");

    if (diff > maxRange+1) {
      setError("Date range cannot exceed 1 month");
      setGraphData({});
    }

    setStartDate(newStart);
    setEndDate(newEnd);
  };

  const graphEntries = Object.entries(graphData);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Usage Analytics
      </h1>

      {/* Top Analytics Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">Total Uploads</p>
          <h2 className="text-2xl font-semibold mt-2">
            {analytics?.totalUploads ?? 0}
          </h2>
        </div>

        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">Total Storage Used</p>
          <h2 className="text-2xl font-semibold mt-2">
            {formatBytes(analytics?.totalStorageUsed || 0)}
          </h2>
        </div>

        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">Uploads By Type</p>
          <div className="mt-2 text-sm space-y-1">
            {analytics?.uploadsByType
              ? Object.entries(analytics.uploadsByType).map(
                  ([type, count]) => (
                    <div key={type} className="flex justify-between">
                      <span>{type}</span>
                      <span>{count}</span>
                    </div>
                  )
                )
              : "No data"}
          </div>
        </div>
      </div>

      {/* Date Range Picker */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <div>
          <label className="text-sm text-gray-600">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              handleDateChange(e.target.value, endDate)
            }
            className="border rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              handleDateChange(startDate, e.target.value)
            }
            className="border rounded-md p-2 w-full"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>

      {/* Graph */}
      <div className="border rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">
          Upload Activity
        </h2>

        <div className="overflow-x-auto">
          <div className="flex items-end gap-4 h-64">
            {graphEntries.length === 0 && (
              <p className="text-gray-500">
                No uploads in selected range.
              </p>
            )}

            {graphEntries.map(([date, count]) => (
              <div
                key={date}
                className="flex flex-col items-center"
              >
                <div
                  className="bg-gray-800 w-8"
                  style={{
                    height: `${count * 20}px`,
                  }}
                />
                <span className="text-xs mt-2">
                  {date.slice(5)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

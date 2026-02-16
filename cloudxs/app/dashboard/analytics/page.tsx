"use client";

import React, { useEffect, useState, useMemo } from "react";
import { getToken, getUserId } from "@/utils/auth";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL!;

interface AnalyticsData {
  totalUploads: number;
  uploadsByType: Record<string, number>;
  totalStorageUsed: number;
}

interface GraphEntry {
  uploads: number;
  bandwidth: number;
}

const formatBytes = (bytes: number) => {
  if (!bytes) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024)
    return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

const Page = () => {
  const user_id = getUserId();

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(today.getDate() - 29);
  oneMonthAgo.setHours(0, 0, 0, 0);

  const [startDate, setStartDate] = useState(
    oneMonthAgo.toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    today.toISOString().split("T")[0]
  );

  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null);

  const [graphData, setGraphData] =
    useState<Record<string, GraphEntry>>({});

  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    const res = await fetch(
      `${BASE_API_URL}/analytics/analytics?user_id=${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    const data = await res.json();
    setAnalytics(data);
  };

  const fetchGraphData = async () => {
    const res = await fetch(
      `${BASE_API_URL}/analytics/graph-data?user_id=${user_id}&start_date=${startDate}&end_date=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
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

  const handleDateChange = (
    newStart: string,
    newEnd: string
  ) => {
    const diff =
      new Date(newEnd).getTime() -
      new Date(newStart).getTime();

    const maxRange =
      30 * 24 * 60 * 60 * 1000;

    setError("");

    if (diff > maxRange) {
      setError(
        "Date range cannot exceed 1 month"
      );
      return;
    }

    setStartDate(newStart);
    setEndDate(newEnd);
  };

  // Generate full date range
  const generateDateRange = (
    start: string,
    end: string
  ) => {
    const dates = [];
    const current = new Date(start);
    const last = new Date(end);

    while (current <= last) {
      dates.push(
        current.toISOString().split("T")[0]
      );
      current.setDate(
        current.getDate() + 1
      );
    }

    return dates;
  };

  // Build chart data (fills missing dates with 0)
  const chartData = useMemo(() => {
    const fullRange = generateDateRange(
      startDate,
      endDate
    );

    return fullRange.map((date) => {
      const entry = graphData[date];

      return {
        date,
        uploads: entry?.uploads ?? 0,
        bandwidth: entry?.bandwidth ?? 0,
      };
    });
  }, [graphData, startDate, endDate]);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Usage Analytics
      </h1>

      {/* Top Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">
            Total Uploads
          </p>
          <h2 className="text-2xl font-semibold mt-2">
            {analytics?.totalUploads ?? 0}
          </h2>
        </div>

        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">
            Total Storage Used
          </p>
          <h2 className="text-2xl font-semibold mt-2">
            {formatBytes(
              analytics?.totalStorageUsed || 0
            )}
          </h2>
        </div>

        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">
            Uploads By Type
          </p>
          <div className="mt-2 text-sm space-y-1">
            {analytics?.uploadsByType
              ? Object.entries(
                  analytics.uploadsByType
                ).map(([type, count]) => (
                  <div
                    key={type}
                    className="flex justify-between"
                  >
                    <span>{type}</span>
                    <span>{count}</span>
                  </div>
                ))
              : "No data"}
          </div>
        </div>
      </div>

      {/* Date Picker */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
        <div>
          <label className="text-sm text-gray-600">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              handleDateChange(
                e.target.value,
                endDate
              )
            }
            className="border rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              handleDateChange(
                startDate,
                e.target.value
              )
            }
            className="border rounded-md p-2 w-full"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2">
            {error}
          </p>
        )}
      </div>

      {/* Upload Count Chart */}
      <div className="border rounded-lg p-6 mb-10">
        <h2 className="text-lg font-medium mb-4">
          Upload Count
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) =>
                date.slice(5)
              }
            />
            <YAxis
              domain={[0, "auto"]}
              allowDecimals={false}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="uploads"
              stroke="#111827"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bandwidth Chart */}
      <div className="border rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">
          Bandwidth Usage
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) =>
                date.slice(5)
              }
            />
            <YAxis
              domain={[0, "auto"]}
              tickFormatter={(value) => {
                if (
                  value >=
                  1024 * 1024
                )
                  return `${(
                    value /
                    (1024 * 1024)
                  ).toFixed(1)} MB`;
                if (value >= 1024)
                  return `${(
                    value / 1024
                  ).toFixed(1)} KB`;
                return `${value} B`;
              }}
            />
            <Tooltip
  formatter={(value: number | undefined) => {
    if (typeof value !== "number") return "0 B";
    return formatBytes(value);
  }}
/>
            <Area
              type="monotone"
              dataKey="bandwidth"
              stroke="#2563eb"
              fill="#93c5fd"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Page;

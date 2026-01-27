"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CloudXS: () => CloudXS
});
module.exports = __toCommonJS(index_exports);

// src/client.ts
var CloudXS = class {
  constructor(config) {
    this.CDN_BASE_URL = "https://cdn.cloudxs.app";
    if (!config.apiKey) {
      throw new Error("CloudXS API key is required");
    }
    this.apiKey = config.apiKey;
  }
  async upload(file) {
    const res = await fetch("http://localhost:5000/upload/upload-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        filename: file.name,
        filetype: file.type,
        apiKey: this.apiKey
      })
    });
    const json = await res.json();
    console.log(json);
    if (!res.ok) {
      throw new Error(json.message || "Failed to get upload URL");
    }
    const { uploadUrl, key } = json;
    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type
      },
      body: file
    });
    console.log(uploadRes);
    if (!uploadRes.ok) {
      throw new Error("Upload failed");
    }
    return {
      success: true,
      url: `${this.CDN_BASE_URL}/${key}`
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CloudXS
});

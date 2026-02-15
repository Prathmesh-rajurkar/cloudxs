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
    const res = await fetch("https://api.cloudxs.app/upload/upload-url", {
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
    const { uploadUrl, key, userId } = json;
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
    const mediaFile = await fetch(`https://api.cloudxs.app/media/media-save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: `${this.CDN_BASE_URL}/${key}`,
        userId,
        filename: file.name,
        filetype: file.type,
        filesize: file.size
      })
    });
    return {
      success: true,
      url: `${this.CDN_BASE_URL}/${key}`
    };
  }
};
export {
  CloudXS
};

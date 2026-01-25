export class CloudXS {
  private apiKey: string;

  constructor(config: { apiKey: string }) {
    if (!config.apiKey) {
      throw new Error("CloudXS API key is required");
    }
    this.apiKey = config.apiKey;
  }

  async upload(file: File) {
    const res = await fetch("http://localhost:5000/upload/upload-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: file.name,
        filetype: file.type,
        apiKey: this.apiKey,
      }),
    });
    const json = await res.json();
    console.log(json);
    if (!res.ok) {
      throw new Error("Failed to get upload URL" + json + file + file.name + file.type);
    }

    const { uploadUrl } = await res.json();

    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!uploadRes.ok) {
      throw new Error("Upload failed");
    }

    return {
      success: true,
      filename: file.name,
    };
  }
}

export class CloudXS {
  async upload(file: File, apiKey: string) {
    const res = await fetch("https://api.cloudxs.dev/upload-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: file.name,
        filetype: file.type,
        apiKey,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to get upload URL");
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

    console.log("Upload successful 🎉");
  }
}

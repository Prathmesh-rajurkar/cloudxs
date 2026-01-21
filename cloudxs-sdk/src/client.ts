import { createHttp } from "./http";

export class CloudXS {
  private http;

  constructor(config: { apiKey: string }) {
    if (!config.apiKey) {
      throw new Error("CloudXS API key is required");
    }
    this.http = createHttp(config.apiKey);
  }

  async health() {
    const res = await this.http.get("/health");
    return res.data;
  }
}

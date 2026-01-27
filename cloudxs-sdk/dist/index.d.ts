declare class CloudXS {
    private apiKey;
    private CDN_BASE_URL;
    constructor(config: {
        apiKey: string;
    });
    upload(file: File): Promise<{
        success: boolean;
        url: string;
    }>;
}

export { CloudXS };

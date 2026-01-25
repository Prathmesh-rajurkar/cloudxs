declare class CloudXS {
    private apiKey;
    constructor(config: {
        apiKey: string;
    });
    upload(file: File): Promise<{
        success: boolean;
        filename: string;
    }>;
}

export { CloudXS };

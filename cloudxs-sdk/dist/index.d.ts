declare class CloudXS {
    private http;
    constructor(config: {
        apiKey: string;
    });
    health(): Promise<any>;
}

export { CloudXS };

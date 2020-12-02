export interface IGlobalConfig {
    apiBaseURI: string
}

const config: IGlobalConfig = {
    apiBaseURI: "https://172.104.154.171:49380/"
};

export { config };
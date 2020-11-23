export interface IGlobalConfig {
    apiBaseURI: string
}

const config: IGlobalConfig = {
    apiBaseURI: "http://localhost/"
};

export { config };
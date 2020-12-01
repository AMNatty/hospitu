export interface IGlobalConfig {
    apiBaseURI: string
}

const config: IGlobalConfig = {
    apiBaseURI: "http://192.168.0.192/"
};

export { config };
export interface Errored {
    tag: "error",
    error: Error,
};
  
export interface Loading {
    tag: "loading"
};
  
export interface Loaded {
    tag: "loaded"
};
  
export type State = Loading | Errored | Loaded;
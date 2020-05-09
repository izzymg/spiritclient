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

export type NotifSub = (text: string) => void;

export const Notif = {
    subscribers: new Set<NotifSub>(),

    addSubscriber(sub: NotifSub) {
        this.subscribers.add(sub);
    },

    removeSubscriber(sub: NotifSub) {
        this.subscribers.delete(sub);
    },

    notify(text: string) {
        this.subscribers.forEach(subscriber => {
            subscriber(text);
        });
    }
};
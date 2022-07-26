declare function identify(traits: Record<string, any>, id?: string): void;
declare function setUser(id: string, traits: Record<string, any>): void;
interface SegmentUser {
    id: () => string;
    traits: () => Record<string, any>;
    alias: (id: string) => void;
    anonymousId: () => string;
}
declare function getUser(): SegmentUser;
export { identify, setUser, getUser };

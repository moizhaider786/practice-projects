export interface Renderable <T, U=undefined>{
    render(element: T, data?: U ): void;
}

export class Post {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public tags: string[],
        public visible: number,
        public img: string,
        public date: Date,
        public email?: string
        ) {}
}
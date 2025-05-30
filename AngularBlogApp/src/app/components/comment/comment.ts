export type Comment = {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: {
        id: number,
        username: string,
        fullname: string
    };
};

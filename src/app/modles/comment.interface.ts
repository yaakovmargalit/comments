export interface Icomment{
    id: number;
    parentCommentId: number;
    ownerId: number;
    txt: string;
    createdAt: string;
    deletedAt: string;
}


interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string;
}

export type TTask = {
    _id: string;
    title: string;
    description: string;
    category:
    | 'artsAndCraft'
    | 'nature'
    | 'family'
    | 'sport'
    | 'friends'
    | 'meditation';
    status?: 'allTask' | "inProgress" | 'onGoing' | 'pending' | 'collaborativeTask' | 'done';
    endDate: string;
    createdBy?: string | IUser;
    isDeleted?: boolean;
    createdAt: string;
    updatedAt: string;
};

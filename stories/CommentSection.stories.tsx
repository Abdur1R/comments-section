// stories/CommentSection.stories.tsx

import React, { useState } from "react";
import Comments from "../src/Comments"; // Adjust path as needed

export default {
    title: "Components/CommentSection",
    component: Comments,
};

const dummyComments = [
    { id: 1, author: "Alice", text: "This is great!" },
    { id: 2, author: "Bob", text: "Nice work 👏" },
];

export const Default = () => {
    const [state, updateState] = useState({ comments: [] });

    return (
        <Comments
            currentUserId="Abdur1R"
            currentUserName="Abdur Rahman Shaik"
            apis={{
                getCommentsApi: async () => {
                    const initialState = [
                        {
                            id: "1",
                            username: "Abdur Rahman Shaik",
                            userId: "Abdur1R",
                            body: "Hi there, I am comment 1 for testing! ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggjjjjjjjjjjjjjjjjjjjjjjjggggggggggggggjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
                            createdAt: "2025-03-07T18:01:03Z",
                            parentId: null
                        },
                        {
                            id: "2",
                            username: "Abdur Rahman Shaik",
                            userId: "Abdur1R",
                            body: "Hi there, I am comment 2 for testing!",
                            createdAt: "2025-03-08T18:01:03Z",
                            parentId: null
                        },
                        {
                            id: "3",
                            username: "Abdur Rahman Shaik",
                            userId: "Abdur1R",
                            body: "Hi there, I am comment 3 for testing!",
                            createdAt: "2025-03-09T18:01:03Z",
                            parentId: null
                        },
                    ];
                    updateState((prev: any) => (
                        { ...prev, comments: initialState }
                    ));
                    return initialState;
                },
                createCommentApi: async (text: string, parentId: string, currentUserId: string, currentUserName: string) => {
                    return {
                        id: state.comments.length,
                        username: currentUserName,
                        userId: currentUserId,
                        body: text,
                        createdAt: (new Date()).toISOString().slice(0, 19).replace("T", "T"),
                        parentId
                    };
                },
                updateCommentApi: async (text: string, commentId: string, currentUserId: string, currentUserName: string) => {
                    const updatedBackendComments = state.comments.map((backendComment: any) => {
                        if (backendComment.id === commentId) {
                            return { ...backendComment, body: text };
                        }
                        return backendComment;
                    });
                    updateState((prev: any) => ({ ...prev, comments: updatedBackendComments }));
                },
                deleteCommentApi: async (commentId: string) => {
                    const updatedBackendComments = state.comments.filter(
                        (backendComment: any) => backendComment.id !== commentId
                    );
                    updateState((prev: any) => ({ ...prev, comments: updatedBackendComments }));
                },
            }}
        />
    )
};

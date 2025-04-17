import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import "./index.css";
import "./Comments.css";
// import {
// getComments as getCommentsApi,
// createComment as createCommentApi,
// updateComment as updateCommentApi,
// deleteComment as deleteCommentApi,
// } from "./api";

const Comments = ({ commentsUrl, currentUserId, currentUserName, apis }:
    {
        commentsUrl?: string,
        currentUserId: string,
        // onCommentBodyClick?: ({ jsonKey, questionId }: { jsonKey?: string, questionId?: string }) => void,
        // jsonKey?: string,
        // questionId?: string,
        // questionText?: string,
        currentUserName: string,
        apis: {
            getCommentsApi: () => any,
            createCommentApi: (text: string, parentId: string, currentUserId: string, currentUserName: string) => any,
            updateCommentApi: (text: string, commentId: string, currentUserId: string, currentUserName: string) => any,
            deleteCommentApi: (commentId: string) => any
        }
    }) => {
    const {
        getCommentsApi,
        createCommentApi,
        updateCommentApi,
        deleteCommentApi
    } = apis;
    // return (<>Hi, I am comments section (still under development)</>)
    const [backendComments, setBackendComments] = useState<any>([]);
    const [activeComment, setActiveComment] = useState(null);
    const rootComments = backendComments.filter(
        (backendComment: any) => backendComment.parentId === null
    );

    console.log('backendComments', backendComments);
    console.log('rootComments', rootComments);

    const getReplies = (commentId: string) =>
        backendComments
            .filter((backendComment: any) => backendComment.parentId === commentId)
            .sort(
                (a: any, b: any) =>
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );

    const addComment = (text: string, parentId: any) => {
        // console.log('jsonKey, questionId in comments page', jsonKey, questionId);
        createCommentApi(text, parentId ?? null, currentUserId, currentUserName).then((comment: any) => {
            setBackendComments([comment, ...backendComments]);
            // setBackendComments([{}, ...backendComments]);
            setActiveComment(null);
        });
    };

    const updateComment = (text: string, commentId: string) => {
        // const html = parser.parseFromString(htmlString, 'text/html');
        updateCommentApi(text, commentId, currentUserId, currentUserName).then(() => {
            const updatedBackendComments = backendComments.map((backendComment: any) => {
                if (backendComment.id === commentId) {
                    return { ...backendComment, body: text };
                }
                return backendComment;
            });
            setBackendComments(updatedBackendComments);
            setActiveComment(null);
        });
    };

    const deleteComment = (commentId: any) => {
        if (window.confirm("Are you sure you want to remove comment?")) {
            deleteCommentApi(commentId).then(() => {
                const updatedBackendComments = backendComments.filter(
                    (backendComment: any) => backendComment.id !== commentId
                );
                setBackendComments(updatedBackendComments);
            });
        }
    };

    useEffect(() => {
        getCommentsApi().then((data: any) => {
            setBackendComments(data.filter(
                (backendComment: any) => backendComment.parentId === null
            ));
            // setBackendComments([]);
        });
    }, []);

    return (
        <div className="comments">
            <CommentForm parentForm={true} submitLabel="POST" handleSubmit={addComment} />
            <div className="comments-container">
                {backendComments.filter(
                    (backendComment: any) => backendComment.parentId === null
                ).map((rootComment: any) => (
                    <Comment
                        key={rootComment.id}
                        comment={rootComment}
                        replies={getReplies(rootComment.id)}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                        deleteComment={deleteComment}
                        updateComment={updateComment}
                        currentUserId={currentUserId}
                        // onCommentBodyClick={onCommentBodyClick}
                        reply={false}
                    />
                ))}
            </div>
        </div>
    );
};

export default Comments;
import { useEffect, useState } from "react";
import { Mentions } from "antd";
import React from "react";
import "./index.css";
import "./Comments.css";
// import { TeamDetailsAPI } from "../../services/TeamDetailsApi";

const CommentForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    handleCancel,
    initialText = "",
    parentForm = false,
}: {
    handleSubmit: any;
    submitLabel: any;
    hasCancelButton?: any;
    handleCancel?: any;
    initialText?: any;
    parentForm?: boolean;
}) => {
    const [text, setText] = useState(initialText || '');
    const [state, updateState] = useState<any>({});
    const isTextareaDisabled = text ? text.length === 0 : false;
    const onSubmit = (event: any) => {
        event.preventDefault();
        if (text && text.length > 0) {
            handleSubmit(text);
        }
        setText("");
    };

    const FetchTeamDetails = async () => {
        // const response: any = await TeamDetailsAPI();
        const response: any = [{ full_name: "Abdur Rahman Shaik" }, { full_name: "Dummy 1" }];
        if (response) {
            updateState((prev: any) => ({
                ...prev, responseEmpList: response ?? [], employeeList: response.map((item: any) => item.full_name) ?? []
            }));
        }
    };

    useEffect(() => {
        FetchTeamDetails();
    }, []);

    return (
        <form
            onSubmit={onSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
            }}
        >
            <Mentions
                autoFocus={true}
                defaultValue={parentForm ? '' : initialText}
                value={text}
                rows={3}
                onChange={(text) => {
                    setText(text);
                }}
                placeholder={`Adding Comment...`}>
                {state.employeeList && state.employeeList.map((item: any, index: any) => (
                    <Mentions.Option key={index} value={item}>{item}</Mentions.Option>
                ))}
            </Mentions>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="comment-form-button" disabled={isTextareaDisabled}>
                    {submitLabel}
                </button>
                {
                    hasCancelButton && (
                        <button
                            type="reset"
                            className="comment-form-button comment-form-cancel-button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    )
                }
            </div>
        </form >
    );
};

export default CommentForm;
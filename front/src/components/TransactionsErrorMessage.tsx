import React from "react";

type TransactionsErrorMessageProps = {
    message: string;
    dismiss: React.MouseEventHandler<HTMLButtonElement>;
};
const TransactionsErrorMessage: React.FunctionComponent<TransactionsErrorMessageProps> = 
    ({ message, dismiss }) => {
    return (
        <div>
            Tx error: {message}
            <button type="button" onClick={dismiss}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
};

export default TransactionsErrorMessage;
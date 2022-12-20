import React from "react";

type WaitForTransactionMessageProps = {
    txHash: string;
};
const WaitForTransactionMessage: React.FunctionComponent<WaitForTransactionMessageProps> = 
    ({ txHash }) => {
    return (
        <div>
            Waiting for transaction <strong>{txHash}</strong>
        </div>
    )
};

export default WaitForTransactionMessage;
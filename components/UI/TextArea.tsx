import clsx from "clsx";
import {FC} from "react";

export interface TextAreaProps
    extends React.HTMLAttributes<HTMLTextAreaElement>{
    required?: boolean;
    value?: string;
}

const Input : FC<TextAreaProps> = ({ className,...props }) => {
    return (
        <textarea
            className={clsx(
                "p-4 text-lg rounded-small w-full !border-0",
                className
            )}
            rows={8}
            {...props}
        />
    );
};

export default Input;
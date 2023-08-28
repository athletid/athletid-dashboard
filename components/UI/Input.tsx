import clsx from "clsx";
import {FC} from "react";

export interface InputProps
    extends React.HTMLAttributes<HTMLInputElement>{
    required?: boolean;
    value?: string | number;
    type?: string
}

const Input : FC<InputProps> = ({ className, type, required,...props }) => {
    return (
        <input
            type={type}
            required={required}
            className={clsx(
                "p-4 text-lg rounded-small w-full !border-0",
                className
            )}
            {...props}
        />
    );
};

export default Input;
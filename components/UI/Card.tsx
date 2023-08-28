import clsx from "clsx";
import {ReactNode} from "react";

const Card = ({ className, children }: { className?: string, children : ReactNode }) => {
    return (
        <div
            className={clsx(
                "rounded-3xl py-4",
                className
            )}
        >
            {children}
        </div>
    );
};

export default Card;
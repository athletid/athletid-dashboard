import {cva, VariantProps} from "class-variance-authority";
import Link from "next/link";
import {FC} from "react";

const buttonClasses = cva(
    [
        "duration-300",
        "px-6",
        "py-3",
        "md:px-8",
        "transition",
        "md:py-4",
        "!rounded-full",
        "border",
        "w-fit",
        "!text-base",
    ],
    {
        variants: {
            intent: {
                primary: [
                    "bg-timeRed",
                    "hover:bg-timeRedHover",
                    "circle-boxShadow z-[900]",
                    "!border-0",
                    "!text-white",
                ],

                secondary: [
                    "border",
                    "border-timeRed",
                    "z-[900]",
                    "!text-black",
                ],
            },
        },
        defaultVariants: {
            intent: "primary",
        },
    }
);

export interface ButtonProps
    extends React.HTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonClasses> {
    type?: "button" | "submit" | "reset" | undefined;
    link?: string; // Le lien est maintenant optionnel
}

const Button: FC<ButtonProps> = ({
                                     children,
                                     className,
                                     intent,
                                     link,
                                     ...props
                                 }) => {
    if (!link) {
        return (
            <button className={buttonClasses({intent, className})} {...props}>
                {children}
            </button>
        );
    } else {
        return (
            <Link href={link} className={buttonClasses({intent, className})}>
                {children}
            </Link>
        );
    }
};

export default Button;

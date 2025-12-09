import type { MouseEventHandler } from 'react';

interface ButtonProps {
    /** The click handler function */
    clickHandler: MouseEventHandler<HTMLButtonElement>;
    /** The colour to use for the button */
    colour: string;
    /** The text to display in the button */
    label: string;
}

const Button = ({ clickHandler, colour, label }: ButtonProps) => {
    return (
        <button
            className={`font-mono font-bold bg-${colour}-700 hover:bg-${colour}-800 focus:bg-${colour}-800 py-2 px-6 rounded shadow-xl shadow-${colour}-950/50 text-white text-sm md:text-lg uppercase`}
            onClick={clickHandler}
        >
            {label}
        </button>
    );
};

export default Button;

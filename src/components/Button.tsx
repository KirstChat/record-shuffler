const Button = ({ clickHandler, color, label }) => {
    return (
        <button
            className={`font-mono font-bold bg-${color}-700 hover:bg-${color}-800 focus:bg-${color}-800 py-2 px-6 rounded shadow-xl shadow-${color}-950/50 text-white text-sm md:text-lg uppercase`}
            onClick={clickHandler}
        >
            {label}
        </button>
    );
};

export default Button;

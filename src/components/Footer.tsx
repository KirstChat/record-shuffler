import { useState } from 'react';
import { FiInfo } from 'react-icons/fi';

const Footer = () => {
    const [visibility, setVisibility] = useState<boolean>(false);

    const infoButtonHandler = () => {
        setVisibility(visibility ? false : true);
    };

    return (
        <footer className='absolute flex justify-end right-0 font-mono relative text-slate-900 dark:text-white w-full'>
            <button
                className='bg-slate-900 dark:bg-sky-700 rounded-full p-2 text-xl'
                onClick={infoButtonHandler}
            >
                <span className='sr-only'>About Record Shuffler</span>
                <FiInfo className='aria-hidden text-white' />
            </button>

            <div
                className={`bg-gray-300 dark:bg-slate-950 border-2 border-slate-900 dark:border-white rounded py-2 px-4 flex flex-col gap-1 ${
                    visibility ? 'opacity-100' : 'opacity-0'
                } ${
                    !visibility && 'pointer-events-none'
                } translate-opacity duration-200 ease-in-out absolute right-1/2 bottom-full translate-x-1/2 mb-2 text-center text-xs w-full`}
            >
                <a
                    href='https://www.flaticon.com/free-icons/record-label'
                    title='record label icons'
                >
                    Record label icons created by Groovy Icons - Flaticon
                </a>
                <br />
                <p>Developed by Kirsty Chatterton 🤓</p>
            </div>
        </footer>
    );
};

export default Footer;

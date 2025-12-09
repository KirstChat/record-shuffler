const Header = () => {
    return (
        <header className='flex flex-row-reverse items-center gap-2 md:gap-4 mt-8 text-slate-900 dark:text-white'>
            <img
                className='block dark:hidden mx-auto size-12'
                src='images/record-light.png'
                alt='Image of a record half in a record sleeve.'
            />
            <img
                className='hidden dark:block mx-auto size-12'
                src='images/record-dark.png'
                alt='Image of a record half in a record sleeve.'
            />
            <h1 className='font-mono font-bold text-2xl md:text-3xl uppercase'>
                Record Shuffler
            </h1>
        </header>
    );
};

export default Header;

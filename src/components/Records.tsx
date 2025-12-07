import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { API } from '../helpers/constants';
import axios from 'axios';
import Button from './Button';
import Slider from './Slider';

const USERNAME = import.meta.env.VITE_DISCOGS_USER_NAME;
const FOLDER_ID = import.meta.env.VITE_DISCOGS_COLLECITON_FOLDER_ID;
const TOKEN = import.meta.env.VITE_DISCOGS_USER_TOKEN;

const Records = () => {
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [records, setRecords] = useState();

    /**
     * Fetch records from Discogs API
     *
     * @returns data
     */
    const fetchRecords = async () => {
        const res = await axios.get(
            `${API}/users/${USERNAME}/collection/folders/${FOLDER_ID}/releases?token=${TOKEN}&per_page=${LIMIT}`
        );

        return res.data;
    };

    /**
     * React Query hook to make fetch request
     */
    const { data, error, isPending } = useQuery({
        queryKey: ['records'],
        queryFn: () => fetchRecords(),
    });

    /**
     * Function to shuffle records in a random order
     */
    const shuffleRecords = (releases) => {
        if (releases && releases.length > 0) {
            for (let i = releases.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [releases[i], releases[j]] = [releases[j], releases[i]];
            }

            setRecords(releases);
        }
    };

    const shuffleHandler = () => {
        shuffleRecords(data?.releases);
        setIsFirstLoad(false);

        // Timeout function to add loader between records
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    const reshuffleHandler = () => {
        shuffleRecords(data?.releases);
        setIsLoading(true);

        // Timeout function to add loader between records
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    return (
        <main className='w-full'>
            {!isFirstLoad && isLoading && (
                <div className='flex flex-col items-center justify-center py-4'>
                    <span className='loader aria-hidden'></span>
                </div>
            )}

            {!isPending && !error && !isLoading && (
                <section className='flex flex-col justify-center -ml-4 -mr-4'>
                    {!isFirstLoad && records && (
                        <Slider records={records} isLoading={isLoading} />
                    )}
                </section>
            )}

            <section className='flex justify-center'>
                {isFirstLoad && (
                    <Button
                        label='Shuffle Records'
                        clickHandler={shuffleHandler}
                        color='sky'
                    />
                )}
                {!isFirstLoad && !isLoading && (
                    <Button
                        label='Re-Shuffle'
                        clickHandler={reshuffleHandler}
                        color='rose'
                    />
                )}
            </section>
        </main>
    );
};

export default Records;

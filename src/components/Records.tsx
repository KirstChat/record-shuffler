import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    API,
    FOLDER_ID,
    LIMIT,
    USER_NAME,
    USER_TOKEN,
} from '../helpers/constants';
import axios from 'axios';
import Button from './Button';
import Slider from './Slider';

interface Release {
    id: number;
    basic_information: {
        artists: { name: string }[];
        cover_image: string;
        title: string;
    };
}

const Records = () => {
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [records, setRecords] = useState<Release[]>([]);

    /**
     * Fetch releases data from Discogs API
     */
    const fetchRecords = async () => {
        const res = await axios.get(
            `${API}/users/${USER_NAME}/collection/folders/${FOLDER_ID}/releases?token=${USER_TOKEN}&per_page=${LIMIT}`
        );

        return res.data;
    };

    /**
     * React Query hook to make fetch request
     */
    const { data, error, isPending } = useQuery<{ releases: Release[] }, Error>(
        {
            queryKey: ['records'],
            queryFn: fetchRecords,
        }
    );

    /**
     * Function to shuffle records in a random order
     */
    const shuffleRecords = (releases?: Release[]) => {
        if (releases && releases.length > 0) {
            for (let i = releases.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [releases[i], releases[j]] = [releases[j], releases[i]];
            }

            setRecords(releases);
        } else {
            return;
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
                        <Slider
                            records={records as unknown as any}
                            isLoading={isLoading}
                        />
                    )}
                </section>
            )}

            <section className='flex justify-center'>
                {isFirstLoad && (
                    <Button
                        label='Shuffle Records'
                        clickHandler={shuffleHandler}
                        colour='sky'
                    />
                )}
                {!isFirstLoad && !isLoading && (
                    <Button
                        label='Re-Shuffle'
                        clickHandler={reshuffleHandler}
                        colour='rose'
                    />
                )}
            </section>
        </main>
    );
};

export default Records;

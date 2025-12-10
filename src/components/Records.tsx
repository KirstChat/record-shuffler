import { useEffect, useState } from 'react';
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [records, setRecords] = useState<Release[]>([]);

    /**
     * Fetch user info from Discogs API
     */
    const fetchUser = async () => {
        const res = await axios.get(
            `${API}/users/${USER_NAME}?token=${USER_TOKEN}`
        );

        return res.data;
    };

    /**
     * Query hook to make fetch request
     */
    const {
        data: user,
        error: userError,
        isPending: userIsPending,
    } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
    });

    /**
     * Fetch record collection data from Discogs API
     */
    const fetchCollection = async () => {
        const res = await axios.get(
            `${API}/users/${USER_NAME}/collection/folders/${FOLDER_ID}/releases?token=${USER_TOKEN}&per_page=${
                user?.num_collection || LIMIT
            }`
        );

        return res.data;
    };

    /**
     * Query hook to make fetch request
     */
    const {
        data: collection,
        error: collectionError,
        isPending: collectionIsPending,
    } = useQuery<{ releases: Release[] }, Error>({
        queryKey: ['collection'],
        queryFn: fetchCollection,
        enabled: !!user?.num_collection,
    });

    const isPending = userIsPending || collectionIsPending;
    const error = userError || collectionError;

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
        shuffleRecords(collection?.releases);
        setIsLoading(true);

        // Timeout function to add loader between records
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    useEffect(() => {
        shuffleRecords(collection?.releases);
    }, [collection]);

    return (
        <main className='w-full'>
            {isLoading ? (
                <div className='flex flex-col items-center justify-center py-4'>
                    <span className='loader aria-hidden'></span>
                </div>
            ) : null}

            {!isPending && !error && !isLoading ? (
                <section className='flex flex-col justify-center -ml-4 -mr-4'>
                    {records ? (
                        <Slider
                            records={records as unknown as any}
                            isLoading={isLoading}
                        />
                    ) : null}

                    <div className='flex justify-center'>
                        <Button
                            label='Re-Shuffle'
                            clickHandler={shuffleHandler}
                            colour='rose'
                        />
                    </div>
                </section>
            ) : null}
        </main>
    );
};

export default Records;

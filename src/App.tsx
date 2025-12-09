import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from './components/Header';
import Footer from './components/Footer';
import Records from './components/Records';

const App = () => {
    // Create a client
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Header />

            <Records />
            <ReactQueryDevtools initialIsOpen={false} />

            <Footer />
        </QueryClientProvider>
    );
};

export default App;

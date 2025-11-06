import { createContext, useContext, useState } from 'react';

interface LoadingType {
	isLoading: boolean;
	onLoading: () => void;
	offLoading: () => void;
}

const defaults: LoadingType = {
	isLoading: false,
	onLoading: () => {},
	offLoading: () => {},
};

const LoadingContext = createContext<LoadingType>(defaults);

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setIsLoading] = useState(false);

	const onLoading = () => setIsLoading(true);
	const offLoading = () => setIsLoading(false);

	return (
		<LoadingContext.Provider value={{ isLoading, onLoading, offLoading }}>
			{children}
		</LoadingContext.Provider>
	);
};

const useLoading = () => {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error('useLoading must be used within a LoadingProvider');
	}
	return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useLoading };
export default LoadingProvider;

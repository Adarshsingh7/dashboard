/** @format */

import { createContext, useState } from 'react';

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

export { LoadingContext };
export default LoadingProvider;

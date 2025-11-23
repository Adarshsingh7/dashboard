/** @format */

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop({ children }: { children?: React.ReactNode }) {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	}, [pathname]);

	return <>{children}</>;
}

export default ScrollToTop;

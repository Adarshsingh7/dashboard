/** @format */

// interfaces related to the dashboard layout
interface MenuProps {
	icon: React.ReactNode;
	title: string;
	action?: () => void;
}

interface CollapsibleMenuProps extends MenuProps {
	content: (
		| MenuProps
		| dropdownItemContentProps
		| BadgedMenuProps
		| CollapsibleMenuProps
	)[];
}

interface PanelContentProps {
	node: (
		| MenuProps
		| dropdownItemContentProps
		| BadgedMenuProps
		| CollapsibleMenuProps
	)[];
}

// interface for the user
interface User {
	id: string;
	username: string;
	email: string;
	email_verified: boolean;
	password_hash: string;

	roles: string[];
	status: string;

	last_login_at: string | null;

	profile: {
		full_name: string;
		avatar_url: string;
	};

	preferences: {
		theme: string;
		language: string;
	};

	created_at: string;
	updated_at: string;
}

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

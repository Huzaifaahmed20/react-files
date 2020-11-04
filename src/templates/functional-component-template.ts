export const getComponentTemplate = (componentName: string): string => {

    return `import React from 'react';

export const ${componentName} = (props) => {
	return (
		<div>
			<h1>${componentName}</h1>
		</div>
	)
}
`;
};
export const getComponentTemplate = (componentName: string, withCSS: boolean): string => {

	return `import React from 'react';
${withCSS ? "import './style.css';" : ""}

export const ${componentName} = (props) => {
	return (
		<div>
			<h1>${componentName}</h1>
		</div>
	)
}
`;
};
export const getComponentTemplate = (componentName: string, withCSS: boolean, styleType: string | undefined): string => {

	return `import React from 'react';
${withCSS ? `import './style.${styleType}';` : ""}

export const ${componentName} = (props) => {
	return (
		<div>
			<h1>${componentName}</h1>
		</div>
	)
}
`;
};
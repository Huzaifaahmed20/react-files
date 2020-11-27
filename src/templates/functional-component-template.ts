import { getStyleImport } from "../commands/utils";


export const getComponentTemplate = (componentName: string, withCSS: boolean, styleType: string | undefined): string => {

	return `import React from 'react';
${withCSS ? getStyleImport(styleType) : ""}

export const ${componentName} = (props) => {
	return (
		<div>
			<h1>${componentName}</h1>
		</div>
	)
}
`;
};
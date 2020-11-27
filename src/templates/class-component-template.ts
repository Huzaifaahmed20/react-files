import { getStyleImport } from "../commands/utils";

export const getClassComponentTemplate = (componentName: string, withCSS: boolean, styleType: string | undefined): string => {

    return `import React, { Component } from 'react';
${withCSS ? getStyleImport(styleType) : ""}

class ${componentName} extends Component {
    render() {
	    return (
		    <div>
			    <h1>${componentName}</h1>
		    </div>
        )
    }
}
export default ${componentName};
`;
};
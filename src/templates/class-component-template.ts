export const getClassComponentTemplate = (componentName: string, withCSS: boolean, styleType: string | undefined): string => {

    return `import React, { Component } from 'react';
${withCSS ? `import './style.${styleType}';` : ""}

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
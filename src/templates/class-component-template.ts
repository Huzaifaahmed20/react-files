export const getClassComponentTemplate = (componentName: string, withCSS: boolean): string => {

    return `import React, { Component } from 'react';
${withCSS ? "import './style.css';" : ""}

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
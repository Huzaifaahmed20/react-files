export const getClassComponentTemplate = (componentName: string): string => {

    return `import React, { Component } from 'react';

class ${componentName} extends Component{
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

// class TestComp extends Component {
//     render() {
//         return (

//     )
//     }
// }
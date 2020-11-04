"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassComponentTemplate = void 0;
exports.getClassComponentTemplate = (componentName) => {
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
//# sourceMappingURL=class-component-template.js.map
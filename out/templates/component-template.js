"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentTemplate = void 0;
exports.getComponentTemplate = (componentName) => {
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
//# sourceMappingURL=component-template.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const vscode_1 = require("vscode");
const newComponent = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    const componentName = yield promptForComponentName();
    if (_.isNil(componentName) || componentName.trim() === "") {
        vscode_1.window.showErrorMessage("The component name must not be empty");
        return;
    }
    let targetDirectory = uri.fsPath;
    yield generateComponentCode(componentName, targetDirectory);
});
function promptForComponentName() {
    const componentNameOptions = {
        prompt: "Component Name",
        placeHolder: "DefaultButton",
    };
    return vscode_1.window.showInputBox(componentNameOptions);
}
//# sourceMappingURL=newComponent.js.map
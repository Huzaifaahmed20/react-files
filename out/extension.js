"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const commands_1 = require("./commands");
function activate(context) {
    context.subscriptions.push(vscode_1.commands.registerCommand('react-provider.genFuncComp', (uri) => commands_1.newComponent(uri, 'functional')), vscode_1.commands.registerCommand('react-provider.genClassComp', (uri) => commands_1.newComponent(uri, 'class')));
}
exports.activate = activate;
//huzaifa-ahmed.react-provider
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
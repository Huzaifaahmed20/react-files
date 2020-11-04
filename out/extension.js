"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const commands_1 = require("./commands");
function activate(context) {
    context.subscriptions.push(vscode_1.commands.registerCommand('code-provider.genFuncComp', commands_1.newComponent));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
import * as _ from "lodash";
import { Uri, window } from "vscode";
import { generateComponentCode, promptForComponentName, promptStyleOptions } from "./utils";

export const newComponent = async (uri: Uri, type: string, withCSS: boolean) => {
    const targetDirectory = uri.fsPath;
    const isComponents = targetDirectory.endsWith('components');
    const isPages = targetDirectory.endsWith('pages') || targetDirectory.endsWith('screens');
    const isValidDirectory = isComponents || isPages;
    if (isValidDirectory) {
        await runCreationProcess(targetDirectory, type, withCSS);
    } else {
        window.showErrorMessage('Make sure you right click on components, pages or screens directory');
        return;
    }
};

const runCreationProcess = async (targetDirectory: string, type: string, withCSS: boolean) => {
    var styleType: string | undefined = '';
    const componentName = await promptForComponentName();
    if (_.isNil(componentName) || componentName.trim() === "") {
        window.showErrorMessage("The component name must not be empty");
        return;
    }
    if (withCSS) {
        styleType = await promptStyleOptions();
        if (_.isNil(styleType) || styleType === undefined) {
            window.showErrorMessage('Please select style file type');
            return;
        }
    }
    await generateComponentCode(componentName, targetDirectory, type, withCSS, styleType);
};


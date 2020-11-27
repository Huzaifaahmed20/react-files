import * as _ from "lodash";
import { InputBoxOptions, Uri, window } from "vscode";
import { existsSync, mkdirSync, readdirSync, writeFile } from "fs";
import { getClassComponentTemplate, getComponentTemplate } from "../templates";
import { join } from 'path';

export const newComponent = async (uri: Uri, type: string) => {
    const targetDirectory = uri.fsPath;
    const isComponents = targetDirectory.endsWith('components') || targetDirectory.endsWith('component');
    const isPages = targetDirectory.endsWith('pages') || targetDirectory.endsWith('screens');
    const isValidDirectory = isComponents || isPages;

    if (isValidDirectory) {
        const componentName = await promptForComponentName();
        if (_.isNil(componentName) || componentName.trim() === "") {
            window.showErrorMessage("The component name must not be empty");
            return;
        }
        await generateComponentCode(componentName, targetDirectory, type, uri);
    } else {
        window.showErrorMessage('Make sure you right click on component directory');
    }


};



function promptForComponentName(): Thenable<string | undefined> {
    const componentNameOptions: InputBoxOptions = {
        prompt: "Component Name",
        placeHolder: "DefaultButton",

    };
    return window.showInputBox(componentNameOptions);
}

const generateComponentCode = async (componentName: string, targetDirectory: string, type: string, uri: Uri) => {
    const componentDirectoryPath = `${targetDirectory}/${componentName}`;
    const rootOfProject = join(componentDirectoryPath, '../../../');
    const projectFiles = readdirSync(rootOfProject);
    const isTSProject = projectFiles.includes('tsconfig.json');
    const language = isTSProject ? 'tsx' : 'js';
    const targetPath = `${componentDirectoryPath}/index.${language}`;

    if (!existsSync(componentDirectoryPath)) {
        await createDirectory(componentDirectoryPath);
    } else {
        window.showErrorMessage('Component already exist');
    }


    await writeCompFile(targetPath, type, componentName);
    window.showTextDocument(Uri.file(targetPath));
};



function writeCompFile(path: string, type: string, componentName: string) {
    return new Promise(async (resolve, reject) => {
        writeFile(
            path,
            type === 'class' ? getClassComponentTemplate(componentName) : getComponentTemplate(componentName),
            "utf8",
            (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            }
        );
    });

}


function createDirectory(targetDirectory: string): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            mkdirSync(targetDirectory, { recursive: true });
            resolve();

        } catch (e) {
            reject(e);
        }
    });
}
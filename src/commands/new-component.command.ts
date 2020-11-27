import * as _ from "lodash";
import { InputBoxOptions, Uri, window } from "vscode";
import { existsSync, mkdirSync, readdirSync, writeFile } from "fs";
import { getClassComponentTemplate, getComponentTemplate } from "../templates";
import { join } from 'path';

export const newComponent = async (uri: Uri, type: string, withCSS: boolean) => {
    const targetDirectory = uri.fsPath;
    const isComponents = targetDirectory.endsWith('components');
    const isPages = targetDirectory.endsWith('pages') || targetDirectory.endsWith('screens');
    const isValidDirectory = isComponents || isPages;
    var styleType: string | undefined = '';
    if (isValidDirectory) {
        const componentName = await promptForComponentName();
        if (_.isNil(componentName) || componentName.trim() === "") {
            window.showErrorMessage("The component name must not be empty");
            return;
        }
        if (withCSS) {
            styleType = await showStyleOptions();
            if (_.isNil(styleType)) {
                window.showErrorMessage('Please select style file type');
            }
        }
        await generateComponentCode(componentName, targetDirectory, type, withCSS, styleType);
    } else {
        window.showErrorMessage('Make sure you right click on component, pages or screens directory');
    }

};

async function showStyleOptions(): Promise<string | undefined> {
    const styleType = await window.showQuickPick(['css', 'less', 'scss'], { canPickMany: false });
    return styleType;
}


function promptForComponentName(): Thenable<string | undefined> {
    const componentNameOptions: InputBoxOptions = {
        prompt: "Component Name",
        placeHolder: "DefaultButton",

    };
    return window.showInputBox(componentNameOptions);
}

const generateComponentCode = async (componentName: string, targetDirectory: string, type: string, withCSS: boolean, styleType: string | undefined) => {
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

    if (withCSS) {
        const targetPathCSS = `${componentDirectoryPath}/style.${styleType}`;
        await writeCSSFile(targetPathCSS);
    }


    await writeCompFile(targetPath, type, componentName, withCSS);
    window.showTextDocument(Uri.file(targetPath));
};


function writeCSSFile(path: string) {
    return new Promise(async (resolve, reject) => {
        writeFile(
            path,
            "",
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

function writeCompFile(path: string, type: string, componentName: string, withCSS: boolean) {
    return new Promise(async (resolve, reject) => {
        writeFile(
            path,
            type === 'class' ? getClassComponentTemplate(componentName, withCSS) : getComponentTemplate(componentName, withCSS),
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
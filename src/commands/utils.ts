import * as _ from "lodash";
import { InputBoxOptions, Uri, window } from "vscode";
import { existsSync, mkdirSync, readdirSync, writeFile } from "fs";
import { getClassComponentTemplate, getComponentTemplate } from "../templates";
import { join } from 'path';

export const promptStyleOptions = async (): Promise<string | undefined> => {
    const styleType = await window.showQuickPick(['css', 'less', 'scss'], { canPickMany: false });
    return styleType;
};


export const promptForComponentName = (): Thenable<string | undefined> => {
    const componentNameOptions: InputBoxOptions = {
        prompt: "Component Name",
        placeHolder: "DefaultButton",

    };
    return window.showInputBox(componentNameOptions);
};

export const generateComponentCode = async (componentName: string, targetDirectory: string, type: string, withCSS: boolean, styleType: string | undefined) => {
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


const writeCSSFile = (path: string): Promise<void> => {
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
};

const writeCompFile = (path: string, type: string, componentName: string, withCSS: boolean): Promise<void> => {
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

};


const createDirectory = (targetDirectory: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            mkdirSync(targetDirectory, { recursive: true });
            resolve();

        } catch (e) {
            reject(e);
        }
    });
};
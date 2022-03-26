import { Service } from "../deps.ts";

const DEFAULT_DATA_DIR = "/data";

@Service()
export class FilesService {

    private getDataDirectory() {
        const directory = Deno.cwd() + (Deno.env.get("DATA_DIR") || DEFAULT_DATA_DIR);
        this.checkDirectoryOrCreate(directory);
        return directory;
    }

    private checkDirectoryOrCreate(directory: string) {
        if (!Deno.statSync(directory).isDirectory) {
            Deno.mkdirSync(directory);
        }
    }

    public getFileNumber() {
        const directory = this.getDataDirectory();
        this.checkDirectoryOrCreate(directory);
        const files = Deno.readDirSync(directory);
        let num = 0;
        for (const _ of files) {
            num++;
        }
        return num;
    }

    public getFiles() {
        const directory = this.getDataDirectory();
        const files = Deno.readDirSync(directory);
        return [...files].filter(file => file.isFile);
    }

    public saveContentToFile(content: string, fileName: string) {
        const directory = this.getDataDirectory();
        Deno.writeFileSync(`${directory}/${fileName}`, new TextEncoder().encode(content));
    }

    public getFileContent(fileName: string) {
        const directory = this.getDataDirectory();
        return Deno.readFileSync(`${directory}/${fileName}`).toString();
    }

    public editFileContent(fileName: string, content: string) {
        const directory = this.getDataDirectory();
        Deno.writeFileSync(`${directory}/${fileName}`, new TextEncoder().encode(content));
    }

    public deleteFile(fileName: string) {
        const directory = this.getDataDirectory();
        Deno.removeSync(`${directory}/${fileName}`);
    }
}

import { Service, existsSync } from "../deps.ts";

const DEFAULT_DATA_DIR = "/data";

@Service()
export class FilesService {

    private getDataDirectory() {
        const directory = Deno.cwd() + (Deno.env.get("DATA_DIR") || DEFAULT_DATA_DIR);
        this.checkDirectoryOrCreate(directory);
        return directory;
    }

    private checkDirectoryOrCreate(directory: string): void {
        if (!existsSync(directory)) {
            Deno.mkdirSync(directory);
        }
    }

    public getFileNumber(): number {
        const directory = this.getDataDirectory();
        this.checkDirectoryOrCreate(directory);
        const files = Deno.readDirSync(directory);
        let num = 0;
        for (const _ of files) {
            num++;
        }
        return num;
    }

    public getFiles(): string[] {
        const directory = this.getDataDirectory();
        const files = Deno.readDirSync(directory);
        return [...files].filter(file => file.isFile).map(file => file.name);
    }

    public saveContentToFile(content: string, fileName: string): void {
        const directory = this.getDataDirectory();
        Deno.writeFileSync(`${directory}/${fileName}`, new TextEncoder().encode(content));
    }

    public getFileContent(fileName: string): string {
        const directory = this.getDataDirectory();
        return new TextDecoder().decode(Deno.readFileSync(`${directory}/${fileName}`));
    }

    public editFileContent(fileName: string, content: string): void {
        const directory = this.getDataDirectory();
        Deno.writeFileSync(`${directory}/${fileName}`, new TextEncoder().encode(content));
    }

    public deleteFile(fileName: string): void {
        const directory = this.getDataDirectory();
        Deno.removeSync(`${directory}/${fileName}`);
    }
}

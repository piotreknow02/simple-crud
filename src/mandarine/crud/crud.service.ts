import { Service, Inject } from "../deps.ts";
import { FilesService } from "../files/files.service.ts";

@Service()
export class CrudService {
    @Inject()
    private filesService!: FilesService;

    public getFileNumber(): number {
        return this.filesService.getFileNumber();
    }

    public getFiles(): string[] {
        return this.filesService.getFiles();
    }

    public createFile(content: string, fileName: string): void {
        this.filesService.saveContentToFile(content, fileName);
    }

    public getFileContent(id: number): string {
        const fileName = this.filesService.getFiles()[id];
        return this.filesService.getFileContent(fileName);
    }

    public editFile(id: number, content: string): void {
        const fileName = this.filesService.getFiles()[id];
        this.filesService.editFileContent(fileName, content);
    }

    public deleteFile(id: number): void {
        const fileName = this.filesService.getFiles()[id];
        this.filesService.deleteFile(fileName);
    }
}
    
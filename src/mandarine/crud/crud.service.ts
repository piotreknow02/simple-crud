import { Service, Inject } from "../deps.ts";
import { FilesService } from "../files/files.service.ts";

@Service()
export class CrudService {
    @Inject()
    private filesService: FilesService;

    public getFileNumber() {
        return this.filesService.getFileNumber();
    }

    public getFiles() {
        return this.filesService.getFiles().map(file => file.name);
    }

    public saveContentToFile(content: string, fileName: string) {
        this.filesService.saveContentToFile(content, fileName);
    }

    public getFileContent(fileName: string) {
        return this.filesService.getFileContent(fileName);
    }

    public editFileContent(fileName: string, content: string) {
        this.filesService.editFileContent(fileName, content);
    }

    public deleteFile(fileName: string) {
        this.filesService.deleteFile(fileName);
    }
}
    
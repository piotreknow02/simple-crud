import { Controller, GET, POST, Render, Inject, Model, ViewModel, RequestBody, QueryParam, } from "../deps.ts";
import { CrudService } from "./crud.service.ts"

@Controller("/crud")
export class CrudController {
    @Inject()
    private crudService!: CrudService;

    @GET("/")
    @Render("crud.ejs")
    public index(@Model() model: ViewModel) {
        model.setAttribute("data", {
            fileNumber: this.crudService.getFileNumber(),
            filesArray: this.crudService.getFiles()
        });
        return model;
    }

    @GET("/create")
    @Render("crud-create.ejs")
    public create(@Model() model: ViewModel) {
        return model;
    }

    @POST("/create")
    @Render("redirect.ejs")
    public handleCreate(@RequestBody() body: {filename: string, content: string}, @Model() model: ViewModel) {
        try{
            this.crudService.createFile(body.content, body.filename);
            model.setAttribute("data", {
                link: "/crud/"
            });
            return model;
        }
        catch(e) {
            throw new Error("Error creating file: \n" + e.toString());
        }
    }

    @GET("/read")
    @Render("crud-read.ejs")
    public read(@QueryParam("id") id: number, @Model() model: ViewModel) {
        model.setAttribute("data", {
            fileContent: this.crudService.getFileContent(id)
        });
        return model;
    }

    @GET("/update")
    @Render("crud-update.ejs")
    public update(@QueryParam("id") id: number, @Model() model: ViewModel) {
        model.setAttribute("data", {
            fileContent: this.crudService.getFileContent(id)
        });
        return model;
    }

    @POST("/update")
    @Render("redirect.ejs")
    public handleUpdate(@QueryParam("id") id: number, @RequestBody() body: {content: string}, @Model() model: ViewModel) {
        try{
            this.crudService.editFile(id, body.content);
            model.setAttribute("data", {
                link: "/crud/"
            });
            return model;
        }
        catch(e){
            throw new Error("Error deleting file: \n" + e.toString());
        }
    }

    @GET("/delete")
    @Render("redirect.ejs")
    public delete(@QueryParam("id") id: number, @Model() model: ViewModel) {
        try{
            this.crudService.deleteFile(id);
            model.setAttribute("data", {
                link: "/crud/"
            });
            return model;
        }
        catch(e){
            throw new Error("Error deleting file: \n" + e.toString());
        }
    }
}

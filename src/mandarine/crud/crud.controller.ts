import { Controller, GET, Render, Inject, Model, ViewModel } from "../deps.ts";
import { CrudService } from "./crud.service.ts"

@Controller("/crud")
export class CrudController {
    @Inject()
    private crudService: CrudService;

    @GET("/")
    @Render("crud.ejs")
    public index(@Model() model: ViewModel) {
        model.setAttribute("data", {
            fileNumber: this.crudService.getFileNumber(),
            filesArray: this.crudService.getFiles()
        })
        return model
    }

    @GET("/create")
    @Render("crud-create.ejs")
    public create(@Model() model: ViewModel) { }

    @GET("/read")
    @Render("crud-read.ejs")
    public read(@Model() model: ViewModel) { }

    @GET("/update")
    @Render("crud-update.ejs")
    public update(@Model() model: ViewModel) { }

    @GET("/delete")
    @Render("crud-delete.ejs")
    public delete(@Model() model: ViewModel) { }

}

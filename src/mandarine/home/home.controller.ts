import { Controller, GET, Render, Model, ViewModel, Inject } from "../deps.ts";
import { HomeService } from "./home.service.ts"

@Controller()
export class HomeController {
    @Inject()
    private homeService: HomeService;
    @GET("/")
    @Render("index.ejs")
    public index(@Model() model: ViewModel)
    {
        model.setAttribute("data", {
            name: this.homeService.Name
        });
        return model
    }
}
    
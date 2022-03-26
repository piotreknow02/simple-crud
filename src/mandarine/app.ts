import { MandarineCore } from "./deps.ts";
import { HomeController } from "./controllers-export.ts";
import { CrudController } from "./crud/crud.controller.ts";

const controllers = [HomeController, CrudController];
const services = [];
const middleware = [];
const repositories = [];
const configurations = [];
const components = [];
const otherModules = [];
new MandarineCore().MVC().run();

import { MandarineCore } from "./deps.ts";
import { HomeController } from "./controllers-export.ts"

const controllers = [HomeController];
const services = [];
const middleware = [];
const repositories = [];
const configurations = [];
const components = [];
const otherModules = [];
new MandarineCore().MVC().run();

import { MandarineCore, Controller, GET } from "../deps.ts";
@Controller()
export class MyController {
  @GET('/')
  public httpHandler() {
      return "Hello world";
  }
}

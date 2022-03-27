import { Service } from "../deps.ts";

@Service()
export class HomeService {
    private readonly name = "Simple CRUD";
    public get Name() {
        return this.name
    }
}
    
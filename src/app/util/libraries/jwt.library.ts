import { JwtHelperService } from "@auth0/angular-jwt";

export class JwtLibrary {

    private static _instance: JwtLibrary;

    private constructor() {

    }

    static get instance(): JwtLibrary {
        if (!this._instance) {
            this._instance = new JwtLibrary();
        }
        return this._instance;
    }

    public decode(token: string) {
        const helper = new JwtHelperService();
        const decodeToken = helper.decodeToken(token);
        return decodeToken;
    }

}
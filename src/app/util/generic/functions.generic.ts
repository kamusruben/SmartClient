import { TRANSLATE_SETTINGS } from './../configs/general-config';
import { JwtLibrary } from './../libraries/jwt.library';


export class FunctionsGeneric {

    static initialize() { }

    public static setToken(token: string): boolean {
        localStorage.setItem('token', token);
        return true;
    }

    public static getDecodedToken(): any {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        return JwtLibrary.instance.decode(token);
    }

    public static removeToken(): void {
        localStorage.removeItem('token');
    }

    public static getLang(): string {
        let lang = localStorage.getItem('lang');
        if (!lang) {
            lang = TRANSLATE_SETTINGS.defaultLang;
            localStorage.setItem('lang', lang);
        }
        return lang;
    }
}

FunctionsGeneric.initialize();

import { environment } from 'src/environments/environment';
import {KeycloakService} from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService) {
  return (): Promise<any> => {
    return new Promise(async (resolve: any, reject: any) => {
      try {
        await keycloak.init({
          config: {
            url: environment.keycloak.issuer,
            realm: environment.keycloak.realm,
            clientId: environment.keycloak.clientId,
          },
          loadUserProfileAtStartUp: true,
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: true
          },
          bearerExcludedUrls: [],

        });

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

}

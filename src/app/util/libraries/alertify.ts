import {DEFAULT_SUCCESS_MESSAGE, DEFAULT_TITLE_CONFIRM} from '../configs/general-config';

declare var alertify: any;

export class Alertify {
  private static _instance: Alertify;

  private constructor() {
    // set default for use bootstap style buttons
    alertify.defaults.theme.ok = 'btn btn-primary';
    alertify.defaults.theme.cancel = 'btn btn-default';
    alertify.defaults.theme.input = 'form-control';
    alertify.set('notifier', 'position', 'top-center');
  }

  static get instance(): Alertify {
    if (!this._instance) {
      this._instance = new Alertify();
    }
    return this._instance;
  }

  public alert(title: string, message: string, callBack: any) {
    alertify.alert(title, message, callBack);
  }

  public success(message: string = DEFAULT_SUCCESS_MESSAGE) {
    alertify.success(message);
  }

  public message(message: string = DEFAULT_SUCCESS_MESSAGE) {
    alertify.message(message);
  }

  public notify(message: string = DEFAULT_SUCCESS_MESSAGE) {
    alertify.notify(message);
  }

  public customNotify(message: string = DEFAULT_SUCCESS_MESSAGE, designClass: string = 'black-notify') {
    alertify.notify(message, designClass);
  }

  public error(message: string = DEFAULT_SUCCESS_MESSAGE) {
    alertify.error(message);
  }

  public warning(message: string = DEFAULT_SUCCESS_MESSAGE) {
    alertify.warning(message);
  }
}

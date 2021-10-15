import { Observable } from "rxjs";

export interface CanEditDeactivate {
    canDeactivate: () => Observable<boolean> | boolean;
}

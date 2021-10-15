import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CanEditDeactivate } from "./can-edit-deactivate";

@Injectable({providedIn: 'root'})
export class CanDeactivateEdit implements CanDeactivate<CanEditDeactivate> {
    canDeactivate(component: CanEditDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return component.canDeactivate();
    }

}
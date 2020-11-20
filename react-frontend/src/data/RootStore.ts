import { createStore, Store, Dispatch, MiddlewareAPI, Middleware, applyMiddleware } from "redux";
import {
    IApplicationState,
    applicationStateDefault,
    LoginState,
    InternalScreenSectionState,
    LoginScreenSectionState
} from "./AppState";
import { IAppAction } from "./AppAction";
import { AppActionType } from "./AppActionType";

function appStateReducer(state: IApplicationState = applicationStateDefault, actionObj: unknown)
{
    const action = actionObj as IAppAction;

    switch (action.type)
    {
        case AppActionType.LOG_IN:
            return {
                ...state,
                loginState: LoginState.LOGGED_IN,
                currentSection: new InternalScreenSectionState()
            };

        case AppActionType.LOG_OUT:
            return {
                ...state,
                loginState: LoginState.LOGGED_OUT,
                currentSection: new LoginScreenSectionState()
            };

        default:
            return state;
    }
}

const spreadClassToObject: Middleware =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_: MiddlewareAPI) =>
        (next: Dispatch) =>
            (action: IAppAction) => {
                return next({ ...action });
            };

const store: Store<IApplicationState, IAppAction> = createStore(appStateReducer, applyMiddleware(spreadClassToObject));

export default store;
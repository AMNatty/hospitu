import { createStore, Store, Dispatch, MiddlewareAPI, Middleware, applyMiddleware } from "redux";
import {
    IApplicationState,
    applicationStateDefault,
    LoginState,
    InternalScreenSectionState,
    LoginScreenSectionState, SectionType
} from "./AppState";
import { IAppAction, LoginAction, SwitchSectionAction, SwitchViewAction } from "./AppAction";
import { AppActionType } from "./AppActionType";

function appStateReducer(state: IApplicationState = applicationStateDefault, actionObj: unknown)
{
    const action = actionObj as IAppAction;

    switch (action.type)
    {
        case AppActionType.LOG_IN:
        {
            const loginAction = action as LoginAction;

            return {
                ...state,
                loginState: LoginState.LOGGED_IN,
                currentSection: new InternalScreenSectionState(loginAction.loginData)
            };
        }

        case AppActionType.LOG_OUT:
        {
            return {
                ...state,
                loginState: LoginState.LOGGED_OUT,
                currentSection: new LoginScreenSectionState()
            };
        }

        case AppActionType.SWITCH_VIEW:
        {
            const switchViewAction = action as SwitchViewAction;

            if (state.currentSection.sectionType !== SectionType.INTERNAL_SCREEN)
                break;

            return {
                ...state,
                currentSection: {
                    ...state.currentSection,
                    sectionState: {
                        ...(state.currentSection as InternalScreenSectionState).sectionState,
                        currentView: switchViewAction.targetView
                    }
                }
            };
        }

        case AppActionType.SWITCH_SECTION:
        {
            const switchSectionAction = action as SwitchSectionAction;

            if (state.currentSection.sectionType !== SectionType.INTERNAL_SCREEN)
                break;

            return {
                ...state,
                currentSection: {
                    ...state.currentSection,
                    sectionState: switchSectionAction.targetSection
                }
            };
        }

        default:
            return state;
    }

    return state;
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
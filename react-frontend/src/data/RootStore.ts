import { createStore, Store, Dispatch, MiddlewareAPI, Middleware, applyMiddleware } from "redux";
import {
    IApplicationState,
    applicationStateDefault,
    LoginState,
    InternalScreenSectionState,
    LoginScreenSectionState, SectionType
} from "./AppState";
import {
    IAppAction,
    LoginAction, SwitchManagedUserAction,
    SwitchSectionAction,
    SwitchViewAction,
    UpdateManagedUserAction,
    UpdateSelfUserAction
} from "./AppAction";
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

        case AppActionType.SWITCH_MANAGED_USER:
        {
            const switchManagedUser = action as SwitchManagedUserAction;

            if (state.currentSection.sectionType !== SectionType.INTERNAL_SCREEN)
                break;

            const internalState = state.currentSection as InternalScreenSectionState;

            const newInternalState = {
                ...internalState,
                managedUser: switchManagedUser.userData
            };

            return {
                ...state,
                currentSection: newInternalState
            };
        }

        case AppActionType.UPDATE_MANAGED_USER:
        {
            const updateUserAction = action as UpdateManagedUserAction;

            if (state.currentSection.sectionType !== SectionType.INTERNAL_SCREEN)
                break;

            const internalState = state.currentSection as InternalScreenSectionState;

            const newInternalState = {
                ...internalState,
                managedUser: {
                    ...internalState.managedUser,
                    ...updateUserAction.userData
                }
            };

            return {
                ...state,
                currentSection: newInternalState
            };
        }

        case AppActionType.UPDATE_SELF_USER:
        {
            const updateUserAction = action as UpdateSelfUserAction;

            if (state.currentSection.sectionType !== SectionType.INTERNAL_SCREEN)
                break;

            const internalState = state.currentSection as InternalScreenSectionState;

            return {
                ...state,
                currentSection: {
                    ...internalState,
                    loginData: {
                        ...internalState.loginData,
                        ...updateUserAction.userData
                    }
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

enum ACTION_TYPE {
	IS_INITIALIZED = 'IS_INITIALIZED'
}

export const initialState = {
	isInitialized: true
}

export type IsInitializedReducerActionType =
	ReturnType<typeof isInitialized>

export type InitialStateAppType = typeof initialState;

export const isInitializedReducer = (state: InitialStateAppType = initialState, action: IsInitializedReducerActionType): InitialStateAppType => {
	switch (action.type) {
		case ACTION_TYPE.IS_INITIALIZED:
			return { isInitialized: action.isInitialized }

		default:
			return state
	}
}

//Action
export const isInitialized = (isInitialized: boolean) => ({ type: ACTION_TYPE.IS_INITIALIZED, isInitialized } as const)

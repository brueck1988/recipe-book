import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
	ingredients: Ingredient[];
	editedIngredient: Ingredient;
	editedIngredientIndex: number;
}

export interface AppState {
	shoppingList: State;
}

const initialState: State = {
	ingredients:  [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
	editedIngredient: null,
	editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) { // initial state is set if a state is not passed in to the method
	switch (action.type) {
		case ShoppingListActions.ADD_INGREDIENT:
			return {
				...state, 
				ingredients: [...state.ingredients, action.payload]// set new array that contains existing elements
			};
		case ShoppingListActions.ADD_INGREDIENTS:
			return {
				...state,
				ingredients: [...state.ingredients, ...action.payload]
			};
		case ShoppingListActions.UPDATE_INGREDIENT:
			const ingredient = state.ingredients[state.editedIngredientIndex];
			const updatedIngredient = {
				...ingredient,
				...action.payload
			};
			const updatedIngredients = [...state.ingredients];
			updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
			
			return {
				...state, 
				ingredients: updatedIngredients,
				editedIngredientIndex: -1,
				editedIngredient: null
			};
		case ShoppingListActions.DELETE_INGREDIENT:
			
			return {
				...state, 
				ingredients: state.ingredients.filter((ingredient, index) => {
					return index !== state.editedIngredientIndex;
				}),
				editedIngredientIndex: -1,
				editedIngredient: null
			};
		case ShoppingListActions.START_EDIT:
			return {
				...state, 
				editedIngredientIndex: action.payload,
				editedIngredient: { ...state.ingredients[action.payload] } //The spread operator makes a copy of the object
			};
		case ShoppingListActions.STOP_EDIT:
			return {
				...state, 
				editedIngredient: null,
				editedIngredientIndex: -1
			};
		default: 
			return state; // return state for default case - when an ingredient IS NOT being added with an action, etc.
	}
}
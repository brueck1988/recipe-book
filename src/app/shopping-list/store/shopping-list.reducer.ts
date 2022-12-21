import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
	ingredients:  [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) { // initial state is set if a state is not passed in to the method
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
			default: 
				return state; // return state for default case - when an ingredient IS NOT being added with an action, etc.
	}
}
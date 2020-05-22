import ErrorResponse from './responses/errorResponse';
import FoodstuffResponse from './handlers/foodstuffs/responses/foodstuffResponse';
import FoodstuffsResponse from './handlers/foodstuffs/responses/foodstuffsResponse';
import FamilyMemberResponse from './handlers/familyMembers/responses/familyMemberResponse';
import FamilyMembersResponse from './handlers/familyMembers/responses/familyMembersResponse';
import RecipeResponse from './handlers/recipes/responses/recipeResponse';
import RecipesResponse from './handlers/recipes/responses/recipesResponse';
import FoodAllergyHistoriesResponse from './handlers/foodAllergyHistories/responses/foodAllergyHistoriesResponse';
import FoodAllergyHistoryResponse from './handlers/foodAllergyHistories/responses/foodAllergyHistoryResponse';
import DailyMealsResponse from './handlers/dailyMeals/responses/dailyMealsResponse';
import DailyMealResponse from './handlers/dailyMeals/responses/dailyMealResponse';

type ApiResponse =
  | ErrorResponse
  | FoodstuffResponse
  | FoodstuffsResponse
  | RecipeResponse
  | RecipesResponse
  | FamilyMemberResponse
  | FamilyMembersResponse
  | FoodAllergyHistoryResponse
  | FoodAllergyHistoriesResponse
  | DailyMealResponse
  | DailyMealsResponse;

export default ApiResponse;

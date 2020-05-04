import * as yup from 'yup';

export const inputRecipeIngredientFormSchema = yup.object().shape({
  foodstuffID: yup.string().required('選択してください'),
  quantity: yup.string().required('入力してください'),
});

export type InputRecipeIngredientForm = yup.InferType<
  typeof inputRecipeIngredientFormSchema
>;

import * as yup from 'yup';

export const addRecipeFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('入力してください')
    .min(1, 'レシピ名を入力してください'),
  ingredients: yup.array().of(
    yup.object().shape({
      foodstuffID: yup.string(),
      quantity: yup.string(),
    })
  ),
});

export type AddRecipeForm = yup.InferType<typeof addRecipeFormSchema>;

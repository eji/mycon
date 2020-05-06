import * as yup from 'yup';

export const inputMealFormSchema = yup.object().shape({
  name: yup.string(),
  recipeIDs: yup.array().of(yup.string()),
});

export type InputMealForm = yup.InferType<typeof inputMealFormSchema>;

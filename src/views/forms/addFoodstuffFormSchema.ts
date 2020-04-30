import * as yup from 'yup';

export const AddFoodstuffFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('入力してください')
    .min(1, '食材名を入力してください'),
});

export type AddFoodstuffForm = yup.InferType<typeof AddFoodstuffFormSchema>;

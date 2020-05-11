import * as yup from 'yup';

export const addFoodAllergyHistoryFormSchema = yup.object().shape({
  familyMemberID: yup
    .string()
    .required('アレルギーを発症した家族を指定してください'),
});

export type AddFoodAllergyHistoryForm = yup.InferType<
  typeof addFoodAllergyHistoryFormSchema
>;

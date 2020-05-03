import * as yup from 'yup';

export const saveFamilyMemberFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('入力してください')
    .min(1, '家族の名前を入力してください'),
});

export type SaveFamilyMemberForm = yup.InferType<
  typeof saveFamilyMemberFormSchema
>;

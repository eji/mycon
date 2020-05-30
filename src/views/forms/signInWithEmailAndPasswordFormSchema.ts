import * as yup from 'yup';

export const signInWithEmailAndPasswordFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('メールアドレスを入力してください')
    .email('メールアドレスを入力してください'),
  password: yup.string().required('パスワードを入力してください'),
});

export type SignInWithEmailAndPasswordForm = yup.InferType<
  typeof signInWithEmailAndPasswordFormSchema
>;

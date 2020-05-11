import React, { useContext, useState, ReactElement } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery,
  createStyles,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import * as TE from 'fp-ts/lib/TaskEither';
import { Formik } from 'formik';
import { pipe } from 'fp-ts/lib/pipeable';
import { appStateContext } from '../AppStateProvider';
import {
  addFoodAllergyHistoryFormSchema,
  AddFoodAllergyHistoryForm,
} from '../../forms/addFoodAllergyHistoryFormSchema';
import { addFoodAllergyHistory } from '../../state/appState/allFoodAllergyHistories';
import { Foodstuff } from '../../../domain/models/foodstuff';

const useStyles = makeStyles(() => {
  return createStyles({
    root: {},
    selectFamilyMemberField: {
      width: '100%',
    },
  });
});

interface Props {
  open: boolean;
  foodstuff: Foodstuff;
  handleClose: () => unknown;
}

const SelectFamilyMemberWithFoodAllergyDialog: React.FC<Props> = (
  props: Props
) => {
  const { open, foodstuff, handleClose } = props;
  const { appState, dispatch } = useContext(appStateContext);
  const { allFamilyMembers } = appState;
  const familyMembers = Object.values(allFamilyMembers);
  const classes = useStyles();

  const initValues: AddFoodAllergyHistoryForm = {
    familyMemberID: '',
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="レシピを選択"
      className={classes.root}
    >
      <Formik
        initialValues={initValues}
        validationSchema={addFoodAllergyHistoryFormSchema}
        validateOnChange={false}
        onSubmit={async (values): Promise<void> => {
          await pipe(
            addFoodAllergyHistory({
              form: values,
              foodstuff,
              allFamilyMembers,
            }),
            TE.map(dispatch),
            TE.map(handleClose),
            TE.mapLeft((error) => console.log(error))
          )();
        }}
      >
        {({
          values,
          submitForm,
          isSubmitting,
          setFieldValue,
        }): ReactElement => (
          <>
            <DialogTitle id="select-ingredient">
              アレルギー履歴の登録
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                アレルギーが発症した家族を選択してください
              </DialogContentText>
              <FormControl className={classes.selectFamilyMemberField}>
                <InputLabel id="family-member-select-label">
                  アレルギーが発症した家族
                </InputLabel>
                <Select
                  fullWidth
                  labelId="family-member-select-label"
                  id="family-member-select"
                  value={values.familyMemberID}
                  onChange={(
                    event: React.ChangeEvent<{ value: unknown }>
                  ): void => {
                    setFieldValue(
                      'familyMemberID',
                      event.target.value as string
                    );
                  }}
                >
                  {familyMembers.map((familyMember) => (
                    <MenuItem value={familyMember.id}>
                      {familyMember.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                選択
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default SelectFamilyMemberWithFoodAllergyDialog;

import React, { useContext, ReactElement } from 'react';
import { Formik, Form } from 'formik';
import { pipe } from 'fp-ts/lib/pipeable';
import { map, mapLeft } from 'fp-ts/lib/TaskEither';
import {
  makeStyles,
  Theme,
  createStyles,
  ButtonBase,
  Typography,
  TextField,
  Divider,
  Grid,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Layout from '../layouts/Layout';
import { appStateContext } from '../components/AppStateProvider';
import {
  AddFoodstuffForm,
  addFoodstuffFormSchema,
} from '../forms/addFoodstuffFormSchema';
import { addFoodstuff } from '../state/appState/allFoodstuffs';
import CommandError from '../../errors/repositoryErrors/commandError';
import CheckboxButton from '../components/common/CheckboxButton';
import Nutrient, {
  WATER_SOLUBLE_VITAMINS,
  FAT_SOLUBLE_VITAMINS,
  MINERALS,
  FATS,
  CARBOHYDRATES,
  PROTEINS,
} from '../../domain/models/nutrient';
import { foodstuffCategories } from '../../domain/models/foodstuffCategory';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    inputArea: {
      flex: 'auto',
      width: '100%',
      overflowY: 'scroll',
    },
    textField: {
      width: '100%',
    },
    selectCategoryArea: {
      marginTop: theme.spacing(2),
      width: '70%',
    },
    nutrients: {
      marginTop: theme.spacing(2),
    },
    nutrientCategory: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    nutrientCategorySection: {
      marginLeft: theme.spacing(1),
    },
    nutrientItem: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
    button: {
      height: 40,
      width: '100%',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    selectPhotoButton: {
      width: '100%',
      height: 150,
      backgroundColor: '#ddd',
    },
    selectPhotoInputLabel: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 150,
    },
    selectPhotoButtonIcon: {
      width: 100,
      height: 100,
      color: '#999',
    },
    selectPhotoInput: {
      display: 'none',
    },
  })
);

type AddFoodstuffScreenProps = {};

const AddFoodstuffScreen: React.FC<AddFoodstuffScreenProps> = () => {
  const history = useHistory();
  const classes = useStyles();
  const { dispatch } = useContext(appStateContext);

  const initValues: AddFoodstuffForm = {
    name: '',
    nutrients: [],
    category: '',
  };

  const handleBack = (): void => {
    history.goBack();
  };

  const handleSubmit = async (values: AddFoodstuffForm): Promise<void> => {
    await pipe(
      addFoodstuff(values),
      map(dispatch),
      map(handleBack),
      mapLeft((error: CommandError) => console.log(error))
    )();
  };

  const NutrientItem = (props: {
    nutrient: Nutrient;
    values: Nutrient[];
    setFieldValue: (
      field: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any,
      shouldValidate?: boolean | undefined
    ) => void;
  }): JSX.Element => {
    const { nutrient, values, setFieldValue } = props;
    const checked = values.includes(nutrient);
    const handleChecked = (): void => {
      setFieldValue(
        'nutrients',
        checked ? values.filter((v) => v !== nutrient) : [...values, nutrient]
      );
    };
    return (
      <Box className={classes.nutrientItem}>
        <CheckboxButton
          text={nutrient}
          checked={checked}
          handleChecked={handleChecked}
        />
      </Box>
    );
  };

  const nutrientList = (params: {
    section: string;
    nutrients: Nutrient[];
    values: Nutrient[];
    setFieldValue: (
      field: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any,
      shouldValidate?: boolean | undefined
    ) => void;
  }): JSX.Element => {
    const { section, nutrients, values, setFieldValue } = params;

    return (
      <>
        <Divider variant="fullWidth" />
        <Typography className={classes.nutrientCategorySection}>
          {section}
        </Typography>
        <Grid item className={classes.nutrientCategory}>
          {nutrients.map((nutrient) => (
            <NutrientItem
              nutrient={nutrient}
              values={values}
              setFieldValue={setFieldValue}
            />
            // <Box className={classes.nutrientItem}>
            //   <CheckboxButton
            //     text={nutrient}
            //     checked={values.includes(nutrient)}
            //     handleChecked={(): void => {}}
            //   />
            // </Box>
          ))}
        </Grid>
      </>
    );
  };

  return (
    <Layout title="食材の追加" handleBack={handleBack} hideBottomNavi>
      <Formik
        initialValues={initValues}
        validationSchema={addFoodstuffFormSchema}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          submitForm,
          isSubmitting,
          setFieldValue,
        }): ReactElement => (
          <Form className={classes.root}>
            <div className={classes.inputArea}>
              <div className={classes.textField}>
                <TextField
                  type="text"
                  name="name"
                  label="食材名"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
              </div>
              <ButtonBase className={classes.selectPhotoButton}>
                <label
                  htmlFor="take-picture"
                  className={classes.selectPhotoInputLabel}
                >
                  <AddAPhotoIcon className={classes.selectPhotoButtonIcon} />
                  <input
                    type="file"
                    id="take-picture"
                    accept="image/*"
                    className={classes.selectPhotoInput}
                  />
                </label>
              </ButtonBase>
              <FormControl className={classes.selectCategoryArea}>
                <InputLabel id="foodstuff-category-select-label">
                  カテゴリ
                </InputLabel>
                <Select
                  labelId="foodstuff-category-select-label"
                  id="foodstuff-category-select"
                  value={values.category}
                  onChange={(
                    event: React.ChangeEvent<{ value: unknown }>
                  ): void => {
                    setFieldValue('category', event.target.value as string);
                  }}
                >
                  {foodstuffCategories.map((foodstuffCategory) => (
                    <MenuItem value={foodstuffCategory}>
                      {foodstuffCategory}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Grid
                container
                xs={12}
                direction="column"
                alignItems="stretch"
                justify="flex-start"
                spacing={2}
                className={classes.nutrients}
              >
                {nutrientList({
                  section: '炭水化物',
                  nutrients: CARBOHYDRATES,
                  setFieldValue,
                  values: values.nutrients as Nutrient[],
                })}
                {nutrientList({
                  section: 'タンパク質',
                  nutrients: PROTEINS,
                  setFieldValue,
                  values: values.nutrients as Nutrient[],
                })}
                {nutrientList({
                  section: '脂質',
                  nutrients: FATS,
                  setFieldValue,
                  values: values.nutrients as Nutrient[],
                })}
                {nutrientList({
                  section: 'ミネラル',
                  nutrients: MINERALS,
                  setFieldValue,
                  values: values.nutrients as Nutrient[],
                })}
                {nutrientList({
                  section: '脂溶性ビタミン',
                  nutrients: FAT_SOLUBLE_VITAMINS,
                  setFieldValue,
                  values: values.nutrients as Nutrient[],
                })}
                {nutrientList({
                  section: '水溶性ビタミン',
                  nutrients: WATER_SOLUBLE_VITAMINS,
                  setFieldValue,
                  values: values.nutrients as Nutrient[],
                })}
              </Grid>
            </div>
            <ButtonBase
              type="button"
              disabled={isSubmitting}
              className={classes.button}
              onClick={submitForm}
            >
              <Typography>登録</Typography>
            </ButtonBase>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default AddFoodstuffScreen;

import React, { useContext, ReactElement, useState } from 'react';
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
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { appStateContext } from '../components/AppStateProvider';
import {
  AddFoodstuffForm,
  addFoodstuffFormSchema,
} from '../forms/addFoodstuffFormSchema';
import { addFoodstuff } from '../state/appState/allFoodstuffs';
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
import ImageUploader from '../components/common/ImageUploader';
import AppError from '../../errors/AppError';

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
  })
);

type AddFoodstuffScreenProps = {};

const AddFoodstuffScreen: React.FC<AddFoodstuffScreenProps> = () => {
  const history = useHistory();
  const classes = useStyles();
  const { dispatch } = useContext(appStateContext);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<null | string>(null);

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
      mapLeft((error: AppError) => console.log(error))
    )();
  };

  const NutrientItem = (props: {
    nutrient: Nutrient;
    values: Readonly<Nutrient[]>;
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
    nutrients: Readonly<Nutrient[]>;
    values: Readonly<Nutrient[]>;
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
    <>
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
                <ImageUploader
                  dialogTitle="食材の画像"
                  handleUploadImage={(imageUrl: string): void => {
                    setUploadedImageUrl(imageUrl);
                  }}
                />
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
    </>
  );
};

export default AddFoodstuffScreen;

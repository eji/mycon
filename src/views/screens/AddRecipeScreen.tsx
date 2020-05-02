import React, { useContext } from 'react';
import {
  TextField,
  Button,
  Container,
  Table,
  TableContainer,
  createStyles,
  makeStyles,
  Theme,
  Paper,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  ButtonBase,
  Typography,
  Box,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Layout from '../layouts/Layout';
import { appStateContext } from '../components/AppStateProvider';

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
      overflowX: 'hidden',
      padding: theme.spacing(1),
    },
    tableContainer: {
      width: '100%',
    },
    table: {},
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

type AddRecipeScreenProps = {};

const AddRecipeScreen: React.FC<AddRecipeScreenProps> = () => {
  const { appState } = useContext(appStateContext);
  const { allRecipes } = appState;
  const recipes = Object.values(allRecipes);
  const classes = useStyles();

  return (
    <Layout title="レシピの追加" hideBottomNavi>
      <Box className={classes.root}>
        <Box className={classes.inputArea}>
          <TextField name="name" type="text" label="レシピ名" fullWidth />
          <Typography>材料</Typography>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>食材</TableCell>
                  <TableCell align="right">分量</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key="xxx">
                  <TableCell component="th" scope="row">
                    人参
                  </TableCell>
                  <TableCell align="right">100本</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Container>
            <Button startIcon={<AddIcon />}>材料を追加</Button>
          </Container>
        </Box>
        <ButtonBase
          type="button"
          // disabled={isSubmitting}
          className={classes.button}
        >
          <Typography>登録</Typography>
        </ButtonBase>
      </Box>
    </Layout>
  );
};

export default AddRecipeScreen;

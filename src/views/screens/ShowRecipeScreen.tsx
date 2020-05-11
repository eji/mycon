import React, { useContext, useState } from 'react';
import {
  createStyles,
  makeStyles,
  Paper,
  Fab,
  Theme,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { appStateContext } from '../components/AppStateProvider';
import { foodstuffsScreenPath } from '../../routePaths';
import Layout from '../layouts/Layout';
import SelectFamilyMemberWithFoodAllergyDialog from '../components/Foodstuff/SelectFamilyMemberWithFoodAllergyDialog';
import { Foodstuff } from '../../domain/models/foodstuff';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      textAlign: 'center',
    },
    section: {},
    fab: {
      position: 'absolute',
      right: theme.spacing(2),
      bottom: theme.spacing(2),
    },
  })
);

const ITEM_HEIGHT = 48;

const ShowRecipeScreen: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const [selectedFoodstuff, setSelectedFoodstuff] = useState<null | Foodstuff>(
    null
  );
  const { appState } = useContext(appStateContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const { id } = useParams();
  if (id == null) {
    history.replace(foodstuffsScreenPath());
    return null;
  }

  const { allRecipes } = appState;
  const recipe = allRecipes[id];
  if (recipe == null) {
    history.replace(foodstuffsScreenPath());
    return null;
  }

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <Layout title={recipe.name} hideBottomNavi handleBack={history.goBack}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {recipe.ingredients.map((ingredients) => {
                return (
                  <TableRow>
                    <TableCell>{ingredients.foodstuff.name}</TableCell>
                    <TableCell>{ingredients.quantity}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClickMenu}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={openMenu}
                        onClose={handleCloseMenu}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '25ch',
                          },
                        }}
                      >
                        <MenuItem
                          key="add-allergy-info"
                          onClick={(): void => {
                            setSelectedFoodstuff(ingredients.foodstuff);
                            handleCloseMenu();
                          }}
                        >
                          アレルギーの追加
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Fab color="primary" aria-label="edit" className={classes.fab}>
          <EditIcon />
        </Fab>
      </Layout>
      {selectedFoodstuff && (
        <SelectFamilyMemberWithFoodAllergyDialog
          open
          foodstuff={selectedFoodstuff}
          handleClose={(): void => setSelectedFoodstuff(null)}
        />
      )}
    </>
  );
};

export default ShowRecipeScreen;

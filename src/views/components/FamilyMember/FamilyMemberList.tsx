import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Fab,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { addFamilyMemberScreenPath } from '../../../routePaths';
import FamilyMember from '../../../domain/models/familyMember';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      height: '100%',
      overflowY: 'scroll',
    },
    fabButton: {
      position: 'absolute',
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
  })
);

type FamilyMemberListProps = {
  familyMembers: FamilyMember[];
};

const FamilyMemberList: React.FC<FamilyMemberListProps> = (
  props: FamilyMemberListProps
) => {
  const { familyMembers } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List>
        {familyMembers.map((familyMember) => (
          <ListItem>
            <ListItemText primary={familyMember.name} />
          </ListItem>
        ))}
      </List>
      <Link
        to={{
          pathname: addFamilyMemberScreenPath(),
        }}
      >
        <Fab
          color="primary"
          aria-label="add family member"
          className={classes.fabButton}
        >
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
};

export default FamilyMemberList;

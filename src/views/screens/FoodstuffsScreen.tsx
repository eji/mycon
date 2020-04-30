import React, { useContext } from 'react';
import Layout from '../layouts/Layout';
import { appStateContext } from '../components/AppStateProvider';
import NoFoodstuff from '../components/Foodstuff/NoFoodstuff';
import FoodstuffList from '../components/Foodstuff/FoodstuffList';

type FoodstuffsScreenProps = {};

const FoodstuffsScreen: React.FC<FoodstuffsScreenProps> = () => {
  const { appState } = useContext(appStateContext);
  const { allFoodstuffs } = appState;
  const foodstuffs = Object.values(allFoodstuffs);

  return (
    <Layout title="食材一覧">
      {foodstuffs.length === 0 ? (
        <NoFoodstuff />
      ) : (
        <FoodstuffList foodstuffs={foodstuffs} />
      )}
    </Layout>
  );
};

export default FoodstuffsScreen;

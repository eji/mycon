import React from 'react';
import Layout from '../layouts/Layout';
import MonthlyScheduleTable from '../components/Schedule/MonthlyScheduleTable';

type ScheduleScreenProps = {};

const ScheduleScreen: React.FC<ScheduleScreenProps> = () => {
  return (
    <Layout title="スケジュール">
      <MonthlyScheduleTable />
    </Layout>
  );
};

export default ScheduleScreen;

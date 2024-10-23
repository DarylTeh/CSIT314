import React, { useState } from 'react';
import Layout from "../../Layout/DashLayout";
import LoanCalculator from '../../components/LoanCalculator';

const Calculator = () => {

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto h-[79vh]">
          <LoanCalculator />
        </div>
      </section>
    </Layout>
  );
};

export default Calculator;
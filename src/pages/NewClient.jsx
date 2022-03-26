import React from 'react';
import FormComponent from '../components/FormComponent';

const NewClient = () => {

  const client = {}

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>New Client</h1>
      <p className='mt-3'>Fill next fields to sign up a new client</p>
      <FormComponent/>
    </>
  );
}

export default NewClient;

import React from 'react';
import Form from '../components/Form';

const NewClient = () => {
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>New Client</h1>
      <p className='mt-3'>Fill next fields to sign up a new client</p>
      <Form/>
    </>
  );
}

export default NewClient;

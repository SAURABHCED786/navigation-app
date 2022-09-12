import React from 'react'
import { Button, Card, Form, FormLayout, Layout, Page, Grid, TextField } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function Users() {

  const handleClearButtonClick = useCallback(() => {
    setName('')
  }, []);

  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [names, setName] = useState('');
  const [phone, setPhone] = useState('');



  const handleSubmit = useCallback((_event) => {
    setId('');
    setEmail('');
    setName('');
    setPhone('');

  }, []);


  const handleIdChange = useCallback((value) => setId(value), []);
  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handleNamesChange = useCallback((value) => setName(value), []);
  const handlePhoneChange = useCallback((value) => setPhone(value), []);
  return (
    <div className="UserPage">
      <Page>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 12, xl: 12 }}>
            <Layout>
                <Card>
                  <div style={{ padding: "20px" }}>
                    <Form onSubmit={handleSubmit}>
                      <FormLayout>
                        <TextField
                          value={id}
                          label="Id"
                          type='id'
                          autoComplete="off"

                        />
                        <TextField
                          value={names}
                          onChange={handleNamesChange}
                          label="Name"
                          type="names"
                          autoComplete="false"
                          clearButton
                          onClearButtonClick={handleClearButtonClick}
                        />
                        <TextField
                          value={phone}
                          onChange={handlePhoneChange}
                          label="Phone"
                          type="number"
                          autoComplete="email"
                        />
                        <TextField
                          value={email}
                          onChange={handleEmailChange}
                          label="Email"
                          type="email"
                          autoComplete="email"
                          helpText={
                            <span>
                              We’ll use this email address to inform you on future changes to
                              Polaris.
                            </span>
                          }
                        />
                        <Button primary size="slim" submit>Submit</Button>
                      </FormLayout>
                    </Form>
                  </div>
                </Card>
            </Layout>
          </Grid.Cell>
        </Grid>
      </Page>
    </div>
  );
}

export default Users


function FormOnSubmitExample() {


}

import React, { useEffect } from 'react'
import { Button, Card, FormLayout, Layout, Page, Grid, TextField } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
function Adduser(props) {
  let params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
   
  console.log(location,"location_data");
  // console.log(location.state[0].email,"location data");
  const [locateData, setlocateData] = useState();
  const nameClearButtonClick = useCallback(() => {
  setName(location.state[0].id);
  }, []);
  const userNameClearButtonClick = useCallback(() => {
    setUser('')
  }, []);
  const phoneClearButtonClick = useCallback(() => {
    setPhone('')
  }, []);
  const emailClearButtonClick = useCallback(() => {
    setEmail('');
  }, [])

  const [email, setEmail] = useState('');
  const [names, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUser] = useState('');

  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handleNamesChange = useCallback((value) => setName(value), []);
  const handlePhoneChange = useCallback((value) => setPhone(value), []);
  const handleUsernameChange = useCallback((value) => setUser(value), []);

  const [info,setinfo]=useState({

  })


  const handleSubmit = (e) => {
    e.preventDefault()
    // add all the values to an object
    // add this object into localStorage
    localStorage.setItem("lastname", "Smith");
    localStorage.getItem("lastname");
    navigate('/', { state: true })
  }



  return (
    <div className="UserPage">
      <Page>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 12, xl: 12 }}>
            <Layout>
              <Card>
                <div style={{ padding: "20px" }}>
                  <FormLayout>
                    <TextField
                      value={username}
                      label="User Name"
                      onChange={handleUsernameChange}
                      type='username'
                      autoComplete="off"
                      clearButton
                      onClearButtonClick={userNameClearButtonClick}
                    />
                    <TextField
                      value={names}
                      onChange={handleNamesChange}
                      label="Name"
                      type="names"
                      autoComplete="off"
                      clearButton
                      onClearButtonClick={nameClearButtonClick}
                    />
                    <TextField
                      value={phone}
                      onChange={handlePhoneChange}
                      label="Phone"
                      type='phone'
                      autoComplete="off"
                      clearButton
                      onClearButtonClick={phoneClearButtonClick}
                    />
                    <TextField
                      value={email}
                      onChange={handleEmailChange}
                      label="Email"
                      type="email"
                      autoComplete="email"
                      clearButton
                      onClearButtonClick={emailClearButtonClick}
                      helpText={
                        <span>
                          We’ll use this email address to inform you on future changes to
                          Polaris.
                        </span>
                      }
                    />
                    <Button primary size="slim" onClick={handleSubmit}>Add User</Button>
                  </FormLayout>
                </div>
              </Card>
            </Layout>
          </Grid.Cell>
        </Grid>
      </Page>
    </div>
  );
}

export default Adduser

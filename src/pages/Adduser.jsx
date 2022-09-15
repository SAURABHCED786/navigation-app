import React, { useEffect } from 'react'
import { Button, Card, FormLayout, Layout, Page, Grid, TextField } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
function Adduser() {
  const [localData, setlocalData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const myUserinfo = JSON.parse(localStorage.getItem("allUserInfo"));

  useEffect(() => {
    setlocalData([...myUserinfo])
  }, []);

  //console.log(localData,"Mylocaldata");

  const companyClearButtonClick = useCallback(() => {
    setCompany('');
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

  const [userid, setUserId] = useState('');
  const [username, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');

  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handleCompanyChange = useCallback((value) => setCompany(value), []);
  const handlePhoneChange = useCallback((value) => setPhone(value), []);
  const handleUsernameChange = useCallback((value) => setUser(value), []);

  useEffect(() => {
    if (location.state != null) {
      myUserinfo.map(usrInfo => {
        if (location.state.id == usrInfo.id) {
          setUserId(location.state.id);
          setUser(usrInfo.username);
          setEmail(usrInfo.email);
          setCompany(usrInfo.company.name);
          setPhone(usrInfo.phone);
        }
      })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    //edit data    
    if (location.state != null) {
      if (location.state.id === userid) {
        localData.map(updateUsr => {
          if (updateUsr.id == userid) {
            const usrUpdated = { id: updateUsr.id, username: username, email: email, phone: phone, company: { name: company } }
            const tmp = []
            localData.forEach(localusr => {
              if (localusr.id == updateUsr.id) {
                tmp.push(usrUpdated)
                return
              }
              tmp.push(localusr)
            })
            localStorage.setItem("allUserInfo", JSON.stringify(tmp));
          }
        })
      }
    }
    //Add Data
    if (location.state == null) {
      const NextId = localData.length;
      const addUrs = { id: NextId + 1, username: username, email: email, phone: phone, company: { name: company } }
      const tmp = []
      localData.forEach(localusr => {
        tmp.push(localusr)
      })
      tmp.push(addUrs)
      localStorage.setItem("allUserInfo", JSON.stringify(tmp));
    }
    navigate("/", { state: true });
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
                      value={company}
                      onChange={handleCompanyChange}
                      label="Compmay"
                      type="company"
                      autoComplete="off"
                      clearButton
                      onClearButtonClick={companyClearButtonClick}
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

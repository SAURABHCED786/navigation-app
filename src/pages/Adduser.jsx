import React, { useEffect } from 'react'
import { Button, Card, FormLayout, Layout, Page, Grid, TextField } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { validUserName, validEmail, validMobile, validCompany } from './regex'

function Adduser(props) {
  const [emailErr, setEmailErr] = useState(false);
  const [usernaemErr, setUsernameErr] = useState(false);
  const [mobleNoErr, setMobNoErr] = useState(false);
  const [companyErr, setCompanyErr] = useState(false);
  const [localData, setlocalData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const myUserinfo = JSON.parse(localStorage.getItem("allUserInfo"));
  const [EditStatus, setEditStatus] = useState(false);
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

  const handleEmailChange = useCallback((value) => {
    setEmail(value)
    if (!validEmail.exec(value)) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
  }, []);
  const handleCompanyChange = useCallback((value) => {
    setCompany(value)
    if (!validCompany.test(value)) {
      setCompanyErr(true);
    } else {
      setCompanyErr(false);
    }
  }, []);
  const handlePhoneChange = useCallback((value) => {
    setPhone(value)
    if (!validMobile.test(value)) {
      setMobNoErr(true);
    } else {
      setMobNoErr(false);
    }
  }, []);

  const handleUsernameChange = useCallback((value) => {
    setUser(value)
    if (!validUserName.test(value)) {
      setUsernameErr(true);
    } else {
      setUsernameErr(false)
    }
  }, []);

  useEffect(() => {
    if (location.state != null) {
      setEditStatus(true)
      myUserinfo.map(usrInfo => {
        if (location.state.id == usrInfo.id) {
          setUserId(location.state.id);
          setUser(usrInfo.username);
          let properEmail = usrInfo.email.toLowerCase();
          setEmail(properEmail);
          let CompanyName = usrInfo.company.name.replace('-', ' ');
          setCompany(CompanyName);
          let onlyNumbers = usrInfo.phone.replace(/[^\d]/g, '');
          let limitToTen = onlyNumbers.slice(0, 10);
          setPhone(limitToTen);
        }
      })
    }
  }, []);

  useEffect(() => {
    // if (!validUserName.test(username)) {
    //   setUsernameErr(true);
    // } else {
    //   setUsernameErr(false)
    // }
    // if (!validEmail.exec(email)) {
    //   setEmailErr(true);
    // } else {
    //   setEmailErr(false);
    // }
    // if (!validMobile.test(phone)) {
    //   setMobNoErr(true);
    // } else {
    //   setMobNoErr(false);
    // }
    // if (!validCompany.test(company)) {
    //   setCompanyErr(true);
    // } else {
    //   setCompanyErr(false);
    // }
  }, [username, email, phone, company])


  const handleSubmit = (e) => {
    e.preventDefault();
    //validation

    if (validUserName.test(username) && validEmail.test(email) && validMobile.test(phone) && validCompany.test(company)) {
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
        //const NextId = localData.length;
        const NextId = Math.floor(Math.random() * 999) + 1;
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
  }
  function goBack() {
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
      navigate("/", { state: true });
    })

  }
  return (
    <div className="UserPage">
      <Page>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
            <Layout>
              <Card>
                <div className="backBtn">
                  <Button size="slim" onClick={goBack}>Go Back</Button>
                </div>
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
                      helpText={
                        <span>
                          {usernaemErr ? <p className='errorMsg'>Enter Valid Username</p> : " "}
                        </span>
                      }
                    />
                    <TextField
                      value={company}
                      onChange={handleCompanyChange}
                      label="Company"
                      type="company"
                      autoComplete="off"
                      clearButton
                      onClearButtonClick={companyClearButtonClick}
                      helpText={
                        <span>
                          {companyErr ? <p className='errorMsg'>Enter Valid Company Name</p> : " "}
                        </span>
                      }
                    />
                    <TextField
                      value={phone}
                      onChange={handlePhoneChange}
                      label="Phone"
                      type='phone'
                      autoComplete="off"
                      clearButton
                      onClearButtonClick={phoneClearButtonClick}
                      helpText={
                        <span>
                          {mobleNoErr ? <p className='errorMsg'>Enter Valid Phone Number</p> : " "}
                        </span>
                      }
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
                          We???ll use this email address to inform you please all details should be valid.
                          {emailErr ? <p className='errorMsg'>Enter Valid Email Address.</p> : ""}
                        </span>
                      }
                    />
                    <Button primary size="slim" onClick={handleSubmit}>{EditStatus ? "Edit" : props.name}</Button>
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

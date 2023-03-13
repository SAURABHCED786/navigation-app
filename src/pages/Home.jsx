import { useLocation, useNavigate } from "react-router-dom";
import { Card, Layout, Page, Grid, TextField, Button, DataTable, Banner } from '@shopify/polaris';
import {
  DeleteMajor, EditMajor
} from '@shopify/polaris-icons';
import React, { useEffect, useState, useCallback } from 'react';
import '../App.css';
function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserdata] = useState();
  const [deletedmsg, setDeletedMsg] = useState(false);
  const [textFilterValue, setFilterValue] = useState('');
  const [filterData, setFilterData] = useState([])
  const [counter, setCounter] = useState(5)

  const rows = []
  useEffect(() => {
    const locData = localStorage.getItem("allUserInfo")
    if (location.state) {
      setUserdata(JSON.parse(locData));
      return
    }
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUserdata(data)
        localStorage.setItem("allUserInfo", JSON.stringify(data));
      });
  }, [])

  //All Showing Data
  function showData(user) {
    const { id, username, name, properEmail, limitToTen, CompanyName } = user

    navigate("/" + id, { state: { id: id, name: name, username: username, email: properEmail, phno: limitToTen, company: CompanyName }, Edit: "Edit" });
  }

  // Delete User Data

  function deleteData(userid) {
    let delId = userid;
    setFilterData([])
    userData.forEach((usrDelData) => {
      if (usrDelData.id == delId) {
        const tmp = []
        userData.forEach(localDelusr => {
          if (localDelusr.id == delId) {
            setDeletedMsg(true);
            return
          }
          tmp.push(localDelusr);
        })
        localStorage.setItem("allUserInfo", JSON.stringify(tmp));
        setUserdata(tmp)
      }
    })
  }

  const handleFilterFieldChange = useCallback(
    (value) => setFilterValue(value),
    [],
  );
  function filterNow() {
    if (textFilterValue) {
      rows.forEach((filter) => {
        filter.forEach((data) => {
          if (data === textFilterValue) {
            setFilterData(filter)
          }
        })
      })
    }
  }

  userData?.forEach((item) => {
    // Real Mobile Number 
    let id = item.id
    let onlyNumbers = item.phone.replace(/[^\d]/g, '');
    let username = item.username
    let name = item.name
    let limitToTen = onlyNumbers.slice(0, 10);
    // Real Company Namebm
    let CompanyName = item.company.name.replace('-', ' ');
    let properEmail = item.email.toLowerCase();
    let button = (<div style={{ margin: "1px", color: "#d92104" }}>
      {/* Edit Button */}
      <Button
        onClick={() => { showData({ id, username, name, properEmail, limitToTen, CompanyName }) }}
        icon={EditMajor}
      >
      </Button>
      &nbsp;&nbsp;
      {/* Delete Button */}
      <Button
        onClick={() => deleteData(id)}
        icon={DeleteMajor} monochrome outline
      >
      </Button>
    </div>)
    rows.push([id, username, name, properEmail, limitToTen, CompanyName, button])
  })

  if (deletedmsg) {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      setDeletedMsg(false)
      setCounter(5)
    }
  }

  useEffect(() => {
    if (textFilterValue) {
      filterNow();
    }
  }, [textFilterValue])
  return (
    <>
      <Page title="Welcome To Todo App">
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
            <div style={{ marginBottom: "100px" }}>
              <Layout>
                {deletedmsg ? <Layout.Section>
                  <Banner
                    title={"Your Data is Successfully Deleted    " + counter}
                    status="success"
                    onDismiss={() => { setDeletedMsg(false) }}
                  >
                    <p>
                      I Hope You're Happy,
                      Thank You For Testing This Todo App.
                    </p>
                  </Banner>
                </Layout.Section> : <></>}
                <Layout.Section>
                  <Card>
                    <Card.Section>
                      <div className="filterData">
                        <TextField
                          label="Search By Any Thing"
                          value={textFilterValue}
                          onChange={handleFilterFieldChange}
                          placeholder="Filter Now"
                          autoComplete="off"
                        />
                      </div>
                      <DataTable
                        columnContentTypes={[
                          'text',
                          'text',
                          'text',
                          'text',
                          'text',
                          'text',
                          'text'
                        ]}

                        headings={[
                          'ID',
                          'Username',
                          'Name',
                          'Email',
                          'Phone',
                          'Company',
                          'Action'
                        ]}
                        rows={textFilterValue ? [filterData] : rows}
                      />
                    </Card.Section>
                  </Card>
                </Layout.Section>
              </Layout>
            </div>
          </Grid.Cell>
        </Grid>
      </Page>
    </>
  );
}
export default Home

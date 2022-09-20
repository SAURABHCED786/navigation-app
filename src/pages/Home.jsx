import { useLocation, useNavigate } from "react-router-dom";
import { Card, Layout, Page, Grid, TextField, Button } from '@shopify/polaris';
import {
  DeleteMajor, EditMajor
} from '@shopify/polaris-icons';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import React, { useEffect, useState, useCallback } from 'react';
import '../App.css';
function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserdata] = useState();
  const [deletedmsg, setDeletedMsg] = useState(false);
  const [textFilterValue, setFilterValue] = useState('');
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
  useEffect(() => {
    if (textFilterValue) {
      filterNow();
    } else {
      filterNow();
    }
  }, [textFilterValue])
  //All Showing Data
  function showData(index) {
    let rowId = index;
    //this gives id of tr whose button was clicked
    let data = document.getElementById(rowId).querySelectorAll(".row-data");
    /*returns array of all elements with 
    "row-data" class within the row with given id*/
    let id = data[0].innerHTML;
    let username = data[1].innerHTML;
    let email = data[2].innerHTML;
    let phno = data[3].innerHTML;
    console.log(phno, "myphno");
    let company = data[4].innerHTML;
    navigate("/" + id, { state: { id: id, username: username, email: email, phno: phno, company: company }, Edit: "Edit" });
  }
  // Delete User Data
  function deleteData(index) {
    let rowId = index;
    //this gives id of tr whose button was clicked
    let data = document.getElementById(rowId).querySelectorAll(".row-data");
    let delId = data[0].innerHTML;
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
  // Filter Data Filter by Contains

  const handleFilterFieldChange = useCallback(
    (value) => setFilterValue(value),
    [],
  );

  function filterNow() {
    // var input, filter, table, tr, td, i, txtValue;
    // input = textFilterValue
    // filter = input.toUpperCase();
    // table = document.getElementById("dataTable");
    // tr = table.getElementsByTagName("tr");
    // for (i = 0; i < tr.length; i++) {
    //   // td = tr[i].getElementsByTagName("td")[0];
    //   let alltags = tr[i].getElementsByTagName("td");
    //   let isFound = false;
    //   for (let j = 0; j < alltags.length; j++) {
    //     td = alltags[j];
    //     if (td) {
    //       txtValue = td.textContent || td.innerText;
    //       if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //         tr[i].style.display = "";
    //         j = alltags.length;
    //         isFound = true;
    //       }
    //     }
    //   }
    //   if (!isFound && tr[i].className !== "header") {
    //     tr[i].style.display = "none";
    //   }
    // }

    var input, filter, table, tr, td, i, txtValue;
    input = textFilterValue
    filter = input.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  return (
    <>
      <Container>
        <Page>
          <div style={{ marginBottom: "100px" }}>
            <Grid>
              <Grid.Cell columnSpan={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <Layout>
                  <Card>
                    <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 6, lg: 12, xl: 12 }}>
                      <div className="filterData">
                        <TextField
                          label="Search By Username"
                          value={textFilterValue}
                          onChange={handleFilterFieldChange}
                          placeholder="Filter Now"
                          autoComplete="off"
                        />
                      </div>
                    </Grid.Cell>
                    <div style={{ padding: "20px" }}>
                      <table id="dataTable" responsive='true'>
                        <thead>
                          <tr className="header">
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Company</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userData &&
                            userData.map((item, index1) => {
                              // Real Mobile Number 
                              let onlyNumbers = item.phone.replace(/[^\d]/g, '');
                              let limitToTen = onlyNumbers.slice(0, 10);
                              // Real Company Namebm
                              let CompanyName = item.company.name.replace('-', ' ');
                              let properEmail = item.email.toLowerCase();
                              return (
                                <tr id={index1} key={index1}>
                                  <td className='row-data'>
                                    {item.id}
                                  </td>
                                  <td className='row-data'>
                                    {item.username}
                                  </td>
                                  <td className='row-data'>
                                    {properEmail}
                                  </td>
                                  <td className='row-data'>
                                    {limitToTen}
                                  </td>
                                  <td className='row-data'>
                                    {CompanyName}
                                  </td>
                                  <td className="row-data">
                                    <div style={{ margin: "1px", color: "#d92104" }}>
                                      {/* Edit Button */}
                                      <Button
                                        onClick={() => { showData(index1) }}
                                        icon={EditMajor}
                                      >
                                      </Button>
                                      &nbsp;&nbsp;
                                      {/* Delete Button */}
                                      <Button
                                        onClick={() => deleteData(index1)}
                                        icon={DeleteMajor} monochrome outline
                                      >
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              )
                            })}
                        </tbody>
                        <tfoot>
                          <tr className="tableFoot">
                            <td style={{ textAlign: "center", padding: "16px", color: "red" }} colSpan={6}><b>{deletedmsg ? "Deleted" : ""}</b></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </Card>
                </Layout>
              </Grid.Cell>
            </Grid>
          </div>
        </Page>
      </Container>
    </>
  );
}
export default Home

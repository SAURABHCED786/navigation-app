import { useLocation, useNavigate } from "react-router-dom";
import { Card, Layout, Page, Grid } from '@shopify/polaris';
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react';
import '../App.css';
function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserdata] = useState();
  const [deletedmsg, setDeletedMsg] = useState(false);
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
  function showData(event) {
    let rowId = event.target.parentNode.parentNode.id;
    //this gives id of tr whose button was clicked
    let data = document.getElementById(rowId).querySelectorAll(".row-data");
    /*returns array of all elements with 
    "row-data" class within the row with given id*/
    let id = data[0].innerHTML;
    let username = data[1].innerHTML;
    let email = data[2].innerHTML;
    let phno = data[3].innerHTML;
    let company = data[4].innerHTML;
    navigate("/add", { state: { id: id, username: username, email: email, phno: phno, company: company }, Edit: "Edit" });
  }
  // Delete User Data
  function deleteData(event) {
    let rowId = event.target.parentNode.parentNode.id;
    //this gives id of tr whose button was clicked
    let data = document.getElementById(rowId).querySelectorAll(".row-data");
    let delId = data[0].innerHTML;
    userData.map(usrDelData => {
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
  return (
    <>
      <Page>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 12, xl: 12 }}>
            <Layout>
              <Card>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Company</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData &&
                      userData.map((item, index) => {
                        return (
                          <tr id={index}>
                            <td className='row-data'>
                              {item.id}
                            </td>
                            <td className='row-data'>
                              {item.username}
                            </td>
                            <td className='row-data'>
                              {item.email}
                            </td>
                            <td className='row-data'>
                              {item.phone}
                            </td>
                            <td className='row-data'>
                              {item.company.name}
                            </td>
                            <td>
                              <button className='editBtn btn btn-primary'
                                onClick={(event) => { showData(event) }} style={{ fontSize: "14px" }}>
                                <i className="fa fa-pencil-square" />
                              </button>
                              <button className='delBtn btn btn-danger'
                                onClick={(event) => deleteData(event)}
                                style={{ fontSize: "14px" }}>
                                <i className="fa fa-trash" />
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td style={{ textAlign: "center", padding: "16px", color: "red" }} colSpan={5}><b>{deletedmsg ? "Deleted" : ""}</b></td>
                    </tr>
                  </tfoot>
                </table>
              </Card>
            </Layout>
          </Grid.Cell>
        </Grid>
      </Page>
    </>
  );
}
export default Home

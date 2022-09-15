import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import '../App.css';
function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserdata] = useState();

  useEffect(() => {
    const locData=localStorage.getItem("allUserInfo")
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
  function showData(event) {
    var rowId = event.target.parentNode.parentNode.id;
    //this gives id of tr whose button was clicked
    var data = document.getElementById(rowId).querySelectorAll(".row-data");
    /*returns array of all elements with 
    "row-data" class within the row with given id*/
    let id = data[0].innerHTML;
    let username = data[1].innerHTML;
    let email = data[2].innerHTML;
    let phno = data[3].innerHTML;
    let company = data[4].innerHTML;
    navigate("/add", { state: { id: id, username: username, email: email, phno: phno, company: company } });
  }
  return (
    <>
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
            <td style={{ textAlign: "center", padding: "16px" }} colSpan={5}>Message</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
export default Home

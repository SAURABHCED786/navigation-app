import { Button, Card, Page } from '@shopify/polaris'
import React, { useState } from 'react'

const initial = {
  fname: "Akanksha",
  lname: "Yadav"
}
const arrNames = ['Saurabh', 'Anurag', 'Akanksha', 'Anu']
function About() {
  const [name, setName] = useState(initial)
  const [addNm, setAddNm] = useState(arrNames)
  const changeName = () => {
    const newName = { ...name }
    newName.fname = "Saurabh"
    newName.lname = "Gupta"
    console.log(newName, "Check Name");
    setName(newName)
  }
  const addName = () => {
    const newArrname = [...addNm]
    newArrname.push('Kashif', 'Harsh', 'Shivam')
    setAddNm(newArrname)
  }
  console.log(addNm);

  return (
    <Page title='About Us'>
      <div>
        <Card >
          <Card.Section>
            <Button onClick={changeName}>Change Name With Object</Button>
          </Card.Section>
          <Card.Section>
            {name.fname}&nbsp;{name.lname}
          </Card.Section>
          <Card.Section>
            <Button onClick={addName}>Add Name With Array</Button>
          </Card.Section>
          <Card.Section>
            {addNm.map((name, i) => {
              return <p key={i}>{name}</p>
            })}
          </Card.Section>
        </Card>
      </div>
    </Page>
  )
}

export default About

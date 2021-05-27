import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Loader from "react-loader-spinner";
import { Input, Button, List, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

const GET_TODOS = gql`
  {
    Todos {
      id
      title
    }
  }
`;
const ADD_MUTATION = gql`
  mutation add($title: String!){
    addTodo(title: $title){
      id
    }
  }
`;

const DELETE_MUTATION = gql`

  mutation deleteTodo($id: ID!){
    deleteTodo(id: $id){
      title
    }
  }
`
const IndexPage = () => {
  const [text, setText] = useState('')
  const { error, loading, data } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_MUTATION);
  const [deleteTodo] = useMutation(DELETE_MUTATION);
  console.log(data)

  if (loading) return <center style={{ marginTop: '40vh' }}>
    <Loader
      type="Oval"
      color="black"
      height={100}
      width={100}
      timeout={3000} //3 secs
    />
  </center>

  if (error) return <h2>Error</h2>

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      variables: {
        title: text,
      },
      refetchQueries: [{ query: GET_TODOS }]
    })
  }

  const handleDelete = (el) => {
    console.log(el)
    deleteTodo({
      variables: { id: el },
      refetchQueries: [{ query: GET_TODOS }]
    })

  }

  return (
    <div className='header'>
      <h2 id='heading'>SERVERLESS TODO</h2>
      <div style={{ textAlign: 'center' }}>
        <Input type='text' focus placeholder='Add Todo'
          onChange={(e) => setText(e.target.value)} />
          &nbsp;&nbsp;&nbsp;
        <Button onClick={handleSubmit}>
          +
      </Button>
      </div>
      <br /><br />
      {data.Todos.map((el, ind) => {

        return (
          <Segment className='lists' inverted style={{ width: '50%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
            <List inverted >
              <List.Item key={ind}>
                <List.Content>
                  <List.Header>{el.title}</List.Header>
                  <Button style={{ float: 'right' }} onClick={() => handleDelete(el.id)}>x</Button>
                </List.Content>
              </List.Item>
            </List>
          </Segment>
        )
      })}
    </div>
  );
};

export default IndexPage;






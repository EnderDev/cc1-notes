import React from 'react'
import Head from 'next/head'
import { StyledApp } from '../components/app.style';
import { Flex, Text, IconButton, theme, Stack, Input, Box, Image } from '@chakra-ui/core';
import { Style } from "react-style-tag";
import { ThemeProvider } from '@chakra-ui/core';

const Theme = ({ children }) => (
  <ThemeProvider theme={theme} style={{ backgroundColor: '#0d0d0d' }}>
      {children}
  </ThemeProvider>
)

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      notes: []
    }
  }

  addNote = (event) => {
    if(event.keyCode == 13) {
      this.setState(previousState => ({
        notes: [...previousState.notes, this.ref.current.value]
      }), () => {
        this.ref.current.value = '';
      })
    }
  }

  render() {
    return (
      <Theme>
        <Head>
          <title>Notely</title>
          <link rel="icon" type="image/png" href="static/favicon.png"></link>
        </Head>
  
        <StyledApp id="app">
          <Flex 
                px="4"
                py="4"
                justify="space-between"
                marginLeft="auto"
                marginRight="auto"
                style={{ borderBottom: '1px solid #dfdfdf' }}
            >
                <Text 
                    as="div"
                    fontSize="xl" 
                    fontWeight="bold" 
                    marginLeft="auto"
                    marginRight="auto"
                >
                    <Image src={'/static/favicon.png'} />
                    <span style={{ display: 'block', textAlign: 'center', fontWeight: '100', fontSize: '26px' }}>Notely</span>
                </Text>

          </Flex>
  
          <Stack spacing={5}>
            <Input ref={this.ref} placeholder="What's on your mind?"  onKeyUp={this.addNote} border="1px solid lightgray !important" />
            <Note identif={`note--1`}>👋 Welcome to Notely! Enter your message 👆 up here and then hit enter.<br />Over here you can delete your note and edit your note to something else. 👉</Note>
            {this.state.notes.map((i, index) => { return <Note key={index} identif={`note-${index}`}>{i}</Note> })}
          </Stack>
        </StyledApp>
  
        <Style>{`
              body {
                margin: 0;
                padding: 0;
              }
              
              * {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              }`}</Style>
      </Theme>
    )
  }
}

const Note = ({ children, identif }) => {

  const [editing, setEditing] = React.useState(false);

  const deleteNode = (id) => {
    document.getElementById(id).style.opacity = 0;
    document.getElementById(id + '-text').style.textDecoration = 'line-through';
    setTimeout(() => {
      if(document.getElementById(id)) {
        document.getElementById(id).outerHTML = '';
      }
    }, 600);
  }

  const editNode = (id) => {
    if(editing == false) {
      document.getElementById(id + '-text').setAttribute('contenteditable', true);
      document.getElementById(id + '-text').focus()
      setEditing(true);
    } else {
      document.getElementById(id + '-text').setAttribute('contenteditable', false);
      document.getElementById(id + '-text').blur()
      setEditing(false);
    }
  }

  return (
    <Box border="1px solid lightgray" w="100%" marginBottom="1.25rem" p={4} color="black" borderRadius="0.251rem" transition="0.6s all 0.2s" id={identif}>
      <Flex align="center">
        <Flex align="flex-end" className='note'>
          <Text transition="0.2s all" margin="8px" id={identif + '-text'} style={{ border: 'none', outline: 'none' }} contenteditable="false">{children}</Text>
        </Flex>
      </Flex>
      <Flex align="center" display="block">
        <Box float="right">
            <IconButton variantColor="red" aria-label="Delete note" icon="delete" isRound={true} border="none" marginRight="6px" onClick={() => deleteNode(identif)} />
            <IconButton variantColor="blue" aria-label="Edit note" icon={editing == false ? 'edit' : 'check'} isRound={true} border="none" onClick={() => editNode(identif)} />
        </Box>
      </Flex>
    </Box>
)}


export default Home
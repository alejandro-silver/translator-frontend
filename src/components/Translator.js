import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Loader from "react-loader-spinner";
import axios from 'axios';

const Header = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState("es")
  const [sourceText, setSourceText] = useState("")
  const [resultText, setResultText] = useState("")

  const handleLanguage= (event) => {
    setLanguage(event.target.value)
    console.log(language)
  }

  const handleSourceText = (event) => {
    setSourceText(event.target.value)
  }

  const handleResultText = (event) => {
    setResultText(event.target.value)
  }

  const handleTranslate = () => {
    setIsLoading(true)
    const requestData = {
      params: {
        text: sourceText,
        target: language
      }
    }
    const header = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Content-Type': 'application/json',
      },
    }
    axios.post("http://127.0.0.1:5000/api/translate", header, requestData)
      .then(response => {
        setIsLoading(false)
        setResultText(response.data)
      })
  }

  return (
    <Container fluid className='translator'>
      <Row className='translator-section'>
        <Col>
          {isLoading &&
            <div className="spinner">
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
              />
            </div>
          }
          <select 
            value={language} 
            onChange={handleLanguage} 
            className="browser-default custom-select"
          >
            <option value="es">English to Spanish</option>
            <option value="en">Spanish to English</option>
          </select>

          <textarea 
            value={sourceText} 
            onChange={handleSourceText}
          />

          <button
            className="translator-section-translate btn btn-primary"
            onClick={handleTranslate}
          >
            Translate
          </button>

          <textarea 
            value={resultText} 
            onChange={handleResultText}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;

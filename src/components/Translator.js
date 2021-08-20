import React, { useState, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Loader from "react-loader-spinner";
import Tooltip from './Tooltip';
import axios from 'axios';

const Header = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState("es")
  const [sourceText, setSourceText] = useState("")
  const [resultText, setResultText] = useState("")
  const [tooltipText, setTooltipText] = useState("asdf")
  const [showTooltip, setShowTooltip] = useState(false)
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)

  const getSelectedText = useCallback(() => {
    if (window.getSelection) {
      return window.getSelection().toString();
    } 
    else if (window.document.getSelection) {
      return window.document.getSelection().toString();
    } else if (window.document.selection) {
      return window.document.selection.createRange().text;
    } else {
      return ''
    }  
  }, [])

  const sendTranslateRequest = useCallback((text, setText, setShowTooltip) => {
    const requestData = {
      params: {
        text: text,
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
        if(response.data !== '') {
          setText(response.data)
          if (setShowTooltip) {
            setShowTooltip(true)
          }
        }
        // return response.data
      })
  }, [language])

  const handleSelectedText = useCallback(() => {
    const selectedText = getSelectedText()
    if (selectedText !== '') {
      sendTranslateRequest(selectedText, setTooltipText, setShowTooltip)
    } else {
      setShowTooltip(false)
    }
    const e = window.event;
    setPositionX(e.clientX)
    setPositionY(e.clientY)
  }, 
  [
    sendTranslateRequest,
    getSelectedText,
    setShowTooltip,
    setPositionX,
    setPositionY
  ])

  const handleLanguageChange= useCallback((event) => {
    setLanguage(event.target.value)
  }, [setLanguage])
  
  const handleSourceTextChange = useCallback((event) => {
    setSourceText(event.target.value)
    const sendText = event.target.value
    sendTranslateRequest(sendText, setResultText)
  },[sendTranslateRequest, setSourceText, setResultText])

  return (
    <Container fluid className='translator'>
      {showTooltip && (
          <Tooltip 
            data={'tooltipText'}
            style={{top: `${positionY}px`, left: `${positionX}px`}}
          />
      )}
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
            onChange={handleLanguageChange} 
            className="browser-default custom-select"
          >
            <option value="es">English to Spanish</option>
            <option value="en">Spanish to English</option>
          </select>

          <Row>
            <Col md={6} xs={12}>
              <textarea 
                value={sourceText} 
                onChange={handleSourceTextChange}
                onMouseUp={handleSelectedText}
              />
            </Col>
            <Col md={6} xs={12}>
              <textarea
                value={resultText} 
                className='translator-section__result'
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;

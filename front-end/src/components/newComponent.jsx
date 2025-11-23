import React from "react";

export default Radio;

import React from "react";
import styled from "styled-components";

const Button = () => {
  return (
    <StyledWrapper>
      <div className="paste-button">
        <button className="button">Paste &nbsp; ▼</button>
        <div className="dropdown-content">
          <a id="top" href="#">
            Keep source formatting
          </a>
          <a id="middle" href="#">
            Merge formatting
          </a>
          <a id="bottom" href="#">
            Keep text only
          </a>
        </div>
      </div>
    </StyledWrapper>
  );
};

export const StyledWrapper = styled.div`
  .paste-button {
    position: relative;
    display: block;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .button {
    background-color: #4caf50;
    color: #212121;
    padding: 10px 15px;
    font-size: 15px;
    font-weight: bold;
    border: 2px solid transparent;
    border-radius: 15px;
    cursor: pointer;
  }

  .dropdown-content {
    display: none;
    font-size: 13px;
    position: absolute;
    z-index: 1;
    min-width: 200px;
    background-color: #212121;
    border: 2px solid #4caf50;
    border-radius: 0px 15px 15px 15px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  }

  .dropdown-content a {
    color: #4caf50;
    padding: 8px 10px;
    text-decoration: none;
    display: block;
    transition: 0.1s;
  }

  .dropdown-content a:hover {
    background-color: #4caf50;
    color: #212121;
  }

  .dropdown-content a:focus {
    background-color: #212121;
    color: #4caf50;
  }

  .dropdown-content #top:hover {
    border-radius: 0px 13px 0px 0px;
  }

  .dropdown-content #bottom:hover {
    border-radius: 0px 0px 13px 13px;
  }

  .paste-button:hover button {
    border-radius: 15px 15px 0px 0px;
  }

  .paste-button:hover .dropdown-content {
    display: block;
  }
`;


import React from 'react';
import styled from 'styled-components';

const Radio = () => {
  return (
    <StyledWrapper>
      <div className="select">
        <div className="selected" data-default="All" data-one="option-1" data-two="option-2" data-three="option-3">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="arrow">
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </div>
        <div className="options">
          <div title="all">
            <input id="all" name="option" type="radio" defaultChecked />
            <label className="option" htmlFor="all" data-txt="All" />
          </div>
          <div title="option-1">
            <input id="option-1" name="option" type="radio" />
            <label className="option" htmlFor="option-1" data-txt="option-1" />
          </div>
          <div title="option-2">
            <input id="option-2" name="option" type="radio" />
            <label className="option" htmlFor="option-2" data-txt="option-2" />
          </div>
          <div title="option-3">
            <input id="option-3" name="option" type="radio" />
            <label className="option" htmlFor="option-3" data-txt="option-3" />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .select {
    width: fit-content;
    cursor: pointer;
    position: relative;
    transition: 300ms;
    color: white;
    overflow: hidden;
  }

  .selected {
    background-color: #2a2f3b;
    padding: 5px;
    margin-bottom: 3px;
    border-radius: 5px;
    position: relative;
    z-index: 100000;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .arrow {
    position: relative;
    right: 0px;
    height: 10px;
    transform: rotate(-90deg);
    width: 25px;
    fill: white;
    z-index: 100000;
    transition: 300ms;
  }

  .options {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 5px;
    background-color: #2a2f3b;
    position: relative;
    top: -100px;
    opacity: 0;
    transition: 300ms;
  }

  .select:hover > .options {
    opacity: 1;
    top: 0;
  }

  .select:hover > .selected .arrow {
    transform: rotate(0deg);
  }

  .option {
    border-radius: 5px;
    padding: 5px;
    transition: 300ms;
    background-color: #2a2f3b;
    width: 150px;
    font-size: 15px;
  }
  .option:hover {
    background-color: #323741;
  }

  .options input[type="radio"] {
    display: none;
  }

  .options label {
    display: inline-block;
  }
  .options label::before {
    content: attr(data-txt);
  }

  .options input[type="radio"]:checked + label {
    display: none;
  }

  .options input[type="radio"]#all:checked + label {
    display: none;
  }

  .select:has(.options input[type="radio"]#all:checked) .selected::before {
    content: attr(data-default);
  }
  .select:has(.options input[type="radio"]#option-1:checked) .selected::before {
    content: attr(data-one);
  }
  .select:has(.options input[type="radio"]#option-2:checked) .selected::before {
    content: attr(data-two);
  }
  .select:has(.options input[type="radio"]#option-3:checked) .selected::before {
    content: attr(data-three);
  }`;

export default Radio;

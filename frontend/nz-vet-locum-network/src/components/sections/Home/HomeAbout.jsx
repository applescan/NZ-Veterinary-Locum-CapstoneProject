import React from "react";
import styled from "styled-components";
import AboutImg from '../../../images/about.jpg'
import ButtonBlue from '../../elements/ButtonBlue'
import { useNavigate } from 'react-router-dom'

export default function About() {

    const navigate = useNavigate()

    return (
        <>
            <Wrapper id="Home-about" className="container flexSpaceCenter">
                <LeftSide className="flexCenter">
                    <div>
                        <h3>NZ Veterinary Locum Network is a collective organization for locums and clinics to find each other in a single platform.</h3>
                        <br></br>
                        <ButtonBlue onClick={() => { navigate(`/about`) }} name="Learn More"></ButtonBlue>
                    </div>
                </LeftSide>


                <RightSide>
                    <img src={AboutImg} className='img-fluid rounded' alt='vet with a dog smiling' />

                </RightSide>
            </Wrapper>

        </>
    );
}


const Wrapper = styled.section`
  padding: 50px 3%;
  width: 100%;
  display: flex;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  padding-top: 150px;
  padding-right:50px;
  
  @media (max-width: 960px) {
    order: 2;
    width: 100%;
    padding: 50px 0;
    text-align: left;
  }
  @media (max-width: 860px) {
    order: 2;
    width: 100%;
    padding: 20px 50px;
    text-align: left;
  }
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  text-align: center;
  padding: 5%;

  @media (max-width: 960px) {
    width: 100%;
    padding: 0 50px;
    text-align: left;
  }
`;

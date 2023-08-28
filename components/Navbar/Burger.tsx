'use client'
import React, {useState} from 'react';
import styled from "styled-components";

interface BarProps {
    isClick: number;
}

const Bar = styled.div<BarProps>`
  height: 2px;
  background-color: black;
  transition: all 300ms ease-in-out;

  &:first-child {
    width: 24px;
    transform: ${({isClick}) => (isClick % 2 ? "rotate(45deg) translateY(400%)" : "rotate(0deg)")};
  }

  &:last-child {
    width: ${({isClick}) => (isClick % 2 ? "24px" : "16px")};
    transform: ${({isClick}) => (isClick % 2 ? " rotate(-45deg) translateY(-350%)" : "rotate(0deg)")};
  }
`;

const Burger = (props:any) => {


    return (
        <div className={`flex items-center space`} onClick={props.onClick
        }>
            <div className={'h-[50px] w-[50px] relative '}>
                <div className={'flex flex-col space-y-2  absolute transform -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2'}>
                    <Bar isClick={props.clickCounter}/>
                    <Bar isClick={props.clickCounter}/>
                </div>
            </div>
        </div>
    );
};

export default Burger;
'use client'
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useIsLargeScreen} from '../Hooks/useMediaQuery'
import Div100vh from "react-div-100vh";
import Burger from "./Burger";
import {logout} from "@/lib/api";
import DropdownComponent from "@/components/UI/DropdownComponent";
import {useRouter} from "next/navigation";

const Navbar = (props: any) => {


    const [isScrolled, setIsScrolled] = useState(false)

    const [clickCounter, setIsClickCounter] = useState(0);
    const handleClick = () => {
        setIsClickCounter(clickCounter + 1);
    }

    useEffect(() => {
        clickCounter % 2 ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible";
    }, [clickCounter])

    const router = useRouter();

    const handleDisconnect = async () => {
        try {
            await logout()
            router.replace("/signin")
        } catch (e) {
            console.log(e)
        }
    }

    const isLargeScreen = useIsLargeScreen()


    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav
            className={`fixed z-[1] w-screen lg:py-6 py-4  top-0 transform translate-x-1/2 -left-1/2 ${
                isScrolled ? 'bg-white' : ''
            } duration-500`}
        >
            <div className={'flex max-w-[1170px] px-4 mx-auto justify-between'}>
                <div>
                    <Link href="/home" className={``}>
                        <Image
                            src={'/assets/icons/logo-athletid.svg'}
                            width={isLargeScreen ? 110 : 120}
                            height={isLargeScreen ? 38 : 120}
                            alt=""
                            sizes={"10vw"}
                        />
                    </Link>
                </div>

                <div className={'lg:flex hidden justify-end items-center w-full space-x-[60px]'}>
                    <Link href="/">Home</Link>
                    <Link href="/posts">Posts</Link>
                    <Link href="/categories">Categories</Link>
                    <Link href="/workouts">Workouts</Link>
                    <Link href="/workoutCategories">Workout Categories</Link>
                    <DropdownComponent user={props.user}/>
                </div>

                <Div100vh
                    className={
                        clickCounter % 2
                            ? 'fixed bg-white duration-[1300ms] w-screen top-0 left-0 bottom-0 overflow-hidden z-[400]'
                            : 'bg-white invisible opacity-0 duration-[300ms] absolute w-screen top-0 left-0 bottom-0 overflow-visible'
                    }
                >
                    <div
                        className={
                            clickCounter % 2
                                ? 'transform absolute -translate-y-1/2 !top-1/2 flex lg:space-x-40 w-full'
                                : 'hidden'
                        }
                    >
                        <ul
                            className={
                                'text-left space-y-4 mx-auto'
                            }
                        >
                            <li
                                className={'text-[20px] lg:text-[14px]  font-bold lg:!-mb-4'}
                            >
                                Menu
                            </li>
                            <li className={'text-[38px] opacity-60'}>
                                <Link href="/home">Home</Link>
                            </li>
                            <li className={'text-[38px] opacity-60'}>
                                <Link href="/posts">Posts</Link>
                            </li>
                            <li className={'text-[38px] opacity-60'}>
                                <Link href="/categories">Categories</Link>
                            </li>
                            <li className={'text-[38px] opacity-60'}>
                                <Link href="/workouts">Workouts</Link>
                            </li>
                            <li className={'text-[38px] opacity-60'}>
                                <Link href="/workoutCategories">Workout Categories</Link>
                            </li>

                            <li className={'text-[38px] opacity-60'}>
                                <div onClick={() => {
                                    handleDisconnect()
                                }}>Disconnect
                                </div>
                            </li>
                        </ul>
                    </div>
                </Div100vh>
                <div className={'z-[900] w-[2rem] lg:hidden'}>
                    <Burger clickCounter={clickCounter} click onClick={() => {
                        handleClick()
                    }}/>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
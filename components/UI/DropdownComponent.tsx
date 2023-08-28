import {Menu, Transition} from '@headlessui/react'
import {Fragment} from 'react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import {UserIcon, XCircleIcon} from '@heroicons/react/24/outline'
import Image from "next/image";
import Link from "next/link";



export default function DropdownComponent(props:any) {

    const user = props.user;

    return (
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button
                        className={"w-fit !text-base flex items-center z-[900]"}>
                        <div className={'relative w-[35px] h-[35px] rounded-full overflow-hidden'}>
                            <Image alt={""} sizes={"20vw"} fill className={'object-cover'}
                                   src={user.img ? user.img : "/assets/images/avatar.png"}/>
                        </div>
                        <ChevronDownIcon
                            className="ml-2 -mr-1 h-5 w-5 text-timeRed hover:text-timeRed"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({active}) => (
                                    <Link
                                        className={`${
                                            active ? 'bg-timeRed text-white' : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        href={`/profile/edit/${user.id}`}
                                    >
                                        {active ? (
                                            <UserIcon
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <UserIcon
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        )}
                                        Profile
                                    </Link>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({active}) => (
                                    <Link href={"/api/authentification/logout"}>
                                        <button
                                            className={`${
                                                active ? 'bg-timeRed text-white' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            {active ? (
                                                <XCircleIcon
                                                    className="mr-2 h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <XCircleIcon
                                                    className="mr-2 h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            )}
                                            Disconnect
                                        </button>
                                    </Link>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
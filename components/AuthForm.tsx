'use client'
import React, {useCallback, useState} from 'react';
import {signin} from "@/lib/api";
import Card from "@/components/UI/Card"
import Input from "@/components/UI/Input"
import Button from "@/components/UI/Button"

const signinContent = {
    linkUrl: "/register",
    linkText: "Don't have an account?",
    header: "Welcome Back",
    subheader: "Enter your credentials to access your account",
    buttonText: "Sign In",
};

const initial = {email: "", password: "", firstName: "", lastName: ""};


const AuthForm = (props: any) => {
    const [formState, setFormState] = useState({...initial})


    const handleSubmit = useCallback(async (e: any) => {
        e.preventDefault()

        try {
            await signin(formState);
        } catch (e) {
            console.log(e)
        } finally {
            setFormState({...initial})
            props.router.push('/home');
        }
    }, [
        formState.email,
        formState.password,
        formState.firstName,
        formState.lastName,
    ])


    const content = signinContent;

    return (
        <Card>
            <div className="w-full">
                <div className="text-center">
                    <h2 className="text-3xl mb-2">{content.header}</h2>
                    <p className="tex-lg text-black/25">{content.subheader}</p>
                </div>
                <form onSubmit={handleSubmit} className="py-10 w-full">
                    <div className="mb-8">
                        <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
                        <Input
                            required
                            type="email"
                            placeholder="Email"
                            value={formState.email}
                            className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormState((s) => ({...s, email: e.target.value}))
                            }
                        />
                    </div>
                    <div className="mb-8">
                        <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
                        <Input
                            required
                            value={formState.password}
                            type="password"
                            placeholder="Password"
                            className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormState((s) => ({...s, password: e.target.value}))
                            }
                        />
                    </div>
                    <div className={'flex justify-center'}>
                        <Button type="submit" intent="secondary">
                            {content.buttonText}
                        </Button>
                    </div>

                </form>
            </div>
        </Card>
    );
};

export default AuthForm;
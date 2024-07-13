"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { toast } from "react-toastify"
import { useEffect } from "react"

import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";


const Login=()=>{
    const router= useRouter();
    const {data:session , status:sessionStatus}=useSession

    useEffect(() => {
        if (sessionStatus === "authenticated") {
          router.push('/dashboard');
        }
      }, [sessionStatus, router]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
    
        if (!email || !password) {
          toast.error("Please fill all the input fields.");
        }
    
        const res = await signIn("credientals", {
          redirect: false,
          email,
          password,
        });
    
        if (res?.error) {
          if (res?.url) {
            router.replace("/dashboard");
          }
          toast.error("Invalid Credientals");
        } else {
          toast.success("Successfully Logged In.");
          router.push("/dashboard")
        }
      };
    
      if (sessionStatus === "loading") {
        return <h1>Loading ...</h1>;
      }
    

    return(
        sessionStatus!=="authenticated" && (
            <div className="h-screen  bg-gray-900">
            <div className='flex justify-center items-center '>
            <Card color="transparent" shadow={false} className='mt-[100px]  pt-4 pl-8 pr-8 pb-4  bg-gray-100 sx:mt-[140px] sx:flex sx:justify-center sx:items-center sx:pt-4 sx:pl-2 sx:pr-2 sx:pb-4'>
              <Typography variant="h4" color="blue-gray" className='sx:mr-[200px]'>
                Login
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to Login.
              </Typography>
              <form onSubmit={handleSubmit}  className="mt-8 mb-2 w-60 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-3 ">
                  <Typography variant="h6" color="blue-gray" className="-mb-3 text-[14px]">
                    Your Email
                  </Typography>
                  <Input
                  type="email"
                  id='email'
                    name="email"
                    size="lg"
                    placeholder="name@mail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3 text-[14px]">
                    Password
                  </Typography>
                  <Input
                  id='password'
                    name="password"
                    type="password"
                    size="lg"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <Button type='submit' className="mt-6 bg-gray-800 hover:bg-black text-none" fullWidth >
                  Login
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                  Don't have an account?{" "}
                  <Link href="/Register" className="font-medium text-gray-900">
                    Register
                  </Link>
                </Typography>
              </form>
            </Card>
            </div>
            </div>

        )

    )
}

export default Login;
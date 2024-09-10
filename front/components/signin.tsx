'use client'

import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useState } from "react"
import request from "@/app/utils/request"
import { settings } from "@/app/utils/settings"
import { isAxiosError } from "axios"
import toast from "react-hot-toast"

const Signin = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");

    async function handleSignin(username: string, email: string, password: string, firstName: string) {
      const body = {
        username: username,
        email: email,
        password: password,
        firstName: firstName
      }
      try {
        const response = await request.post('/user/register', body, settings);
        if(response.status === 201) {
          toast.success(response.data.message);
        }
      } catch (error: unknown) {
        if(isAxiosError(error)) {
          const { data } = error.response || {};
          const errorMessage = data?.message ?? "Erro ao realizar signin!";
          toast.error(errorMessage);
        } else {
          toast.error("Erro ao realizar signin!");
        }
      }
    };

    return (
        <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Sign in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create your account</DialogTitle>
          <DialogDescription>
            Insert your credentials below to create your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
                First name
            </Label>
            <Input id="name" type="text" onChange={(e) => setFirstName(e.target.value)} className="col-span-3" />
            <Label htmlFor="name" className="text-right">
                Email
            </Label>
            <Input id="name" type="text" onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
            <Label htmlFor="name" className="text-right">
                Username
            </Label>
            <Input id="name" type="text" onChange={(e) => setUsername(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Password
            </Label>
            <Input id="username" type="password" onChange={(e) => setPassword(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => {handleSignin(username,email,password,firstName)}}>Create account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    );
}

export default Signin;
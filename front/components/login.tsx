"use client"
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { Button } from "../components/ui/button";
import { Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";
import request from "@/app/utils/request";
import { settings } from "@/app/utils/settings";
import { useRouter } from "next/navigation";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  async function handleLogin(username: string, password: string) {
    const body = {
      username: username,
      password: password
    }
    const response = await request.post('/auth/login', body, settings);
    if(response.status === 200) {
      const { email, firstName, accessToken }  = response.data.user;
      setUser({ email, first_name: firstName, access: accessToken });
      router.push("/home");
    } else {
      console.log("Erro ao realizar login!");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Log in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login into your account</DialogTitle>
          <DialogDescription>
            Insert your credentials below to access your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Username
            </Label>
            <Input type="username" onChange={(e) => { setUsername(e.target.value) }} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Password
            </Label>
            <Input type={"password"} onChange={(e) => { setPassword(e.target.value) }} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => handleLogin(username, password)}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
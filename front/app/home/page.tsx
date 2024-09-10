'use client'
import Link from "next/link"
import {
  CircleCheckBig,
  CircleUser,
  PlusCircle,
  LineChart,
  Menu,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useContext } from "react";
import { Progress } from "@nextui-org/progress";
import { UserContext } from "@/contexts/UserContext";
import Logo from "@/app/assets/hivee-white.png"
import Image from "next/image"
import { useRouter } from "next/navigation"
import request from "../utils/request"
import { settings } from "../utils/settings"
import toast from "react-hot-toast"

export default function MainMenu() {
    const { user, loading } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if(!loading && !user.access) {
            router.push("/");
        }
    },[user.access, loading, router]);

    if(loading || !user.access) {
        return <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
      />;
    }

    async function handleLogout() {
      try {
        const response = await request.get('/auth/logout', settings);
        if(response.status === 200) {
          router.push("/");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while logging out");
      }
    }

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Image src={Logo} alt="Hivee" width={100} height={30} />
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                >
                  <CircleCheckBig className="h-4 w-4" />
                  Tasks{" "}
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Image src={Logo} alt="Hivee" width={100} height={30} />
                  </Link>
                  <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <CircleCheckBig className="h-5 w-5" />
                    Tasks
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {handleLogout()}}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Goals</h1>
            </div>
            <div
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  You have no tasks
                </h3>
                <p className="text-sm text-muted-foreground">
                  Create a new task to get started
                </p>
                <Button className="mt-4 gap-2">
                <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add task
                  </span>
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
}

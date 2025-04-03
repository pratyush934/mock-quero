import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  BadgeAlert,
  ChevronDown,
  FileUser,
  InspectionPanel,
  LayoutDashboard,
  TvMinimalPlay,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = async () => {
  await checkUser();

  return (
    <header className="bg-black shadow-md  top-0  w-full px-6 py-3 fixed z-50">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo-image"
            height={40}
            width={200}
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Navigation & Auth Controls */}
        <div className="flex items-center gap-6">
          <SignedIn>
            {/* Dashboard Button */}
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:flex items-center gap-2"
              >
                <LayoutDashboard className="h-5 w-5" />
                Industry Insights
              </Button>
            </Link>

            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                  <BadgeAlert className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Growth Tools with AI</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 w-56 bg-black shadow-lg rounded-lg border border-gray-200">
                <DropdownMenuItem>
                  <Link
                    href="/resume"
                    className="flex items-center gap-3 py-2 px-4 hover:bg-black-100 rounded-md w-full"
                  >
                    <FileUser className="h-5 w-5" />
                    <span>Make Resume</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/mock"
                    className="flex items-center gap-3 py-2 px-4 hover:bg-black-100 rounded-md w-full"
                  >
                    <InspectionPanel className="h-5 w-5" />
                    <span>Mock Interview</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/interview"
                    className="flex items-center gap-3 py-2 px-4 hover:bg-black-100 rounded-md w-full"
                  >
                    <TvMinimalPlay className="h-5 w-5" />
                    <span>Interview Prep</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="default" className="px-6 py-2">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;

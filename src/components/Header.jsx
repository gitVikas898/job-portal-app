import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Header = () => {
  return (
    <>
      <nav className="p-4 flex items-center justify-between">
        <Link>
          <img src="/logo.png" alt="" className="h-20" />
        </Link>

        {/*<Button variant="outline">Login</Button>*/}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </nav>
    </>
  );
};

export default Header;

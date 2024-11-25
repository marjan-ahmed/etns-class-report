"use client"
import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '@/app/config/firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import SideNav from './SideNav';

const GoogleProfilePicture: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  // Handle sign out
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };

  // Track auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, []);

  return (
    <div className='relative'>
      {/* Desktop view */}
      <div className='hidden md:flex justify-end px-5 py-5'>
        {!user ? (
          <Button onClick={handleGoogleLogin}>Sign In</Button>
        ) : (
          <div className='flex items-center gap-5'>
            <Button onClick={handleSignOut}>Sign Out</Button>
            <Image
              src={user.photoURL}
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
        )}
      </div>

      {/* Mobile view */}
      <div className='flex md:hidden justify-end px-5 py-5'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Menu /> {/* The menu icon button */}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-5"> {/* Sheet content for navigation and buttons */}
            <div className='flex flex-col items-start'>
              {!user ? (
                <div className='py-5'>
                  <Button onClick={handleGoogleLogin}>Sign In</Button>
                </div>
              ) : (
                <div className='flex flex-col gap-5 py-5 items-start'>
                  <Button onClick={handleSignOut}>Sign Out</Button>
                  <Image
                    src={user.photoURL}
                    alt="Profile"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
              )}
              <SideNav /> {/* Side navigation inside SheetContent */}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <hr />
    </div>
  
  );
};

export default GoogleProfilePicture;


































// "use client"
// import React from 'react'
// import Image from 'next/image';
// import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';

// function Header() {
//   return (
//     <div className='p-4 shadow-sm border flex justify-between'>
//       <div>

//       </div>
//       {/* <div>
//         <Image className='rounded-full'
//         src={pictureSrc}
//         alt="user"
//         width={35}
//         height={35} />
//       </div> */}
//     </div>
//   )
// }

// export default Header
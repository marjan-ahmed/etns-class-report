"use client";
import Head from 'next/head';
import SignInForm from "@/app/_components/SignInForm";
import SignUpForm from "@/app/_components/Registration";
import { useRouter } from "next/navigation";
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { useEffect, useState } from "react";
import { ThemeProvider } from '@/app/theme-provider';
import { useTheme } from 'next-themes';


export default function Home() { 
    const [isSignIn, setIsSignIn] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const toggleForm = () => {
        setIsSignIn((prev) => !prev);
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(); // Ensure you have initialized Firebase elsewhere
        try {
            await signInWithPopup(auth, provider);
            router.push("/dashboard");
        } catch (error) {
            if (error) {
                console.error("Error signing in with Google: ", error);
            } else {
                console.error("Unexpected error: ", error);
            }
        }
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
        <div className="flex flex-col md:flex-row h-screen">
        <div className="flex-1 relative">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="https://video.wixstatic.com/video/e23836_8668b1ec39574ac282c93a5eeea7d18f/720p/mp4/file.mp4"
            autoPlay
            muted 
            loop
            playsInline
          />
        </div>
            
            <div className="flex-1 flex flex-col items-center justify-center bg-white p-4">
                <h1 className="capitalize text-3xl mb-6 font-[raleway] font-extrabold">Welcome to Online Nasra School</h1>
                <div>
                    {isSignIn ? (
                        <SignInForm onGoogleSignIn={handleGoogleSignIn} onSwitch={toggleForm} />
                    ) : (
                        <SignUpForm onSwitch={toggleForm} onGoogleSignUp={handleGoogleSignIn} />
                    )}
                </div>
            </div>
        </div>
        </>
    );
};
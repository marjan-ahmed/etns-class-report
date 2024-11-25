"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50)
})

interface SignInProps {
  onSwitch: () => void;
  onGoogleSignIn: () => void;
}

const SignInForm: React.FC<SignInProps> = ({ onSwitch, onGoogleSignIn }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: ""
        },
      })

       // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  } 
  

    return(
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl ">Sign In</CardTitle>
          <CardDescription>
            Enter your information to sign in
          </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                 <FormItem>
                    <FormLabel>Email</FormLabel>
                 <FormControl>
                    <Input placeholder="me@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
            </FormItem>
          )}
        />
                </div>
                <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                 <FormItem>
                    <FormLabel>Password</FormLabel>
                 <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
                  )} />
                </div>

                <Button type="submit" className="w-full">
                Sign In
              </Button>
              <Button variant="outline" onClick={onGoogleSignIn} className="w-full">
              Sign in with Google
              </Button>
              </div>
          
              </form>
              </Form>
            </div>
            <div className="mt-4 text-sm text-center">
              Don't have an account{" "}
              <Link href="#" onClick={onSwitch} className="underline">
              Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
    )
}


export default SignInForm
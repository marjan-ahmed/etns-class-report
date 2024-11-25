"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth } from "../config/firebase"; // Adjust the path as needed
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react"; // Import useState for managing error messages

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(50),
});

interface SignUpProps {
  onSwitch: () => void;
  onGoogleSignUp: () => void;
}

const SignUpForm: React.FC<SignUpProps> = ({ onSwitch, onGoogleSignUp }) => {
  const [error, setError] = useState<string | null>(null); // State to manage error messages
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  // Submit handler for the form
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      // Optionally redirect or update the UI upon successful sign-up
      console.log("User signed up successfully:", values);
    } catch (err: any) {
      setError(err.message); // Set error message if sign-up fails
    }
  }

  return (
    <Card className="mx-auto max-w-sm shadow">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

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
                        <Input type="password" placeholder="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Create an account
                </Button>
                <Button variant="outline" onClick={onGoogleSignUp} className="w-full">
                Sign up with Google
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="mt-4 text-sm text-center">
          Already have an account{" "}
          <Link href="#" onClick={onSwitch} className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
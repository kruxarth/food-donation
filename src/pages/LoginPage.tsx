// src/pages/LoginPage.tsx

import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, } from "lucide-react";
import { FaGoogle, FaFacebook } from "react-icons/fa";


/**
 * @component LoginPage
 * @description The main authentication page for the application.
 * It features a split-screen layout with branding and a tabbed interface
 * for switching between Login and Sign Up forms.
 * @returns {JSX.Element} The rendered LoginPage component.
 */
const LoginPage = () => {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="hidden bg-emerald-50 lg:flex flex-col items-center justify-center p-10 text-center">
         <div className="max-w-md space-y-4">
            <a href="/" className="inline-block">
                <Leaf className="h-16 w-16 text-emerald-600" />
            </a>
            <h1 className="text-4xl font-bold text-gray-800">
                Join our Community of Food Rescuers
            </h1>
            <p className="text-lg text-gray-600">
                Help us reduce food waste and fight hunger in your community.
                Every donation makes a difference.
            </p>
         </div>
      </div>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="w-full max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <LoginForm />
                  <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                      </div>
                  </div>
                   <div className="grid grid-cols-2 gap-4">
                       <Button variant="outline"><FaGoogle className="mr-2 h-4 w-4" /> Google</Button>
                       <Button variant="outline"><FaFacebook className="mr-2 h-4 w-4" /> Facebook</Button>
                   </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Create an Account</CardTitle>
                  <CardDescription>
                    Join us today! Enter your details to get started.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SignupForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
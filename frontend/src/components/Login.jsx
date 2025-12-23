import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Eye, EyeOff, Boxes } from "lucide-react";

// The UI Kit we just built
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PublicHeader from "./PublicHeader";

// Validation Schema (Same as JPortal)
const formSchema = z.object({
  enrollmentNumber: z.string().min(1, "Enrollment number is required"),
  password: z.string().min(1, "Password is required"),
});

export default function Login({ onLoginSuccess, w }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { enrollmentNumber: "", password: "" },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      await w.student_login(values.enrollmentNumber, values.password);
      localStorage.setItem("username", values.enrollmentNumber);
      onLoginSuccess();
    } catch (error) {
      // Gentle error handling
      form.setError("root", { 
        message: "Invalid credentials. Try '123456' & 'password'" 
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
      
      {/* 1. JPortal-style Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-in fade-in duration-1000" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-in fade-in duration-1000 delay-300" />

      {/* 2. Header */}
      <div className="absolute top-0 w-full z-50">
        <PublicHeader showStatsButton={true} />
      </div>

      {/* 3. The Login Card */}
      <Card className="w-full max-w-md relative z-10 border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-700">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Boxes className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">JIITMart Portal</span>
          </div>
          <CardTitle className="text-2xl text-white">Welcome back</CardTitle>
          <CardDescription>Enter your enrollment number to access the mart</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              <FormField
                control={form.control}
                name="enrollmentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Enrollment Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123456" 
                        {...field} 
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••" 
                          {...field} 
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.formState.errors.root && (
                <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20 animate-in fade-in">
                  {form.formState.errors.root.message}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 transition-all duration-300 shadow-[0_0_20px_-5px_var(--color-primary)] hover:shadow-[0_0_30px_-5px_var(--color-primary)]" 
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign in to Dashboard"}
              </Button>

            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="mt-8 text-center text-xs text-muted-foreground animate-in fade-in delay-700">
        <p>Protected by JIIT Unified Authentication System</p>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
// Assuming you use a similar library or standard fetch for JIITMart
// import { LoginError } from "your-api-library"; 

const formSchema = z.object({
  userId: z.string({
    required_error: "User ID / Enrollment is required",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
});

export default function Login({ onLoginSuccess, backend }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      // --- LOGIC ADAPTATION START ---
      // Determine role based on User ID pattern or API response
      let identifiedRole = "student";
      
      // Example: Check for specific Owner IDs or Patterns
      // In a real app, the API should return the role, but for client-side gating:
      const owners = ["admin", "owner", "canteen_manager"];
      if (owners.includes(values.userId.toLowerCase())) {
        identifiedRole = "owner";
      }

      // Perform actual authentication (Replace with your JIITMart API call)
      // await backend.login(values.userId, values.password);
      
      // Simulate API delay for demo
      await new Promise(resolve => setTimeout(resolve, 800)); 

      // Store session data
      localStorage.setItem("jiitmart_user", values.userId);
      localStorage.setItem("jiitmart_role", identifiedRole);
      
      toast.success(`Welcome back, ${identifiedRole === 'owner' ? 'Owner' : 'Student'}!`);
      onLoginSuccess(identifiedRole);
      // --- LOGIC ADAPTATION END ---

    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>JIITMart Login</CardTitle>
          <CardDescription>Enter your credentials to access the store</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User ID / Enrollment</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter ID" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} {...field} />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Sign in"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
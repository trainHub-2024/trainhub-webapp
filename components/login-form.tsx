"use client"
import { useState } from "react"

import { DumbbellIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from '@/components/ui/form';
import { FormInput } from "./ui-forms/form-input"
import FormSubmit from "./ui-forms/submit-button"
import { toast } from "sonner"
import { login } from "@/lib/actions/user.actions"
import { useRouter } from "next/navigation"
import { useGlobalContext } from "@/providers/global-provider"

const SCHEMA = z.object({
    password: z.string().min(2, {
        message: "password must be at least 4 characters.",
    }),
    email: z.string().email({
        message: "Must be a valid email!",
    }),
});


export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {

    // const { isLogged } = useGlobalContext();

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof SCHEMA>>({
        resolver: zodResolver(SCHEMA),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof SCHEMA>) => {
        try {
            setIsLoading(true)

            const res = await login(values.email, values.password)
            if (res) {
                toast("Welcome!")
                router.push("/dashboard")
            }


        } catch (error: any) {
            console.error(error)

            if (error.response.message)
                toast.error(error.response.message)

        } finally {
            setIsLoading(false);
        }
    }

    // if (isLogged) {
    //     window.location.replace("/dashboard");
    // }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <a
                                href="#"
                                className="flex flex-col items-center gap-2 font-medium"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-md">
                                    <DumbbellIcon className="size-6" />
                                </div>
                                <span className="sr-only">TrainHub.</span>
                            </a>
                            <h2 className="text-sm font-medium text-primary">ADMIN</h2>
                            <h1 className="text-xl font-bold">Welcome to TrainHub.</h1>
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormInput
                                control={form.control}
                                name="email"
                                label="Email Address"
                                type="email"
                                required={true}
                                disabled={isLoading}
                                placeholder="Email Address"
                                errorMsgShow={false}
                            />
                            <FormInput
                                control={form.control}
                                name="password"
                                label="Password"
                                type="password"
                                required={true}
                                disabled={isLoading}
                                placeholder="Password"
                                errorMsgShow={false}
                            />
                            <FormSubmit disabled={isLoading} className="w-full">
                                <span className="">Login</span>
                            </FormSubmit>
                        </div>
                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                            <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                Or
                            </span>
                        </div>
                        <div className="grid gap-4">
                            <Button variant="outline" className="w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                        fill="currentColor"
                                    />
                                </svg>
                                Continue with the App
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}

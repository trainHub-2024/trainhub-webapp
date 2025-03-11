"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon } from "lucide-react"

import { useRouter } from 'next/navigation';

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from '@/components/ui/form';
import { FormInput } from "../ui-forms/form-input"
import FormSubmit from "../ui-forms/submit-button"
import { createSport } from "@/lib/actions/sports.actions"
import { toast } from "sonner"

const SCHEMA = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
});


export default function CreateSportModal() {
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()

    const form = useForm<z.infer<typeof SCHEMA>>({
        resolver: zodResolver(SCHEMA),
        defaultValues: {
            name: ""
        },
    });

    async function onSubmit(values: z.infer<typeof SCHEMA>) {
        setIsLoading(true);

        const res = await createSport({ body: { name: values.name } })
        if (res) {
            toast("Successfully Created Sport!")
            window.location.reload();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button type='button' size={"sm"}>
                    <PlusIcon />
                    <span>Add Sport</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Sport</DialogTitle>
                    <DialogDescription>
                        Add a new sport category into the system.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        <FormInput
                            control={form.control}
                            name="name"
                            label="Name of the sport"
                            placeholder='Enter name'
                            disabled={isLoading}
                        />
                        <FormSubmit disabled={isLoading}>
                            <span>Submit</span>
                        </FormSubmit>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

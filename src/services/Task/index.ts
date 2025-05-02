"use server"
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getTaskByUser = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/tasks`,
            {
                next: {
                    tags: ["TASK"],
                    revalidate: 30,
                },
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );

        const data = await response.json();

        return data;


    } catch (error: any) {
        throw new Error(error)
    }
};

export const getTaskById = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/tasks/${id}`, {
            cache: "no-store",
            next: {
                tags: ["TASK"]
            },
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}

export const addTask = async (taskData: any,) => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": (await cookies()).get("accessToken")!.value
            },
            body: JSON.stringify(taskData),
        })
        revalidateTag("TASK");

        const data = await res.json()
        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}

export const updateTaskById = async (id: string, updatedTaskData: any) => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(updatedTaskData)
        })
        revalidateTag("TASK");
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}

export const updateTaskStatusById = async (id: string, status: any) => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/tasks/${id}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(status)
        })
        revalidateTag("TASK");
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteTaskById = async (id: string) => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": (await cookies()).get("accessToken")!.value,
            },
        })
        revalidateTag("TASK");
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}
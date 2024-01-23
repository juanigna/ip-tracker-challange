"use server"

import { revalidatePath } from "next/cache"

export const getLocation = async (ip: string) => {
    const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.IPIFY_API_KEY}&ipAddress=${ip}`)
    const data = await res.json()
    revalidatePath('/')
    return data
} 
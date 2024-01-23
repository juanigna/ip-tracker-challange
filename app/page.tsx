"use client"

import Image from "next/image";
import { getLocation } from "./utils/getLocation";
import { useEffect, useState, useTransition } from "react";
import { Location } from "./types";
import { Map } from "./components";
import { useMap } from "react-leaflet";

export default function Home() {

  const [data, setData] = useState<Location>({} as Location)
  const [ip, setIp] = useState("")
  const [isloaded, setIsLoaded] = useState(false)


  const [isPending, startTransition] = useTransition()



  useEffect(() => {
    fetchUserIP()
    handleSearch()
  }, [])




  async function fetchUserIP() {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setIp(data.ip)
    } catch (error) {
      console.error("Error fetching user's IP:", error);
    }
  }

  const handleSearch = () => {
    startTransition(() => {
      getLocation(ip).then(res => {
        setData(res)
      }).catch(err => console.log(err))
    })
  }

  useEffect(() => {
    if (data?.location?.lat) {
      setIsLoaded(true);

    }
  }, [data, ip]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-very-dark-gray">
      <header className="w-full relative bg-hero-pattern h-[200px] flex flex-col items-center justify-center gap-4 p-2">
        <h1 className="font-bold text-base text-2xl">IP Address Tracker</h1>
        <div className="flex">
          <input className="rounded-l-md rounded-bl-md text-black bg-white border-none p-3" onChange={(e) => setIp(e.target.value)} />
          <button className="p-3 bg-black rounded-tr-md rounded-br-md" onClick={handleSearch}>
            <Image src={'/icon-arrow.svg'} width={20} height={14} alt="Arrow" />
          </button>
        </div>
        <div className="z-10 max-w-4xl w-full bg-white rounded-md absolute -bottom-12 flex items-center justify-center h-[90px]">
          <div className="flex flex-col items-start justify-center p-10 ">
            <p className="text-dark-gray font-bold text-xs">
              IP ADDRESS
            </p>

            {data.ip ? (
              <p className="font-bold text-black">
                {data.ip}
              </p>
            ) : (
              <p className="font-bold text-black">No Ip Provided!</p>
            )}


          </div>
          <div className="h-4/5 w-[2px] bg-dark-gray"></div>
          <div className="flex flex-col items-start justify-center p-10">
            <p className="text-dark-gray font-bold text-xs">
              LOCATION
            </p>
            {data?.location?.country ? (
              <p className="font-bold text-black">
                {data?.location?.region}
              </p>
            ) : (
              <p className="font-bold text-black">No Ip Provided!</p>
            )}
          </div>
          <div className="h-4/5 w-[2px] bg-dark-gray"></div>
          <div className="flex flex-col items-start justify-center p-10">
            <p className="text-dark-gray font-bold text-xs">
              TIMEZONE
            </p>
            {data?.location?.timezone ? (
              <p className="font-bold text-black">
                {data?.location?.timezone}
              </p>
            ) : (
              <p className="font-bold text-black">No Ip Provided!</p>
            )}
          </div>
          <div className="h-4/5 w-[2px] bg-dark-gray"></div>
          <div className="flex flex-col items-start justify-center p-10">
            <p className="text-dark-gray font-bold text-xs">
              ISP
            </p>
            {data?.isp ? (
              <p className="font-bold text-black">
                {data?.isp}
              </p>
            ) : (
              <p className="font-bold text-black">No Ip Provided!</p>
            )}
          </div>
        </div>
      </header>
      <section className="relative w-full z-0">
        {isloaded ? (
          <Map lat={data?.location?.lat} lng={data?.location?.lng} />
        ) : (
          <p className="mt-24 text-center font-bold">Fliying to your position!</p>
        )}
      </section>

    </main>
  );
}

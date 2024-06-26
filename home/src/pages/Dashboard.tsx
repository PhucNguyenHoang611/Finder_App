/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from "react";
import SideBar from "@/components/nav/SideBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  // const [position, setPosition] = useState<Position>({
  //   latitude: null,
  //   longitude: null,
  // });

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       setPosition({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //     });

  //     console.log(
  //       `Latitude: ${position.latitude}, Longitude: ${position.longitude}`
  //     );
  //   } else {
  //     console.log("Geolocation is not available in your browser.");
  //   }
  // }, []);

  return (
    <main className="flex justify-start items-start lg:px-10 md:px-6 sm:px-4 px-2">
      <section className="lg:flex w-64 fixed hidden">
        <SideBar />
      </section>
      <section className="lg:pl-64 flex justify-center items-center pt-4">
        <div className="w-11/12">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;

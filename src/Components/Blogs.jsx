import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "./Card";
import SelectedCard from "./SelectedCard";
import Header from "./Header";
import Footer from "./Footer";


const Blogs = () => {


    const handleFetch = async () => {
        const response = await axios.get("http://localhost:3001/blogs");
        console.log(response.data);
        return response.data;
    };

    const { isPending, isError, data = [], error } = useQuery({
        queryKey: ["blogs"],
        queryFn: handleFetch,
    });

    const [selectedIndex, setSelectedIndex] = useState(0)

    const selectedBlog = data[selectedIndex]


    if (isPending) {
        return <span>L O A D I N G . . . .</span>;
    }

    if (isError) {
        return <span>ERROR : {error.message}</span>;
    }

    return (
        <div>
            <main className="flex flex-col lg:px-20 md:px-3 px-3 gap-10 m-0">
            <div className="sticky top-0 w-full h-fit bg-white z-50">
            <Header />
            </div>

            <div className="flex flex-col justify-center items-center gap-3">
                <h1 className='flex justify-center font-extrabold lg:text-4xl md:text-3xl text-3xl'> CA Monk Blog  </h1>
                <p className='w-[48vw] text-center lg:text-2xl text-sm'> Stay updated with the latest trends in finance, accounting, and career growth</p>
            </div>

            <div className="lg:flex md:flex gap-5 bg-gray-200 rounded-2xl p-5">
                <div className="lg:w-[38vw]">
                    <h1 className="font-semibold mb-3"> Latest Blog's</h1>
                    <div className="flex flex-col gap-4 lg:max-h-[68vw] md:max-h-screen max-h-[58vw] overflow-y-auto p-3">
                        {data.map((ele, i) => (

                            <Card key={i} data={ele} onSelect={() => setSelectedIndex(i)} isSelected={i === selectedIndex} />

                        ))}
                    </div>
                </div>

                <div className="lg:w-[60vw]">
                    <SelectedCard data={selectedBlog} />
                </div>

            </div>
        </main>
        <Footer />
        </div>
    );
};

export default Blogs;

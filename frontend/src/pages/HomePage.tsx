import React from "react";
import { Navbar } from "../components/organisms/Navbar/Navbar";
import { Hero } from "../components/organisms/Hero/Hero";
import { InformationWrapper } from "../components/organisms/InformationWrapper/InformationWrapper";

export const HomePage = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <InformationWrapper secondary={false} firstLabel="Możesz robić" secondLabel="testy" thirdLabel="online" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
            <InformationWrapper secondary={true} firstLabel="Rób własne" thirdLabel="fiszki" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
        </>
    )
}
import React from "react";
import { Navbar } from "../../components/organisms/Navbar/Navbar";
import { JobOffer } from "../../components/organisms/JobOffer/JobOffer";
import { Heading } from "../../components/atoms/Heading/Heading";
import { SecondaryHeading } from "../../components/atoms/Heading/SecondaryHeading";
import { jobOffers } from "../../assets/data/jobs";
import styled from "styled-components";
import { JobInterface } from "../../interfaces/types";
import { Footer } from "../../components/organisms/Footer/Footer";

export const CarrerPage = () => {
  const Wrapper = styled.div`
    padding: ${({ theme }) => theme.padding.mobilePadding};
    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
      padding: ${({ theme }) => theme.padding.desktopPadding};
    }
  `;
  const JobWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
      padding: ${({ theme }) => theme.padding.innerPadding};
    }
  `;
  return (
    <>
      <Navbar />
      <Wrapper>
        <SecondaryHeading label="Oferty_pracy" secondary isSectionTitle />
        <JobWrapper>
          {jobOffers.map((job: JobInterface) => (
            <JobOffer
              key={job.id}
              title={job.title}
              salary={job.salary}
              employmentType={job.employmentType}
              location={job.location}
              responsibilities={job.responsibilities}
              id={job.id}
            />
          ))}
        </JobWrapper>
      </Wrapper>
      <Footer />
    </>
  );
};

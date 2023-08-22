import React from "react";
import { SecondaryHeading } from "../../components/atoms/Heading/SecondaryHeading";
import { Cta } from "../../components/atoms/Button/Cta";
import { styled } from "styled-components";
import { Item } from "../../components/atoms/Item/Item";
import { useParams } from "react-router-dom";
import { jobOffers } from "../../assets/data/jobs";
import { Input } from "../../components/atoms/Input/Input";
import { LandingPageLayout } from "../../templates/LandingPageLayout";
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: ${({ theme }) => theme.white};
  padding: ${({ theme }) => theme.padding.innerPadding};
`;
const Wrapper = styled.div`
  padding: ${({ theme }) => theme.padding.mobilePadding};
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    padding: ${({ theme }) => theme.padding.desktopPadding};
  }
`;
const ListItem = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Offer: React.FC = () => {
  const { carrerId } = useParams<{ carrerId: string }>();
  const job = jobOffers.find((j) => j.id == carrerId);
  console.log(carrerId);
  if (!job) {
    return <p>Job offer not found</p>;
  }

  return (
    <>
      <LandingPageLayout>
        <Wrapper>
          <SecondaryHeading label="Aplikuj" secondary isSectionTitle />
          <InnerWrapper>
            <SecondaryHeading
              style={{
                fontSize: "1rem",
                textAlign: "center",
                width: "100%",
              }}
              label={job.title}
              secondary
              isSectionTitle
            />
            <p>{job.responsibilities}</p>
            {job.expectations && (
              <>
                <h3>Nasze oczekiwania:</h3>
                <ListItem>
                  {job.expectations.map((expectation) => (
                    <Item key={expectation} label={expectation} />
                  ))}
                </ListItem>
              </>
            )}
            {job.offers && (
              <>
                <h3>W zamian oferujemy:</h3>
                <ListItem>
                  {job.offers.map((offer) => (
                    <Item key={offer} label={offer} />
                  ))}
                </ListItem>
              </>
            )}
            {job.benefits && (
              <>
                <h3>Benefity:</h3>
                <ListItem>
                  {job.benefits.map((benefit) => (
                    <Item key={benefit} label={benefit} />
                  ))}
                </ListItem>
              </>
            )}
            <Input style={{ width: "30%" }} placeholder="Twój email" />
            <Input style={{ width: "30%", padding: 0 }} isFileType />
            <Cta label="Aplikuj" isJobOffer />
          </InnerWrapper>
        </Wrapper>
      </LandingPageLayout>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { Cta } from "../../../components/atoms/Button/Cta";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
// import { FlashCards } from "../../../assets/data/flashCards"; // Update the import to match the new interface
import Cookies from "js-cookie";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FlashCardsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FlashCardsListItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 8px;
  width: 100%;
  background-color: ${({ theme }) => theme.purple};
`;

export const LearnPage: React.FC = () => {
  const [deck, setDeck] = useState<any[]>([]); // Initialize as an empty array

  const getAuthTokenFromCookies = () => {
    const token = Cookies.get("jwt"); // Replace "jwt" with your cookie name
    return token;
  };

  // Function to fetch flashcards
  const fetchFlashcards = async () => {
    try {
      const authToken = getAuthTokenFromCookies();
      // Make an HTTP request to your API endpoint that provides flashcards
      const response = await fetch(
        `https://localhost:7024/api/FlashCard/getStudentDecks`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`, // Replace with your JWT token
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setDeck(data); // Update state with the fetched flashcards
      } else {
        // Handle error responses here
        console.error("Failed to fetch flashcards");
      }
      console.log(authToken);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  console.log(deck);
  return (
    <PlatformLayout>
      <Wrapper>
        <h2>Twoje fiszki:</h2>
        <FlashCardsList>
          {deck.map((flashcardSet) => (
            <FlashCardsListItem key={flashcardSet.Id}>
              <div key={flashcardSet.Id}>
                Nazwa: {flashcardSet.Name} - {flashcardSet.Category}
                <br />
                <Cta
                  style={{ alignSelf: "flex-start" }}
                  href={`/platform/learn/${flashcardSet.Id}`}
                  label="Wejdź"
                  isJobOffer
                />
              </div>
            </FlashCardsListItem>
          ))}
        </FlashCardsList>
        <Link to="/platform/learn/create">
          <Cta
            style={{ alignSelf: "flex-start" }}
            label="Stwórz fiszkę"
            isJobOffer
          />
        </Link>
      </Wrapper>
    </PlatformLayout>
  );
};

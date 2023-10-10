import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { styled } from "styled-components";
import { ImFilePdf } from "react-icons/im";
import { getAuthTokenFromCookies } from "../../../utils/getAuthToken";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MaterialsContainer = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const MaterialHeading = styled.h3`
  margin-bottom: 1rem;
`;

const PdfLink = styled.a`
  display: block;
  padding: 10px;
  background-color: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.secondaryText};
  text-decoration: none;
  margin: 5px 0;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryColorHover};
  }
`;

const PdfLinkText = styled.span`
  margin-left: 10px;
`;

export const ClassPageDetail: React.FC = () => {
  const { classId } = useParams<{ classId: any }>();
  const [selectedClass, setSelectedClass] = useState<any>();
  const [pdfFiles, setPdfFiles] = useState<any>();
  const [loading, setLoading] = useState(true);

  const fetchUserClasses = async () => {
    try {
      const authToken = getAuthTokenFromCookies();
      const response = await fetch(
        `https://localhost:7024/api/Class/GetClass`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        const myData = data.$values;
        setSelectedClass(myData);
        setPdfFiles(myData[classId - 1]);
        setLoading(false);
      } else {
        console.error("Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };
  console.log(pdfFiles);

  useEffect(() => {
    fetchUserClasses();
  }, []);

  return (
    <PlatformLayout>
      <Wrapper>
        <MaterialsContainer>
          {loading ? (
            <p>Ładowanie...</p>
          ) : (
            <>
              <MaterialHeading>
                {selectedClass[classId - 1].ClassName} - materiały
              </MaterialHeading>
              <div>
                <div>
                  {pdfFiles?.PdfFiles &&
                    pdfFiles?.PdfFiles.$values.map((pdfFile: any) => (
                      <>
                        <PdfLink
                          key={pdfFile.Id}
                          href={`data:application/pdf;base64,${pdfFile.FileContent}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={pdfFile.Name}
                        >
                          <ImFilePdf size={20} />
                          <PdfLinkText>
                            Pobierz plik PDF: {pdfFile.Name}
                          </PdfLinkText>
                        </PdfLink>
                      </>
                    ))}
                </div>
              </div>
            </>
          )}
        </MaterialsContainer>
      </Wrapper>
    </PlatformLayout>
  );
};

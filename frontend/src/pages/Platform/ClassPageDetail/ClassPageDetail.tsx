import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Add this import
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { styled } from "styled-components";
import { ImFilePdf } from "react-icons/im"; // Import the PDF icon
import { classData } from "../../../assets/data/classes";
import Cookies from "js-cookie";

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

const MaterialSubHeading = styled.h4`
  margin-bottom: 2rem;
`;

const MaterialItem = styled.a`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.primaryText};
  margin-bottom: 0.5rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  svg {
    margin-left: 0.5rem;
  }
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
  const [selectedClass, setSelectedClass] = useState<any>();
  const [classDetail, setClassDetail] = useState<any>();
  const [pdfFiles, setPdfFiles] = useState<any[]>();

  const [loading, setLoading] = useState(true); // Dodaj zmienną stanu loading

  const getAuthTokenFromCookies = () => {
    const token = Cookies.get("jwt");
    return token;
  };

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
        setClassDetail(myData.map((x: any) => x.PdfFiles));
        setLoading(false);
        console.log();
      } else {
        console.error("Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };
  const fetchPdfFiles = async () => {
    try {
      const authToken = getAuthTokenFromCookies();
      const response = await fetch(
        `https://localhost:7024/api/class/pdf-files/${1}/test.pdf`,
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
        console.log("dane ===");
        console.log(data);
        setPdfFiles(data);
      } else {
        console.error("Failed to fetch PDF files");
      }
    } catch (error) {
      console.error("Error fetching PDF files:", error);
    }
  };

  useEffect(() => {
    fetchUserClasses();
    fetchPdfFiles();
  }, []);
  console.log(classDetail);
  console.log(`classDetail ===`);
  return (
    <PlatformLayout>
      <Wrapper>
        <MaterialsContainer>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <MaterialHeading>
                {selectedClass && selectedClass.map((x: any) => x.ClassName)} -
                materiały
              </MaterialHeading>
              <div>
                <div>
                  {classDetail &&
                    classDetail.map((pdfFile: any) => (
                      <div key={pdfFile.id}>
                        {pdfFile.$values.map((file: any) => (
                          <PdfLink
                            key={file.Id}
                            href={`data:application/pdf;base64,${file.FileContent}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={file.Name}
                          >
                            <ImFilePdf size={20} />
                            <PdfLinkText>
                              Pobierz plik PDF: {file.Name}
                            </PdfLinkText>
                          </PdfLink>
                        ))}
                      </div>
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

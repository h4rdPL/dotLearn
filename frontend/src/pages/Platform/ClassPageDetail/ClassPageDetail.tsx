import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { styled } from "styled-components";
import { ImFilePdf, ImFileText, ImFileWord } from "react-icons/im";
import { getAuthTokenFromCookies } from "../../../utils/getAuthToken";
import { Cta } from "../../../components/atoms/Button/Cta";
import { getUserRole } from "../../../utils/GetUserRole";
import { Span } from "../../../components/atoms/Span/Span";
import { dateConverter } from "../../../utils/DateConverter";

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

const FileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const GradeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

interface PDFFileInterface {
  id: string;
  formFile: File | string;
}

export const ClassPageDetail = () => {
  const [role, setRole] = useState<string | undefined>();
  const [grades, setGrades] = useState<any[]>();

  const [selectedClass, setSelectedClass] = useState<any>();
  const [pdfFiles, setPdfFiles] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { classId } = useParams<{ classId: string }>();
  const [data, setData] = useState<PDFFileInterface>({
    id: classId || "",
    formFile: "",
  });

  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setData({
      id: classId || "",
      formFile: target.files[0],
    });
  };
  const fetchGrades = async () => {
    try {
      const authToken = getAuthTokenFromCookies();
      const response = await fetch(
        `https://localhost:7024/api/Test/GetTestResult`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data: any = await response.json();
        const filteredGrades = data.$values.filter(
          (grade: any) => grade.ClassId === classId
        );
        setGrades(filteredGrades);

        console.log("dane");
        console.log(data.$values);
      } else {
        console.error("Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleFileUpload = async () => {
    const formData = new FormData();

    formData.append("formFile", data.formFile);
    formData.append("id", data.id);

    try {
      const authToken = getAuthTokenFromCookies();
      const response = await fetch(
        `https://localhost:7024/api/Class/upload-pdf?id=${data.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
          body: formData,
        }
      ).then((r) => r.json());
      console.log(response);
      window.location.reload();
    } catch (err) {
      console.error("error:", err);
    }
  };

  const fetchUserClasses = async () => {
    try {
      const authToken = getAuthTokenFromCookies();
      if (typeof authToken === "undefined") return;
      setRole(getUserRole(authToken));

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
        console.log("myData");
        console.log(myData);
        setSelectedClass(myData);

        for (const item of data.$values) {
          if (item.Id === classId) {
            setPdfFiles(item);
            break;
          }
        }
        setLoading(false);
      } else {
        console.error("Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchUserClasses();
    fetchGrades();
  }, []);
  console.log("selectedClass");
  console.log(selectedClass);
  return (
    <PlatformLayout>
      <Wrapper>
        <MaterialsContainer>
          {loading ? (
            <p>Ładowanie...</p>
          ) : (
            <>
              <MaterialHeading>
                {pdfFiles.ClassName} - materiały
              </MaterialHeading>
              <div>
                <div>
                  {pdfFiles.PdfFiles.$values.map((pdfFile: any) => {
                    const fileExtension = pdfFile.Name.split(".").pop();

                    const getIconForExtension = (extension: string) => {
                      switch (extension) {
                        case "pdf":
                          return <ImFilePdf size={20} />;
                        case "docx":
                          return <ImFileWord size={20} />;
                        case "odt":
                          return <ImFileWord size={20} />;
                        case "txt":
                          return <ImFileText size={20} />;
                        default:
                          return <ImFilePdf size={20} />;
                      }
                    };

                    return (
                      <>
                        <PdfLink
                          key={pdfFile.Id}
                          href={`data:application/pdf;base64,${pdfFile.FileContent}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={pdfFile.Name}
                        >
                          {getIconForExtension(fileExtension)}
                          <PdfLinkText>
                            Pobierz plik {fileExtension.toUpperCase()}:{" "}
                            {pdfFile.Name}
                          </PdfLinkText>
                        </PdfLink>
                      </>
                    );
                  })}
                </div>
              </div>
              <MaterialHeading>Twoje oceny</MaterialHeading>
              <GradeWrapper>
                {grades &&
                  grades.map((grade: any) => (
                    <div key={grade.Id}>
                      <Span
                        titleLabel={`${grade.ClassName} /`}
                        label={`${grade.TestName}`}
                        gradeLabel={`${grade.Grade}`}
                        isGrade
                      />
                      {dateConverter(grade.ActiveDate)}
                    </div>
                  ))}
              </GradeWrapper>

              <FileWrapper>
                {role === "Professor" && (
                  <>
                    <p>Dodaj materiały:</p>
                    <input type="file" onChange={handleFileChange} multiple />
                    <Cta
                      style={{ alignSelf: "flex-start" }}
                      label="Wyślij plik"
                      onClick={handleFileUpload}
                      isJobOffer
                    />
                  </>
                )}
              </FileWrapper>
            </>
          )}
        </MaterialsContainer>
        <span style={{ fontSize: "24px" }}>
          <p>
            {role === "Professor" &&
              selectedClass &&
              selectedClass.map((data: any) => `Kod klasy: ${data.ClassCode}`)}
          </p>
        </span>
      </Wrapper>
    </PlatformLayout>
  );
};

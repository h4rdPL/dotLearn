import React from "react";
import { useParams } from "react-router-dom"; // Add this import
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { styled } from "styled-components";
import { ImFilePdf } from "react-icons/im"; // Import the PDF icon
import { classData } from "../../../assets/data/classes";

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

export const ClassPageDetail: React.FC = () => {
  const { classId } = useParams<{ classId: string }>(); // Get the class ID from URL

  const selectedClass = classData.find((myClass: any) => myClass.id == classId);

  if (!selectedClass) {
    return <p>Class not found</p>;
  }

  return (
    <PlatformLayout>
      <Wrapper>
        <MaterialsContainer>
          <MaterialHeading>Materiały</MaterialHeading>
          <div>
            <MaterialSubHeading>
              {selectedClass.subject} Materiały:
            </MaterialSubHeading>
            {selectedClass.classEntities.materials.map((material: any) => (
              <MaterialItem
                key={material.name}
                href={`/path/to/${material.name}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {material.name}
                <ImFilePdf />
              </MaterialItem>
            ))}
          </div>
        </MaterialsContainer>
      </Wrapper>
    </PlatformLayout>
  );
};

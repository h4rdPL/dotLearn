import React from "react";
import { useParams } from "react-router-dom";
import { classData } from "../../../assets/data/classes";
import { PlatformLayout } from "../../../templates/PlatformLayout";

export const ClassPageDetail: React.FC = () => {
  const { classId } = useParams<{ classId: any }>();
  const classDetail = classData.find((c) => c.id == classId);
  console.log(classDetail);
  return (
    <>
      <PlatformLayout>
        <div>
          <h1>
            {classDetail?.subject} - {classDetail?.professor.firstName}{" "}
            {classDetail?.professor.lastName}
          </h1>
          {/* {classDetail.map((data) => (
            <>{data.id}</>
          ))} */}
        </div>
      </PlatformLayout>
    </>
  );
};

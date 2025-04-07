import React, { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
  className?: string;
}

const FormContainer: React.FC<FormContainerProps> = ({ children, className }) => {
  return (
    <div className={`w-full max-w-[350px] bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md ${className || ""}`}>
      {children}
    </div>
  );
};

export default FormContainer;

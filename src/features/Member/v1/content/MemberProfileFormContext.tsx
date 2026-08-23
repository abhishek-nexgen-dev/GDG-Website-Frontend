import type { UseFormReturn } from "react-hook-form";
import type { MemberType } from "../../../Auth/v1/types/Auth.type";
import { createContext, type ReactNode, useContext } from "react";
import useMemberProfileForm from "../hook/useMemberProfileForm";

interface MemberFormContextType {
  form: UseFormReturn<MemberType>;
}

const MemberProfileFormContext = createContext<MemberFormContextType | undefined>(undefined);

interface MemberProfileFormProviderProps {
  children: ReactNode;
  initialData?: MemberType;
}

export function MemberProfileFormProvider({
  children,
}: MemberProfileFormProviderProps) {
 
  const form = useMemberProfileForm();

  return (
    <MemberProfileFormContext.Provider value={{ form }}>
      {children}
    </MemberProfileFormContext.Provider>
  );
}

export function useMemberProfileFormContext() {
  const context = useContext(MemberProfileFormContext);

  if (context === undefined) {
    throw new Error(
      "useMemberProfileFormContext must be used within a MemberProfileFormProvider"
    );
  }

  return context;
}

export default MemberProfileFormProvider;
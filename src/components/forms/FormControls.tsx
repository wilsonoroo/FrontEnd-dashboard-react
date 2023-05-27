import { ErrorMessage, FormikErrors, FormikTouched, getIn } from "formik";

import { CampoForm } from "@/utils/global";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";

interface FormControlsProps {
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  fields: string[];
  values: any;
  getItemForm: (
    item: CampoForm,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => JSX.Element;
  camposForm: Record<string, any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const FormControls: React.FC<FormControlsProps> = ({
  errors,
  touched,
  fields,
  values,
  getItemForm,
  camposForm,
  setFieldValue,
}) => {
  return (
    <>
      {fields.map((field) => (
        <>
          <FormControl
            key={field as string}
            isInvalid={
              getIn(errors, field as string) && getIn(touched, field as string)
            }
            isRequired={getIn(camposForm, field as string)?.required ?? false}
          >
            {getItemForm(camposForm[`${field}`], setFieldValue)}
            <ErrorMessage name={field}>
              {(msg) => <FormErrorMessage>{msg}ss</FormErrorMessage>}
            </ErrorMessage>
          </FormControl>
        </>
      ))}
    </>
  );
};

export default FormControls;

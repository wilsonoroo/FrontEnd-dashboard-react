import { ErrorMessage, FormikErrors, FormikTouched, getIn } from "formik";

import { CampoForm } from "@/utils/global";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";

interface FormControlsProps {
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  fields: string[];
  values: any;
  getItemForm: (item: CampoForm) => JSX.Element;
  camposForm: Record<string, any>;
}

const FormControls: React.FC<FormControlsProps> = ({
  errors,
  touched,
  fields,
  values,
  getItemForm,
  camposForm,
}) => {
  console.log(camposForm);
  return (
    <>
      {fields.map((field) => (
        <FormControl
          key={field}
          isInvalid={
            getIn(errors, field as string) && getIn(touched, field as string)
          }
          isRequired={getIn(camposForm, field as string).required}
        >
          <>{console.log(getIn(camposForm, field as string).required)}</>
          {getItemForm(camposForm[`${field}`])}
          <ErrorMessage name={field}>
            {(msg) => <FormErrorMessage>{msg}ss</FormErrorMessage>}
          </ErrorMessage>
        </FormControl>
      ))}
    </>
  );
};

export default FormControls;

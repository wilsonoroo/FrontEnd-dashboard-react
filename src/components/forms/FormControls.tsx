import { ErrorMessage, FormikErrors, FormikTouched, getIn } from "formik";

import { CampoForm } from "@/utils/global";
import { FormControl, FormErrorMessage, SimpleGrid } from "@chakra-ui/react";

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
  getItemForm,
  camposForm,
  setFieldValue,
}) => {
  const filteredObjects = fields
    .filter((key) => Object.keys(camposForm).includes(key))
    .sort((a, b) => {
      const ordenA = camposForm[a].orden;
      const ordenB = camposForm[b].orden;

      return ordenA - ordenB;
    });

  return (
    <SimpleGrid columns={2} spacing={2}>
      {filteredObjects.map(function (field) {
        return (
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
        );
      })}
    </SimpleGrid>
  );
};

export default FormControls;

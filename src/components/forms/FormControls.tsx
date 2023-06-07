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
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void,
    value?: any
  ) => JSX.Element;
  camposForm: Record<string, any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}
type ObjectoType = {
  [key: string]: CampoForm;
};
const FormControls: React.FC<FormControlsProps> = ({
  errors,
  touched,
  fields,
  getItemForm,
  camposForm,
  setFieldValue,
  values,
}) => {
  //AGRUPAR VALORES POR SECCION
  const seccionado = Object.keys(camposForm).reduce(
    (acumulador: { [seccion: string]: ObjectoType }, key: string) => {
      const seccion = camposForm[key].seccion || "global";
      if (!acumulador[seccion]) {
        acumulador[seccion] = {};
      }
      acumulador[seccion][key] = camposForm[key];
      return acumulador;
    },
    {}
  );

  const filteredObjects: string[] = fields
    .filter((key) => Object.keys(seccionado.global).includes(key))
    .sort((a, b) => {
      const ordenA = camposForm[a].orden;
      const ordenB = camposForm[b].orden;

      return ordenA - ordenB;
    });
  console.log(
    "🚀 ~ file: FormControls.tsx:56 ~ seccionado:",
    seccionado,
    filteredObjects,
    camposForm
  );

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
            {getItemForm(
              camposForm[`${field}`],
              setFieldValue,
              getIn(values, field as string)
            )}
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

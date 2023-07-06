import {
  Checkbox,
  FormLabel,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import _ from "lodash";
import { useEffect, useState } from "react";

type Props = {
  item: any;
  value: Permiso[];
};

type Permiso = {
  id: string;
  nombre: string;
  permisos: {
    admin: boolean;
    visualizar: boolean;
  };
};

type PermisoMobile = {
  id: string;
  displayName: string;
  subTitulo: string;
  codigo: string;
  permisos: {
    crear: boolean;
    validar: boolean;
  };
};

const PermisosComponents = (props: {
  item: any;
  value: Permiso[];
  onChange: (permisos: Permiso[]) => void;
}) => {
  const { item, onChange, value } = props;

  let permisosIniciales: Permiso[] = value;

  let permisosStandard: Permiso[] = [
    {
      id: "documento",
      nombre: "Documento",
      permisos: {
        admin: false,
        visualizar: false,
      },
    },
    {
      id: "planes_de_acción",
      nombre: "Planes de acción",
      permisos: {
        admin: false,
        visualizar: false,
      },
    },
    {
      id: "Vehiculos",
      nombre: "vehiculos",
      permisos: {
        admin: false,
        visualizar: false,
      },
    },
    {
      id: "Equipos",
      nombre: "equipos",
      permisos: {
        admin: false,
        visualizar: false,
      },
    },
    {
      id: "Herramientas",
      nombre: "herramientas",
      permisos: {
        admin: false,
        visualizar: false,
      },
    },
    {
      id: "Usuarios",
      nombre: "usuarios",
      permisos: {
        admin: false,
        visualizar: false,
      },
    },
    {
      id: "Configuracion",
      nombre: "configuracion",
      permisos: {
        admin: false,
        visualizar: false,
      },
    },
    {
      id: "Perfil",
      nombre: "perfil",
      permisos: {
        admin: false,
        visualizar: false,
      },
    },
    {
      id: "Dashboard",
      nombre: "dashboard",
      permisos: {
        admin: false,
        visualizar: false,
      },
    },
  ];
  let headers: string[] = ["Administración", "Visualización"];

  const [permisos, setPermisos] = useState(permisosStandard);

  useEffect(() => {
    onChange(permisosStandard);
  }, []);

  useEffect(() => {
    if (value && value.length !== 0) {
      let result = permisosStandard.map((permiso, index) => {
        permiso.permisos.admin = value[index]?.permisos?.admin;
        permiso.permisos.visualizar = value[index]?.permisos?.visualizar;
        return permiso;
      });

      setPermisos(result);
    }
  }, [value]);

  const handleChangeAndSubmit = (
    permisoId: string,
    permisoType: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // if(item.transform)
    const updatedPermisos = permisos.map((permiso) =>
      permiso.id === permisoId
        ? {
            ...permiso,
            permisos: {
              ...permiso.permisos,
              [permisoType]: event.target.checked,
            },
          }
        : permiso
    );
    setPermisos(updatedPermisos);
    onChange(updatedPermisos);
  };

  return (
    <>
      <FormLabel htmlFor={item.field}>Privilegios Plataforma WEB</FormLabel>
      <div
        style={{
          borderWidth: "1px",
          borderColor: "",
          padding: "1px",
          borderRadius: "8px",
        }}
      >
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th></Th>
                {headers.map((item) => (
                  <Th style={{ fontSize: "9px" }}>{item}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {permisos.map((permiso) => (
                <Tr key={permiso.id}>
                  <Td>
                    <Text fontSize={"sm"}>{permiso.nombre}</Text>
                  </Td>
                  <Td>
                    <Checkbox
                      id={`${permiso.id}_admin`}
                      name={`${permiso.id}_admin`}
                      isChecked={permiso.permisos.admin}
                      onChange={(event) =>
                        handleChangeAndSubmit(permiso.id, "admin", event)
                      }
                      // colorScheme="orange"
                    />
                  </Td>
                  <Td>
                    <Checkbox
                      id={`${permiso.id}_visualizar`}
                      name={`${permiso.id}_visualizar`}
                      isChecked={permiso.permisos.visualizar}
                      onChange={(event) =>
                        handleChangeAndSubmit(permiso.id, "visualizar", event)
                      }
                      // colorScheme="orange"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export const PermisosComponentsMovil = (props: {
  item: any;
  value: PermisoMobile[];
  onChange: (permisos: PermisoMobile[]) => void;
}) => {
  const { item, onChange, value } = props;
  let permisosIniciales: PermisoMobile[] = [
    {
      id: "creador_is",
      displayName: "IS",
      codigo: "creador_is",
      subTitulo: "Instructivo de Seguridad",
      permisos: {
        crear: false,
        validar: false,
      },
    },
    {
      id: "creador_checklist",
      displayName: "LV",
      subTitulo: "Lista de Verificación",
      codigo: "creador_checklist",
      permisos: {
        crear: false,
        validar: false,
      },
    },
    {
      id: "creador_charla_5_minutos",
      displayName: "C5",
      codigo: "creador_charla_5_minutos",
      subTitulo: "Charla de 5 minutos",
      permisos: {
        crear: false,
        validar: false,
      },
    },

    {
      id: "creador_io",
      displayName: "IO",
      subTitulo: "Inspeción y Observación",
      codigo: "creador_io",
      permisos: {
        crear: false,
        validar: false,
      },
    },
    {
      id: "creador_rem",
      displayName: "REM",
      codigo: "creador_rem",
      subTitulo: "Registro, Evento, Mejora",
      permisos: {
        crear: false,
        validar: false,
      },
    },
    {
      id: "creador_pt",
      displayName: "PT",
      subTitulo: "Permisos de trabajo",
      codigo: "creador_pt",
      permisos: {
        crear: false,
        validar: false,
      },
    },
    {
      id: "creador_ert",
      displayName: "ERT",
      subTitulo: "Evaluacion de Riesgo de la Tarea",
      codigo: "creador_ert",
      permisos: {
        crear: false,
        validar: false,
      },
    },
    {
      id: "planificador",
      displayName: "Planes de Accion",
      codigo: "planificador",
      subTitulo: "Genera y Asigna Planes de Acción",
      permisos: {
        crear: false,
        validar: false,
      },
    },
  ];
  let headers: string[] = ["Crear", "Validar"];

  const [permisos, setPermisos] = useState(permisosIniciales);

  useEffect(() => {
    console.log(
      "🚀 ~ file: permisosComponents.tsx:320 ~ useEffect ~ value:",
      value
    );
    if (value) {
      let permisoCapture = _.toArray(value);
      console.log(
        "🚀 ~ file: permisosComponents.tsx:320 ~ result ~ permisoCapture:",
        permisoCapture
      );
      let result = permisosIniciales.map((permiso) => {
        permisoCapture.find((item) => {
          if (item.id === permiso.id) {
            permiso.permisos.crear = item?.permisos?.crear;
            permiso.permisos.validar = item?.permisos?.validar;
          }
        });
        //permiso.permisos.crear = value[permiso.id];
        //permiso.permisos.validar = value[index].permisos.visualizar;
        return permiso;
      });
      console.log(
        "🚀 ~ file: permisosComponents.tsx:339 ~ result ~ result:",
        result
      );

      setPermisos(result);
    }
  }, [value]);

  const handleChangeAndSubmit = (
    permisoId: string,
    permisoType: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let updatedPermisos: PermisoMobile[];

    if (item.transform) {
      updatedPermisos = permisos.map((permiso) =>
        permiso.id === permisoId
          ? {
              ...permiso,
              permisos: {
                ...permiso.permisos,
                [permisoType]: event.target.checked,
              },
            }
          : permiso
      );

      let obj = item.transform(updatedPermisos);

      onChange(obj);
    } else {
      updatedPermisos = permisos.map((permiso) =>
        permiso.id === permisoId
          ? {
              ...permiso,
              permisos: {
                ...permiso.permisos,
                [permisoType]: event.target.checked,
              },
            }
          : permiso
      );
      onChange(updatedPermisos);
    }
    setPermisos(updatedPermisos);
  };

  return (
    <>
      <FormLabel htmlFor={item.field}>Privilegios Aplicación Móvil</FormLabel>
      <div
        style={{
          borderWidth: "1px",
          borderColor: "",
          padding: "1px",
          borderRadius: "8px",
        }}
      >
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th style={{ width: "40%" }}></Th>
                {headers.map((item) => (
                  <Th style={{ fontSize: "10px", width: "25%" }}>{item}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {permisos.map((permiso) => (
                <Tr key={permiso.id}>
                  <Td style={{ width: "40%", fontSize: "12px" }}>
                    <Text fontSize="md">{permiso.displayName}</Text>
                    <Text fontSize="sm">{permiso.subTitulo}</Text>
                  </Td>
                  <Td style={{ width: "30%", textAlign: "center" }}>
                    <Checkbox
                      id={`${permiso.id}_admin`}
                      name={`${permiso.id}_admin`}
                      isChecked={permiso.permisos.crear}
                      onChange={(event) =>
                        handleChangeAndSubmit(permiso.id, "crear", event)
                      }
                      // colorScheme="orange"
                    />
                  </Td>
                  <Td style={{ width: "30%", textAlign: "center" }}>
                    <Checkbox
                      id={`${permiso.id}_visualizar`}
                      name={`${permiso.id}_visualizar`}
                      isChecked={permiso.permisos.validar}
                      onChange={(event) =>
                        handleChangeAndSubmit(permiso.id, "validar", event)
                      }
                      // colorScheme="orange"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default PermisosComponents;

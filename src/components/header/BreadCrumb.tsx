import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Skeleton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export interface ItemBreadcrumbProps {
  nombre: string;
  url: string;
  state?: object;
}

export interface BreadcrumbProps {
  rutas: ItemBreadcrumbProps[];
}

const BreadcrumbVaku: React.FC<BreadcrumbProps> = ({ rutas }) => {
  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      {rutas.map((ruta, index) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink
            href={ruta.url}
            color={index === rutas.length - 1 ? "celesteVaku.500" : ""}
            fontWeight={index === rutas.length - 1 ? "bold" : "normal"}
            isCurrentPage={index === rutas.length - 1}
            as={Link}
            to={ruta.url}
            replace
            state={ruta.state}
          >
            <Skeleton isLoaded={ruta.nombre !== "undefined"}>
              {ruta.nombre}
            </Skeleton>
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
export default BreadcrumbVaku;

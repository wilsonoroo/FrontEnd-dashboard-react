import { FormLabel } from "@chakra-ui/react";
import { ItemUser } from "./ItemUser";

type Props = {
  titulo: string;
  value: Value[] | Value;
};

type Value = {
  value: string;
  user: any;
};

const SelectUserCard = (props: Props) => {
  const { titulo, value, ...restProps } = props;

  return (
    <>
      <FormLabel htmlFor="nombre">{titulo}</FormLabel>
      {/* <>{JSON.stringify(values, null, 2)}</> */}

      {Array.isArray(value) ? (
        value.map((userItem, index) => {
          return (
            <ItemUser
              key={index}
              name={userItem.user.displayName}
              displayName={userItem.user.displayName}
              fotografia={{
                url: userItem.user.fotografia?.url,
              }}
              cargo={userItem.user.cargo}
            />
          );
        })
      ) : (
        <ItemUser
          name={value.user.displayName}
          displayName={value.user.displayName}
          fotografia={{
            url: value.user.fotografia?.url,
          }}
          cargo={"cargio"}
        />
      )}
    </>
  );
};

export default SelectUserCard;

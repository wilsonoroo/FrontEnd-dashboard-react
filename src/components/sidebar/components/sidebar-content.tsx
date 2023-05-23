import { Flex } from "@chakra-ui/react";

export const SidebarContent = (props: { routes: Menus[] }) => {
  const { routes } = props;

  return (
    <Flex flexDir="column" {...props}>
      {/* {routes.map(function (category, cid) {
        console.log(category);
        return (
          <chakra.div key={category.name} pt={cid === 0 ? 0 : 5}>
            <Text
              textTransform="uppercase"
              fontWeight="bold"
              fontSize="xs"
              mb="1"
            >
              {category.name}
            </Text>
            {category?.sections &&
              category.sections.map((section: any) => (
                <SidebarSection
                  section={section}
                  key={section.title}
                  route={category}
                />
              ))}
          </chakra.div>
        );
      })} */}
    </Flex>
  );
};

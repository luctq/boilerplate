import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  Link as ChakraLink,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { RiGithubFill, RiInstagramLine, RiLinkedinBoxFill, RiTwitterFill } from "react-icons/ri";
import { ChangeLanguage } from "../change-language/ChangeLanguage";
import { ChangeTheme } from "../change-theme/ChangeTheme";
import { Link } from "../link/Link";

const NewsletterSignup = () => {
  const { t } = useTranslation("common");
  const backgroundColor = useColorModeValue("white", "transparent");

  return (
    <Box>
      <Heading fontSize="md" mb={4}>
        {t("newsletter-heading")}
      </Heading>
      <Text mb={4}>{t("newsletter-subtitle")}</Text>
      <InputGroup display="flex" flexDirection={{ base: "column", md: "row" }}>
        <Input
          backgroundColor={backgroundColor}
          placeholder={t("newsletter-input-placeholder")}
          mb={{ base: 4, md: 0 }}
          maxW={{ base: "100%", md: "320px" }}
        />
        <Button w={{ md: "max-content" }} ml={{ base: 0, md: 4 }} colorScheme="primary">
          {t("newsletter-cta")}
        </Button>
      </InputGroup>
    </Box>
  );
};

type NavItem = {
  id: string;
  links: { href: string; id: string }[];
};

const FooterList = ({ navItem }: { navItem: NavItem }) => {
  const { t } = useTranslation("common");
  const hoverColor = useColorModeValue("primary.600", "primary.200");

  return (
    <Flex flexDirection="column">
      <Heading fontSize="md" mb={4}>
        {t(navItem.id)}
      </Heading>
      <List>
        {navItem.links.map(({ id, href }, index) => (
          <ListItem key={id} mb={index === navItem.links.length ? 0 : 2}>
            <Link href={href} fontWeight="normal" fontSize="sm" _hover={{ color: hoverColor }}>
              {t(id)}
            </Link>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};

const NAV_ITEMS: NavItem[] = [
  {
    id: "product",
    links: [
      { href: "/pricing", id: "pricing" },
      { href: "/#", id: "features" },
    ],
  },
  {
    id: "company",
    links: [
      { href: "/about", id: "about" },
      { href: "/contact", id: "contact" },
    ],
  },
  {
    id: "resources",
    links: [
      { href: "/blog", id: "blog" },
      { href: "/faq", id: "faq" },
    ],
  },
];

/* eslint-disable-next-line */
export interface FooterProps {}

export function Footer(props: FooterProps) {
  const { t } = useTranslation("common");
  const backgroundColor = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box as="footer" backgroundColor={backgroundColor} borderTop="1px solid" borderTopColor={borderColor} {...props}>
      <Grid
        templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
        px={{ base: 4, lg: 8 }}
        py={8}
        maxW="container.xl"
        m="0 auto"
        gap={{ base: 6, lg: 12 }}
      >
        <Grid
          templateColumns={{
            base: "repeat(2, max-content)",
            md: "repeat(3, max-content)",
          }}
          gap={{ base: 6, lg: 12 }}
        >
          {NAV_ITEMS.map((navItem, index) => {
            return <FooterList key={index} navItem={navItem} />;
          })}
        </Grid>
        <NewsletterSignup />
      </Grid>
      <Divider />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        maxW="container.xl"
        m="0 auto"
        px={{ base: 4, lg: 8 }}
        py={8}
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(5, max-content)" }}
          gap={{ base: 4, lg: 6 }}
          mb={{ base: 6, lg: 0 }}
          alignSelf="flex-start"
          alignItems="baseline"
        >
          <Text fontSize="sm">&copy; 2021 {`${process.env.NEXT_PUBLIC_BRAND_NAME}`}</Text>
          <Link href="/privacy" fontSize="sm" fontWeight="normal">
            {t("privacy")}
          </Link>
          <Link href="/terms-and-conditions" fontSize="sm" fontWeight="normal">
            {t("terms-and-conditions")}
          </Link>
          <ChangeTheme />
          <ChangeLanguage />
        </Grid>
        <HStack spacing={4}>
          <ChakraLink aria-label="GitHub" variant="link" href="https://github.com/amosbastian/frontend" isExternal>
            <Icon boxSize={4} as={RiGithubFill} />
          </ChakraLink>
          <ChakraLink aria-label="Twitter" variant="link" href="https://twitter.com/amosbastian" isExternal>
            <Icon boxSize={4} as={RiTwitterFill} />
          </ChakraLink>
          <ChakraLink aria-label="Instagram" variant="link" href="https://www.instagram.com/amosbastian" isExternal>
            <Icon boxSize={4} as={RiInstagramLine} />
          </ChakraLink>
          <ChakraLink aria-label="GitHub" variant="link" href="https://linkedin.com/in/amosbastian" isExternal>
            <Icon boxSize={4} as={RiLinkedinBoxFill} />
          </ChakraLink>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Footer;

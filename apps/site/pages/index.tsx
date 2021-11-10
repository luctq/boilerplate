import { ButtonLink, getLayout, Section } from "@boilerplate/shared/ui";
import { ory } from "@boilerplate/shared/utility/ory";
import { CtaCard, Features, GradientButton, Hero, ImageSection, Testimonials } from "@boilerplate/site/ui";
import { Box, Button, Heading, Icon, useColorModeValue } from "@chakra-ui/react";
import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/client";
import { NextSeo } from "next-seo";
import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import NextImage from "next/image";
import NextLink from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import * as React from "react";
import { useRouter } from "next/router";
import { useCreateLogoutHandler } from "@boilerplate/site/utility";

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//   const session = await getSession(context);

//   if (session) {
//     return {
//       redirect: {
//         destination: "/home",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export default function Index() {
  const { t } = useTranslation("index");
  const py = { base: 20, lg: 44 };
  const cardBackgroundColor = useColorModeValue("primary.100", "primary.500");
  const router = useRouter();

  const onLogout = useCreateLogoutHandler();

  React.useEffect(() => {
    const fetchX = async () => {
      try {
        const { data } = await ory.toSession();
        console.log("data: ", data);
      } catch (error) {
        switch (error.response?.status) {
          case 403:
            // This is a legacy error code thrown. See code 422 for
            // more details.
            break;
          case 422:
            // This status code is returned when we are trying to
            // validate a session which has not yet completed
            // it's second factor
            return router.push("/login?aal=aal2");
            break;
          case 401:
            // do nothing, the user is not logged in
            return;
        }

        // Something else happened!
        return Promise.reject(error);
      }
    };

    fetchX();
  }, []);

  return (
    <>
      <NextSeo title={t("meta-title")} description={t("meta-description")} />
      <Hero
        title={t("hero-heading")}
        subtitle={t("hero-subtitle")}
        cta={
          <NextLink href="/login" passHref>
            <GradientButton as="a" size="lg" rightIcon={<Icon as={RiArrowRightLine} />}>
              {t("hero-cta")}
            </GradientButton>
          </NextLink>
        }
        image={
          <NextImage src="http://placekitten.com/g/900/500" alt={t("hero-image-alt-text")} width={900} height={500} />
        }
      />
      <Button onClick={onLogout}>Logout</Button>
      <Features title={t("features-section-heading")} subtitle={t("features-section-subtitle")} py={py} />
      <ImageSection
        variant="transparent"
        py={py}
        heading={
          <Heading fontSize={{ base: "3xl", md: "5xl" }} mb={{ base: 4, md: 10 }}>
            {t("image-section-1-heading")}
          </Heading>
        }
        subtitle={
          <Heading as="h3" fontSize={{ base: "md", md: "xl" }} variant="secondary">
            <Trans
              i18nKey="index:image-section-1-subtitle"
              components={[<Box key={0} mb={6} as="p" />, <Box key={1} as="p" />]}
            />
          </Heading>
        }
        imageProps={{
          src: "http://placekitten.com/g/1100/600",
          alt: "",
          width: { base: "100%", md: 1100 },
          height: { base: "320", md: 600 },
        }}
        imageLocation="right"
      />
      <ImageSection
        py={py}
        heading={
          <Heading fontSize={{ base: "3xl", md: "5xl" }} mb={{ base: 4, md: 10 }}>
            {t("image-section-2-heading")}
          </Heading>
        }
        subtitle={
          <Heading as="h3" fontSize={{ base: "md", md: "xl" }} variant="secondary">
            <Trans
              i18nKey="index:image-section-2-subtitle"
              components={[<Box key={0} mb={6} as="p" />, <Box key={1} as="p" />]}
            />
          </Heading>
        }
        imageProps={{
          src: "http://placekitten.com/g/1100/600",
          alt: "",
          width: { base: "100%", md: 1100 },
          height: { base: "320", md: 600 },
        }}
        imageLocation="left"
      />
      <ImageSection
        variant="transparent"
        py={py}
        heading={
          <Heading fontSize={{ base: "3xl", md: "5xl" }} mb={4}>
            {t("image-section-3-heading")}
          </Heading>
        }
        subtitle={
          <Heading as="h3" fontSize={{ base: "md", md: "xl" }} variant="secondary">
            <Trans
              i18nKey="index:image-section-3-subtitle"
              components={[<Box key={0} mb={6} as="p" />, <Box key={1} as="p" />]}
            />
          </Heading>
        }
        imageProps={{
          src: "http://placekitten.com/g/1100/600",
          alt: "",
          width: { base: "100%", md: 1100 },
          height: { base: "320", md: 600 },
        }}
        imageLocation="center"
      />
      <Testimonials py={py} />
      <Section variant="transparent" py={py}>
        <CtaCard backgroundColor={cardBackgroundColor} heading={t("cta-heading")} subtitle={t("cta-subtitle")}>
          <ButtonLink href="/login" colorScheme="primary">
            {t("cta-button-text")}
          </ButtonLink>
        </CtaCard>
      </Section>
    </>
  );
}

Index.getLayout = getLayout;

import * as React from "react";
import {
  Text,
  Section,
  Heading,
  Html,
  Container,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface EmailTemplateProps {
  name: string;
}

const emailTailwindConfig = {
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#244C63",
        },
      },
    },
  },
};

export const ConfirmationEmailTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ name }) => (
  <Html>
    <Tailwind config={emailTailwindConfig}>
      <Heading as="h1">We&apos;ve received your message</Heading>
      <Section>
        <Container className="mx-auto max-w-xl">
          <Text className="m-0! mt-2">Dear {name},</Text>
          <Text className="m-0! mb-2">To do add copy</Text>
        </Container>
      </Section>
    </Tailwind>
  </Html>
);

export default ConfirmationEmailTemplate;

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
        <Text className="m-0! mt-2">Dear {name},</Text>
        <br />
        <Text className="m-0! mb-2">
          Thanks for reaching out — I&apos;ve received your message.
        </Text>
        <Text className="m-0! mb-2">
          I&apos;ll get back to you within 24 hours. If you don&apos;t see a
          reply, please check your spam or junk folder.
        </Text>
        <br />
        <Text className="m-0! mb-2">
          This is an automated email, so replies are not monitored.
        </Text>
        <br />
        <Text className="m-0!">Best,</Text>
        <Text className="m-0!">BV</Text>
      </Section>
    </Tailwind>
  </Html>
);

export default ConfirmationEmailTemplate;

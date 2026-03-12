import * as React from "react";
import { Text, Section, Heading, Container, Hr } from "@react-email/components";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <Section>
    <Container>
      <Heading as="h1">New message form website</Heading>
      <Text>A new inquiry has been received via the contact form.</Text>
      <Hr />
      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
      <Text>Message:</Text>
      <Text>{message}</Text>
      <Hr />
      <Text>This message was automatically sent from the contact form.</Text>
    </Container>
  </Section>
);

export default EmailTemplate;

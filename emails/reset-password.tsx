import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
  Img,
  Link,
  Tailwind,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  resetUrl: string;
  destinyUser: string;
  forgotPasswordUrl: string;
}

export default function ResetPasswordEmail({
  destinyUser,
  resetUrl,
  forgotPasswordUrl,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your Venshare password</Preview>
      <Tailwind>
        <Body className="bg-white font-sans text-gray-900">
          <Container className="mx-auto my-10 max-w-lg">
            <Section className="text-center mb-6">
              <Img
                src="https://lh3.googleusercontent.com/a/ACg8ocLyKbdtZD4kcJgpt7SbEkc9pFR-AyU0vyjJQD49pmxQY-HktlHi=s288-c-no"
                width="32"
                height="32"
                alt="Venshare Logo"
                className="mx-auto rounded-full"
              />
              <Text className="text-2xl font-normal text-gray-800 mt-4 mb-0">
                Reset your Venshare password
              </Text>
            </Section>
            <Section className="border border-gray-200 rounded-md p-6">
              <Text className="text-lg font-semibold text-gray-900 mt-0 mb-4 text-center">
                Venshare password configuration
              </Text>
              <Text className="text-sm text-gray-700 leading-relaxed">
                Hello {destinyUser}, we heard that you lost your Venshare
                password. Sorry about that!
              </Text>
              <Text className="text-sm text-gray-700 leading-relaxed mb-6">
                But don&apos;t worry! You can use the following button to reset
                your password:
              </Text>
              <Section className="text-center mb-6">
                <Button
                  href={resetUrl}
                  className="bg-[#2da44e] text-white text-sm font-semibold py-2 px-4 rounded-md no-underline"
                >
                  Reset your password
                </Button>
              </Section>
              <Text className="text-sm text-gray-700 leading-relaxed">
                If you don&apos;t use this link within 1 hour, it will expire.{" "}
                <Link
                  href={forgotPasswordUrl}
                  className="text-blue-600 underline"
                >
                  Click here to get a new password reset link
                </Link>
                .
              </Text>
              <Text className="text-sm text-gray-700 leading-relaxed mt-6 mb-0">
                Thanks,
                <br />
                The Venshare Team
              </Text>
            </Section>
            <Section className="text-center mt-8">
              <Text className="text-xs text-gray-500 mb-2">
                You&apos;re receiving this email because a password reset was
                requested for your account.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

ResetPasswordEmail.defaultProps = {
  destinyUser: "venshare support :)",
  resetUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=example`,
  forgotPasswordUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/forgot-password`,
};

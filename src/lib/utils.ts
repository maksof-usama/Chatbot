export function validateEmail(email: string) {
  return !!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
}

export const preDefinedMessages = [
  `Welcome to Medwiki! Your go-to destination for all your medicine information needs. To being process, please type your email address.`,
  `Sorry, the entered email is incorrect. Please pass a valid email address.`,
  `Please check your email and enter the verification code below to verify your email address.`,
  `Sorry, you have used all of your credits. Please purchase membership in order to continue using the service.`,
  `Thank you for your email verification, Ask me anything about medications, healthcare, or any medical topic you"re curious about.`,
  `Thank you for using Medwiki! We hope, we were able to provide you with the information you were seeking. We value your feedback to improve our services. Please take a moment to share your thoughts and suggestions about Medwiki.\n To ask a question again `,
]
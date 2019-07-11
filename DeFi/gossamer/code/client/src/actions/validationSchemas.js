import * as Yup from 'yup';

const schemas = {
  signup: () => (
    Yup.object().shape({
      email: Yup.string()
        .email('Your email needs to be a real email!')
        .required('An email is required.')
        .trim(),
      name: Yup.string()
        .min(2, 'Please put a name longer than 1 character.')
        .max(30, 'Please put your first name only, limited to 30 characters.')
        .required('A first name is required.'),
      password: Yup.string()
        .min(8, 'Please pick a password with 8 or more characters.')
        .required('A password is required.'),
    })
  ),
  login: () => (
    Yup.object().shape({
      email: Yup.string()
        .email('Your email needs to be a real email!')
        .required('An email is required to log in.')
        .trim(),
      password: Yup.string()
        .min(8, 'Your password is below the minimum password length.')
        .required('A password is required to log in.'),
    })
  ),
  ethereumAddress: () => (
    Yup.object().shape({
      userAddress: Yup.string()
        .min(42, "You don't have enough characters in your Ethereum address. Try copy/pasting again.")
        .max(42, 'You have too many characters in your Ethereum address. Try copy/pasting again.')
        .required('You must specify a working Ethereum address to withdraw funds to.'),
    })
  ),
  supply: token => (
    Yup.object().shape({
      supplyAmount: Yup.number()
        .typeError(`You can only deposit numerical amounts of ${token}!`)
        .positive(`You have to deposit at least 1 ${token}.`)
        .min(1, `You have to deposit at least 1 ${token}.`)
        .max(100000, `Apologies, high roller - we don't yet support deposits of more than 100,000 ${token}. Please contact us via customer support chat, and we can help with your larger deposit.`)
        .required(`You must enter an amount of ${token} to deposit.`),
    })
  ),
  // Need to fix this logic. Ideally disable inputs between 0.000001 - 1 token but force the sum of the two fields to be > 1
  withdraw: (token, amountOfPrincipalAvailable, amountOfInterestAvailable, principalToWithdraw, interestToWithdraw) => (
    Yup.object().shape({
      transactionAmountToPrincipal: Yup.number()
        .typeError('You can only withdraw numbers from your principal amount! Go back and adjust your amount.')
        .min(-0.0000001, "As much as we would appreciate you giving us money, you can't withdraw negative numbers from your principal. Please go back and adjust your amount.")
        .max(amountOfPrincipalAvailable, "Don't get greedy! You can only withdraw as much as you actually have in your principal. Go back and adjust your amount.")
        .required(`You must enter an amount of ${token} to withdraw from the 'WITHDRAW FROM YOUR DEPOSITS' field. The amount can even be 0.`),
      transactionAmountToInterest: Yup.number()
        .typeError('You can only withdraw numbers from your interest! Go back and adjust your amount.')
        .min(-0.0000001, "As much as we would appreciate you giving us money, you can't withdraw negative numbers from your interest. Please go back and adjust your amount.")
        .max(amountOfInterestAvailable, "Don't get greedy! You can only withdraw as much as you actually have in your interest. Go back and adjust your amount.")
        .test('sum', `Your total withdrawal needs to add up to at least 1 ${token}. Please add more to either field.`,
          () => (principalToWithdraw + interestToWithdraw) >= 1)
        .required(`You must enter an amount of ${token} to withdraw from the 'WITHDRAW FROM YOUR EARNED INTEREST' field. The amount can even be 0.`),
    })
  ),
};

export default schemas;

/*

       .min(0, `You have to withdraw more than 0 ${token} from your principal amount! Go back and adjust your amount.`)
.positive('As much as we would appreciate you giving us money, you can only withdraw a positive number from your interest. Please go back and adjust your amount.')
       */

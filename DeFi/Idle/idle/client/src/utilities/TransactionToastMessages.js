const TransactionToastMessages = {
    initialized: {
      message: "Lending request submitted",
      secondaryMessage: "Confirm with your wallet provider",
      actionHref: "",
      actionText: "",
      variant: "default",
      icon: "InfoOutline"
    },
    started: {
      message: "Lending request submitted",
      secondaryMessage: "Confirm with your wallet provider",
      actionHref: "",
      actionText: "",
      variant: "default",
      icon: "InfoOutline"
    },
    pending: {
      message: "Processing lending request...",
      secondaryMessage: "This may take a few minutes",
      actionHref: "",
      actionText: "",
      variant: "processing",
      icon: "InfoOutline"
    },
    confirmed: {
      message: "First block confirmed",
      secondaryMessage: "Your lending request is in progress",
      actionHref: "",
      actionText: "",
      variant: "processing",
      icon: 'CheckCircle'
    },
    success: {
      message: "Lending request completed",
      variant: "success",
      icon: 'CheckCircle'
    },
    error: {
      message: "Lending request failed",
      secondaryMessage: "Could not complete transaction.",
      actionHref: "",
      actionText: "",
      variant: "failure",
      icon: "Block"
    }
  };

  export default TransactionToastMessages;

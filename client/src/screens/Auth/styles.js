export default {
  container: {
    height: '100%',
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  inputsContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  buttonContainer: {
    flex: 0.1,
    width: "80%",
    borderWidth: 1,
    borderColor: "white",
  },
  buttonText: {
    width: "100%",
    color: "white",
    textAlign: "center",
    fontSize: 20
  },
  emailInputWrapper: {
    width: '100%'
  },
  emailInput: {
    borderBottomWidth: 0.5,
    color: "white",
  },
  passwordInputWrapper: {
    width: '100%'
  },
  passwordInput: {
    borderBottomWidth: 0.5,
    color: "white"
  },
  registrationOfferPanelContainer: {
    flex: 0.15,
    flexDirection: "row",
    alignItems: "center"
  },
  registrationOfferPanelText: {
    color: "white",
    fontSize: 16
  },
  registrationOfferPanelButtonContainer: {
    flex: 0,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  registrationOfferPanelButtonText: {
    color: "white",
    fontSize: 16
  },
  errorsMessagesContainer: {
    flex: 0.6,
  },
  errorMessageText: {
    color: "red",
    fontSize: 16
  }
}
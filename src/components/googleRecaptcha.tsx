import Script from "next/script"; // Defining a script of own.

const GoogleRecaptcha = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: 'black',
        }}
        className="g-recaptcha"
        data-sitekey="FakeSiteKey"
      >
        This is the recaptcha script.
      </div>
      {
        // Using a foreign script and importing it like this.
      }
      <Script src="https://www.google.com/recaptcha/api.js" />
    </>
  );
};

export default GoogleRecaptcha;

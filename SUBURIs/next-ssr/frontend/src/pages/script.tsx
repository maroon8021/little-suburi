import Script from "next/script";

const script = `
  const checkVersion = async () => {
    const versionOnHtml = "${process.env.NEXT_PUBLIC_BUILD_ID}+a"
    const versionFromApi = await fetch("/api/version").then((res) => res.json())
    
    console.log("versionOnHtml", versionOnHtml)
    console.log("versionFromApi", versionFromApi)
    
    if (versionOnHtml !== versionFromApi.version) {
      console.error("version mismatch")
      if(window.confirm("Version mismatch. Do you want to reload the page?")) {
        window.location.reload()
      }
    }
  }

  checkVersion()
  
`;

const Page = () => {
  return (
    <>
      <Script id="my-script">{`console.log('Hello world!');`}</Script>
      <Script
        id="show-console"
        dangerouslySetInnerHTML={{
          __html: `console.log('Hello world! by dangerouslySetInnerHTML');`,
        }}
      />
      <Script id="version-check" strategy="beforeInteractive">
        {script}
      </Script>
      <h1>Script</h1>
    </>
  );
};

export default Page;

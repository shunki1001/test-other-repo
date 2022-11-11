import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const MetaTag = (props) => {
  const { account, sns } = props;

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname === "/myalarm");
  }, [location]);
  return (
    <>
      {sns ? (
        <Helmet
          meta={[
            {
              name: "twitter:title",
              content: `${account.company} ${account.username}が商談受付中です。|日程調整不要、インサイドセールスを効率化。`,
            },
            {
              name: "twitter:image",
              content: `${account.thumbnail}`,
            },
          ]}
        />
      ) : location.pathname === "/myalarm" ? (
        <Helmet>
          <script type="application/javascript">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P8G6QPG');`}
          </script>
        </Helmet>
      ) : (
        <Helmet
          meta={[
            {
              name: "twitter:title",
              content:
                "ノンアポ商談システム|インサイドセールスを効率化。「ノンアポ」ならその場で訪問商談が可能です。",
            },
            {
              name: "twitter:image",
              content: "https://non-appoint.com/assets/img/oggg.png",
            },
          ]}
        />
      )}
    </>
  );
};

export default MetaTag;

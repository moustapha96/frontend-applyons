import { Helmet } from "react-helmet-async";

const PageMetaData = ({ title }) => {
  return (
    <Helmet>
      <title>
        {title} | ApplyOns
      </title>
    </Helmet>
  );
};

export default PageMetaData;

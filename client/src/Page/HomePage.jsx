import { Fragment } from "react";

import CategoriesList from "../Component/CategoriesList";
import TrendingList from "../Component/TrendingList";
import OtherInformation from "../Component/OtherInformation";
import HomeBanner from "../Component/HomeBanner";

export default function HomePage()
{

  return (
    <Fragment>
      <HomeBanner></HomeBanner>
      <CategoriesList></CategoriesList>
      <TrendingList></TrendingList>
      <OtherInformation></OtherInformation>
    </Fragment>
  );
}

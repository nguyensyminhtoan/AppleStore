import { Fragment } from "react";
import ShopBanner from "../Component/ShopBanner";

import ShopContent from "../Component/ShopContent";

export default function ShopPage() {
  return (
    <Fragment>
      <ShopBanner></ShopBanner>
      <ShopContent></ShopContent>
    </Fragment>
  );
}

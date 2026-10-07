import "./putalert-home.css";

import { PutalertHomePage } from "@/components/putalert/PutalertHomePage";
import { getAndroidStoreUrl } from "@/lib/putalert/config";
import { createPutalertHomeMetadata } from "@/lib/putalert/homeMetadata";

export const metadata = createPutalertHomeMetadata();

export default function HomePage() {
  const androidStoreUrl = getAndroidStoreUrl();

  return <PutalertHomePage androidStoreUrl={androidStoreUrl} />;
}

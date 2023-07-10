import {createClient} from "@sanity/client";
import imageBuilder from "@sanity/image-url";
import "react-native-url-polyfill/auto";

const client = createClient({
  projectId: "w9xp376c",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});

const builder = imageBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;

import Head from "next/head";
import { HOME_OG_IMAGE_URL } from "../../lib/constants";

interface MetaProps {
  title?: string;
  description?: string;
  OGImage?: string;
  type?: string;
  isCatalogPage?: boolean;
  link?: string;
}

export const Meta = ({
  title,
  description,
  OGImage,
  isCatalogPage,
  link,
}: MetaProps) => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />

      <title>{title ? `Dikor | ${title}` : "Dikor"}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={title ?? "Dikor"} />
      <meta property="og:image" content={OGImage ?? HOME_OG_IMAGE_URL} />
      <meta property="og:type" content="website" />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:site_name" content="Dikor" />
      {isCatalogPage ? (
        <script type="application/ld+json">
          {`{
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "${title}",
        "url": "${link}",
        "description": "${description}",
        "image": "${OGImage}"
        }`}
        </script>
      ) : (
        ""
      )}
    </Head>
  );
};

export const SchemaMainPage = () => {
  return (
    <Head>
      <script type="application/ld+json">
        {`{
        "@context": "https://schema.org/",
        "@type": "Organization",
        "name": "Dikor",
        "url": "https://www.dikor3d.com",
        "logo": "https://www.dikor3d.com/favicon/favicon-32x32.png",
        "telephone": [
          "+ 373 (767) 409 95",
          "+ 40 (745) 472 526"
        ]
        }`}
      </script>
    </Head>
  );
};

export const SchemaCatalogPage = ({
  name,
  link,
  desc,
  image,
}: {
  name: string;
  link: string;
  desc: string;
  image: string;
}) => {
  return (
    <Head>
      <script type="application/ld+json">
        {`{
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "${name}",
        "url": "${link}",
        "description": "${desc}",
        "image": "${image}"
        }`}
      </script>
    </Head>
  );
};

interface SchemaProductProps {
  name: string;
  desc: string;
  currency: string;
  price: string;
  slug: string;
  images: string[];
  catalog: string;
}

export const SchemaProduct = ({
  name,
  desc,
  currency,
  price,
  slug,
  images,
  catalog,
}: SchemaProductProps) => {
  return (
    <Head>
      <script type="application/ld+json">
        {`{
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "${name}",
        "image": [
          ${images.map((img) => `"${img}"`)}
        ],
        "description": "${desc}",
        "offers": {
          "@type": "Offer",
          "url": "https://www.dikor3d.com/${catalog}/${slug}",
          "priceCurrency": "${currency}",
          "price": "${price}",
          "seller": {
            "@type": "Organization",
            "name": "Dikor"
          }
        }
        }`}
      </script>
    </Head>
  );
};

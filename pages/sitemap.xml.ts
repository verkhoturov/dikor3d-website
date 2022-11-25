function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>https://www.dikor3d.com</loc>
       </url>
       <url>
         <loc>https://www.dikor3d.com/catalog-premium</loc>
       </url>
       <url>
         <loc>https://www.dikor3d.com/catalog-shine</loc>
       </url>
       <url>
         <loc>https://www.dikor3d.com/catalog-platinum</loc>
       </url>
       <url>
         <loc>https://www.dikor3d.com/catalog-classic</loc>
       </url>
       <url>
         <loc>https://www.dikor3d.com/ru</loc>
       </url>
       <url>
         <loc>https://www.dikor3d.com/ru/catalog-premium</loc>
       </url>
       <url>
         <loc>https://www.dikor3d.com/ru/catalog-shine</loc>
       </url>
       <url>
         <loc>https://www.dikor3d.com/ru/catalog-platinum</loc>
       </url>
       <url>
         <loc>https://www.dikor3d.com/ru/catalog-classic</loc>
       </url>
       <url>
         <loc>https://www.dikor3d.com/en</loc>
       </url>
       <url>
         <loc>https://www.dikor3d.com/en/catalog-premium</loc>
       </url>
       <url>
         <loc>https://www.dikor3d.com/en/catalog-shine</loc>
       </url>
       <url>
         <loc>https://www.dikor3d.com/en/catalog-platinum</loc>
       </url>
       <url>
         <loc>https://www.dikor3d.com/en/catalog-classic</loc>
       </url>
     </urlset>
   `;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;

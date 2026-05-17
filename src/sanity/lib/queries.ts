import { defineQuery } from "groq";

// ───── Posts ───────────────────────────────────────────────────────────────

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    body,
    publishedAt,
    mainImage{ asset, alt },
    "author": author->{
      name,
      "slug": slug.current,
      image
    },
    "categories": categories[]->{
      title,
      "slug": slug.current
    }
  }
`);

export const POSTS_INDEX_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    title,
    "slug": slug.current,
    publishedAt,
    mainImage{ asset, alt }
  }
`);

// ───── Categories ──────────────────────────────────────────────────────────

export const CATEGORY_SLUGS_QUERY = defineQuery(`
  *[_type == "category" && defined(slug.current)]{
    "slug": slug.current
  }
`);

export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0]{
    title,
    description,
    "slug": slug.current,
    "posts": *[_type == "post" && references(^._id) && defined(slug.current)]
      | order(publishedAt desc){
      title,
      "slug": slug.current,
      publishedAt,
      mainImage{ asset, alt }
    }
  }
`);

// ───── Authors ─────────────────────────────────────────────────────────────

export const AUTHOR_SLUGS_QUERY = defineQuery(`
  *[_type == "author" && defined(slug.current)]{ "slug": slug.current }
`);

export const AUTHOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "author" && slug.current == $slug][0]{
    name,
    "slug": slug.current,
    image,
    bio,
    "posts": *[_type == "post" && references(^._id) && defined(slug.current)]
      | order(publishedAt desc){
      title,
      "slug": slug.current,
      publishedAt,
      mainImage{ asset, alt }
    }
  }
`);

// ───── Pages ───────────────────────────────────────────────────────────────

export const PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  }
`);

export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    body,
    seoDescription,
    "slug": slug.current,
    ogImage
  }
`);

// ───── Site Settings + Footer + Landing ────────────────────────────────────

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    title,
    description,
    siteUrl,
    ogImage,
    "primaryNav": primaryNav->{
      items[]{
        label,
        href,
        "internalRef": internalRef->{ _type, "slug": slug.current }
      }
    }
  }
`);

export const FOOTER_QUERY = defineQuery(`
  *[_type == "footer"][0]{
    instagramURL,
    cellNumber,
    email,
    address,
    copyright
  }
`);

export const LANDING_QUERY = defineQuery(`
  *[_type == "landing"][0]{
    title,
    landingImage{ asset, alt },
    image{ asset, alt },
    ctaText,
    ctaBtnText
  }
`);

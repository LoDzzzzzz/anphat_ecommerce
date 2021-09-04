export function getStrapiURL(path = "") {
    return `${
      process.env.STRAPI_API_URL || "http://localhost:1337"
    }${path}`;
  }

export default async function strapiClient(path) {

        const requestUrl = getStrapiURL(path)
        const response = await fetch(requestUrl)
        const data = await response.json()

        return data
    }



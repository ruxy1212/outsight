const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getRandomData(
  onProgress?: (step: number) => void,
) {
  onProgress?.(0);
  const countryRes = await fetch(
    "https://restcountries.com/v3.1/all?fields=name",
  );
  if (!countryRes.ok) {
    throw new Error("Failed to fetch countries");
  }

  await delay(1600);
  onProgress?.(1);
  const quoteRes = await fetch("https://dummyjson.com/quotes/random");
  if (!quoteRes.ok) {
    throw new Error("Failed to fetch quote");
  }

  await delay(2000);
  onProgress?.(2);
  const factRes = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");
  if (!factRes.ok) {
    throw new Error("Failed to fetch fact");
  }

  await delay(1500);

  const countries = await countryRes.json();
  const quoteData = await quoteRes.json();
  const factData = await factRes.json();

  const randomCountry =
    countries[Math.floor(Math.random() * countries.length)];

  return {
    country: randomCountry.name.common,
    quote: quoteData.quote,
    fact: factData.text,
  };
}
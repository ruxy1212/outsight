import { getRandomData } from "./helper";

export async function judgeUser(
  onProgress?: (step: number) => void,
) {
  const data = await getRandomData(onProgress);

  const insults = [
    `You got ${data.country}. That explains everything.`,
    `People in ${data.country} would NOT approve of this.`,
    `Statistically speaking, you're questionable at best.`,
  ];

  const pre = [
    "But then, a wise man once said,",
    "But then, as the saying goes,",
    "But then, it’s often said that",
    "But then, legend has it,",
    "But then, someone once put it this way:",
    "But then, in the words of the greats,",
    "But then, there’s an old saying:",
    "But then, as one philosopher put it,",
    "But then, it has long been believed that",
    "But then, they say,",
  ]

  const insult =
    insults[Math.floor(Math.random() * insults.length)];
  const prefix = pre[Math.floor(Math.random() * pre.length)];

  return {
    message: `${insult} ${prefix} “${data.quote}”\n So fun fact: ${data.fact}`,
  };
}
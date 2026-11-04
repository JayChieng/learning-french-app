import fs from "node:fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath =
  process.env.FIREBASE_SERVICE_ACCOUNT ||
  path.resolve(__dirname, "../../serviceAccountKey.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error(`Missing Firebase service account file: ${serviceAccountPath}`);
  console.error(
    "Create a service account key from Firebase Console and set FIREBASE_SERVICE_ACCOUNT or place it at the project root as serviceAccountKey.json."
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const lesson = {
  title: "Lesson 43: Shopping, Prices and Everyday Transactions",
  category: "Shopping",
  content:
    "Learn how to ask prices, find clothes and sizes, describe quantities, and pay in a shop. Estimated study time: 40–50 minutes.",
  order: 43,
};

const lessonDetail = {
  lessonId: "lesson-43",
  summary:
    "Practise essential shopping vocabulary and a complete shop conversation, from asking about sizes and prices to choosing an item and paying by card.",
  dialogues: [
    {
      id: "lesson-43-dialogue-1",
      title: "Buying clothes in a shop",
      lines: [
        { speaker: "Vendeur", french: "Bonjour ! Vous cherchez quelque chose ?", english: "Hello! Are you looking for something?" },
        { speaker: "Client", french: "Oui, je cherche un pantalon.", english: "Yes, I’m looking for a pair of trousers." },
        { speaker: "Client", french: "Vous avez ces chaussures en taille 38 ?", english: "Do you have these shoes in size 38?" },
        { speaker: "Vendeur", french: "Oui, voici la taille 38.", english: "Yes, here is size 38." },
        { speaker: "Client", french: "Combien coûte ce pantalon ?", english: "How much do these trousers cost?" },
        { speaker: "Vendeur", french: "Il coûte quarante-cinq euros.", english: "They cost forty-five euros." },
        { speaker: "Client", french: "C’est un peu cher. Vous avez un sac moins cher ?", english: "That’s a little expensive. Do you have a less expensive bag?" },
        { speaker: "Vendeur", french: "Oui, ce sac est bon marché. Il coûte vingt euros.", english: "Yes, this bag is inexpensive. It costs twenty euros." },
        { speaker: "Client", french: "Je le prends. Je paie par carte.", english: "I’ll take it. I’m paying by card." },
        { speaker: "Vendeur", french: "Très bien. Le magasin est ouvert jusqu’à dix-neuf heures.", english: "Very good. The shop is open until seven p.m." },
      ],
    },
  ],
  explanations: [
    {
      id: "lesson-43-explanation-1",
      title: "Ask about prices and sizes",
      body:
        "Ask Combien coûte… ? /kɔ̃.bjɛ̃ kut/ to find out how much one item costs: Combien coûte ce pantalon ? (How much do these trousers cost?). For several items, use Combien coûtent… ? Ask Vous avez cette taille ? (Do you have this size?) or Vous avez ces chaussures en taille 38 ? (Do you have these shoes in size 38?).",
    },
    {
      id: "lesson-43-explanation-2",
      title: "Describe prices and quantities",
      body:
        "Cher /ʃɛʁ/ means expensive and bon marché /bɔ̃ maʁ.ʃe/ means inexpensive. Use un peu (a little) and beaucoup (a lot) to describe quantities: C’est un peu cher (It’s a little expensive). Use moins cher /mwɛ̃ ʃɛʁ/ for less expensive.",
    },
    {
      id: "lesson-43-explanation-3",
      title: "Pay in a shop",
      body:
        "Je le prends means “I’ll take it.” Pay by card with Je paie par carte and in cash with Je paie en espèces. Un magasin /œ̃ ma.ɡa.zɛ̃/ means a shop; ouvert /u.vɛʁ/ means open and fermé /fɛʁ.me/ means closed.",
    },
  ],
};

const words = [
  {
    id: "vocab-411",
    french: "un vêtement",
    ipa: "/œ̃ vɛt.mɑ̃/",
    english: "clothing",
    order: 401,
    imageUrl:
      "https://images.openai.com/static-rsc-4/hMA4GTUwaz4lY-vHEKAqVMUUzk6RFTXbfA02jkQPSokr9i0k6xn5YdUbuo0hTETnVU0l5O63Ma189e6Laus3wDWWGkE00LHkeMAMlerNTa20A3yPrbcUru2_WQwF0lPprebaDtMcxquLCWina3axLc26qKhOJYOMo1SIquIBRb4?purpose=inline",
  },
  {
    id: "vocab-412",
    french: "un pantalon",
    ipa: "/œ̃ pã.ta.lɔ̃/",
    english: "trousers / pants",
    order: 402,
    imageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Trousers-colourisolated.jpg/960px-Trousers-colourisolated.jpg",
    imageAttribution: "Ed Yourdon; derivative by Themightyquill (CC BY-SA 2.0)",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Trousers-colourisolated.jpg",
  },
  {
    id: "vocab-413",
    french: "des chaussures",
    ipa: "/de ʃo.syʁ/",
    english: "shoes",
    order: 403,
    imageUrl:
      "https://images.openai.com/static-rsc-4/ID8FzBZvnji1NYwGBh1f8-wyqx9nMIR5mh0-2LzO7GTXZSeOxk1mG0lpQ0KHd8QENtTteFXLHraX2Sz6eMX5ij7TV6mJAWwUlBTNEmFdWutddUANGWxo-9QHdGHvCcwJ9pnYMkWjm1NojlFVb9rq1DEbV7R5OD2PjQ8K3Zl6ULE?purpose=inline",
  },
  {
    id: "vocab-414",
    french: "une taille",
    ipa: "/yn taj/",
    english: "a size",
    order: 404,
    imageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Metka_od_biustonosza_z_widocznym_rozmiarem_w_systemie_europejskim.png/960px-Metka_od_biustonosza_z_widocznym_rozmiarem_w_systemie_europejskim.png",
    imageAttribution: "Lisenka92 (CC BY-SA 4.0)",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Metka_od_biustonosza_z_widocznym_rozmiarem_w_systemie_europejskim.png",
  },
  {
    id: "vocab-415",
    french: "un sac",
    ipa: "/œ̃ sak/",
    english: "a bag",
    order: 405,
    imageUrl:
      "https://images.openai.com/static-rsc-4/JO7vciTEC-WOHTzwK9uCuudLsCK6iFTV3k16hmdXQbWm9qoOymmr3MEV8GBTRwnhRdqQuzrOgWPIPAwgpoYdDRv1-La10c5US6E7Y5GexVYyfLJl4YYFqXls-lertabQNXep19_0I_m1V3C11FUYlLF2I6t-QQxbOQHe7sCJXbI?purpose=inline",
  },
  {
    id: "vocab-416",
    french: "un magasin",
    ipa: "/œ̃ ma.ɡa.zɛ̃/",
    english: "a shop / store",
    order: 406,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/1a/Bonmarche_Store_Front.jpg",
    imageAttribution: "Rachael2015 (CC BY-SA 4.0)",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Bonmarche_Store_Front.jpg",
  },
  {
    id: "vocab-417",
    french: "le prix",
    ipa: "/lə pʁi/",
    english: "the price",
    order: 407,
    imageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/2021-06-28_E-ink_price_tag_in_Sydney_supermarket.jpg/960px-2021-06-28_E-ink_price_tag_in_Sydney_supermarket.jpg",
    imageAttribution: "Maksym Kozlenko (CC BY-SA 4.0)",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:2021-06-28_E-ink_price_tag_in_Sydney_supermarket.jpg",
  },
  {
    id: "vocab-418",
    french: "l’argent",
    ipa: "/laʁ.ʒɑ̃/",
    english: "money",
    order: 408,
    imageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Introduction_of_the_Euro_in_Croatia_-_2023_-_P059776-530100.jpg/960px-Introduction_of_the_Euro_in_Croatia_-_2023_-_P059776-530100.jpg",
    imageAttribution: "European Commission (CC BY 4.0)",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Introduction_of_the_Euro_in_Croatia_-_2023_-_P059776-530100.jpg",
  },
  {
    id: "vocab-419",
    french: "une carte",
    ipa: "/yn kaʁt/",
    english: "a card",
    order: 409,
    imageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Two_debit_cards_overlapping_%282025-08-25%29.jpg/960px-Two_debit_cards_overlapping_%282025-08-25%29.jpg",
    imageAttribution: "VulcanSphere (CC BY 4.0)",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Two_debit_cards_overlapping_(2025-08-25).jpg",
  },
  {
    id: "vocab-420",
    french: "en espèces",
    ipa: "/ɑ̃ ɛs.pɛs/",
    english: "in cash",
    order: 410,
    imageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Kassenlade_by_Denis_Apel-4.jpg/960px-Kassenlade_by_Denis_Apel-4.jpg",
    imageAttribution: "Denis Apel (CC BY-SA 4.0)",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Kassenlade_by_Denis_Apel-4.jpg",
  },
  {
    id: "vocab-421",
    french: "cher / chère",
    ipa: "/ʃɛʁ/",
    english: "expensive",
    order: 411,
    imageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Herm%C3%A8s_Store%2C_Avenue_George_V%2C_Paris_8e_003.JPG/960px-Herm%C3%A8s_Store%2C_Avenue_George_V%2C_Paris_8e_003.JPG",
    imageAttribution: "Moonik (CC BY-SA 3.0)",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Herm%C3%A8s_Store,_Avenue_George_V,_Paris_8e_003.JPG",
  },
  {
    id: "vocab-422",
    french: "bon marché",
    ipa: "/bɔ̃ maʁ.ʃe/",
    english: "inexpensive",
    order: 412,
    imageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Shop_placard_showing_20%25_reduction.JPG/960px-Shop_placard_showing_20%25_reduction.JPG",
    imageAttribution: "Mmitchell10 (CC BY-SA 3.0)",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Shop_placard_showing_20%25_reduction.JPG",
  },
  {
    id: "vocab-423",
    french: "ouvert",
    ipa: "/u.vɛʁ/",
    english: "open",
    order: 413,
    imageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Open_for_Business_%28Unsplash_lYjEYq5iUGU%29.jpg/960px-Open_for_Business_%28Unsplash_lYjEYq5iUGU%29.jpg",
    imageAttribution: "Clem Onojeghuo (CC0)",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Open_for_Business_(Unsplash_lYjEYq5iUGU).jpg",
  },
  {
    id: "vocab-424",
    french: "fermé",
    ipa: "/fɛʁ.me/",
    english: "closed",
    order: 414,
    imageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Close-up_of_a_closed_sign_hanging_on_a_store_door_%2851284470254%29.jpg/960px-Close-up_of_a_closed_sign_hanging_on_a_store_door_%2851284470254%29.jpg",
    imageAttribution: "Ivan Radic (CC BY 2.0)",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Close-up_of_a_closed_sign_hanging_on_a_store_door_(51284470254).jpg",
  },
  { id: "vocab-425", french: "Vous cherchez quelque chose ?", ipa: "/vu ʃɛʁ.ʃe kɛlk ʃoz/", english: "Are you looking for something?", order: 415 },
  { id: "vocab-426", french: "Je cherche un pantalon.", ipa: "/ʒə ʃɛʁʃ œ̃ pã.ta.lɔ̃/", english: "I’m looking for a pair of trousers.", order: 416 },
  { id: "vocab-427", french: "Vous avez ces chaussures en taille 38 ?", ipa: "/vu za.ve se ʃo.syʁ ɑ̃ taj tʁɑ̃t ɥit/", english: "Do you have these shoes in size 38?", order: 417 },
  { id: "vocab-428", french: "Combien coûte ce pantalon ?", ipa: "/kɔ̃.bjɛ̃ kut sə pã.ta.lɔ̃/", english: "How much do these trousers cost?", order: 418 },
  { id: "vocab-429", french: "Il coûte quarante-cinq euros.", ipa: "/il kut ka.ʁɑ̃t sɛ̃k ø.ʁo/", english: "They cost forty-five euros.", order: 419 },
  { id: "vocab-430", french: "C’est un peu cher.", ipa: "/sɛ œ̃ pø ʃɛʁ/", english: "That’s a little expensive.", order: 420 },
  { id: "vocab-431", french: "Vous avez un sac moins cher ?", ipa: "/vu za.ve œ̃ sak mwɛ̃ ʃɛʁ/", english: "Do you have a less expensive bag?", order: 421 },
  { id: "vocab-432", french: "Ce sac est bon marché.", ipa: "/sə sak ɛ bɔ̃ maʁ.ʃe/", english: "This bag is inexpensive.", order: 422 },
  { id: "vocab-433", french: "Il coûte vingt euros.", ipa: "/il kut vɛ̃ ø.ʁo/", english: "It costs twenty euros.", order: 423 },
  { id: "vocab-434", french: "Je le prends.", ipa: "/ʒə lə pʁɑ̃/", english: "I’ll take it.", order: 424 },
  { id: "vocab-435", french: "Je paie par carte.", ipa: "/ʒə pɛ paʁ kaʁt/", english: "I’m paying by card.", order: 425 },
  { id: "vocab-436", french: "Le magasin est ouvert jusqu’à dix-neuf heures.", ipa: "/lə ma.ɡa.zɛ̃ ɛ u.vɛʁ ʒys.ka diz.nœf œʁ/", english: "The shop is open until seven p.m.", order: 426 },
].map((word) => ({ ...word, lessonId: "lesson-43" }));

async function seedLessonFortyThree() {
  await db.collection("lessons").doc("lesson-43").set(lesson, { merge: true });
  await db.collection("lessonDetails").doc("lesson-43").set(lessonDetail, { merge: true });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: word.lessonId,
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
          imageUrl: word.imageUrl ?? null,
          imageAttribution: word.imageAttribution ?? null,
          imageSourceUrl: word.imageSourceUrl ?? null,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 43 seed completed via Firebase Admin SDK.");
}

seedLessonFortyThree().catch((error) => {
  console.error("Failed to seed lesson 43:", error);
  process.exitCode = 1;
});

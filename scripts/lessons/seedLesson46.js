import fs from "node:fs";
import { initializeApp, cert } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
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

function commonsImage(fileName) {
  const filePageName = encodeURIComponent(fileName).replace(/%20/g, "_");
  return {
    imageUrl: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=900`,
    imageSourceUrl: `https://commons.wikimedia.org/wiki/File:${filePageName}`,
  };
}

const lesson = {
  title: "Lesson 46: Colours and Clothes",
  category: "Shopping",
  content:
    "Use colour words with clothing vocabulary, ask for specific colours, and describe clothes in a shop. Estimated study time: 25–30 minutes.",
  order: 46,
};

const lessonDetail = {
  lessonId: "lesson-46",
  summary:
    "Practise useful clothing-and-colour combinations and shop conversations. Review the colour words from Lesson 45 in realistic contexts.",
  dialogues: [
    {
      id: "lesson-46-dialogue-1",
      title: "Choosing clothes by colour",
      lines: [
        {
          speaker: "Vendeur",
          french: "Bonjour, vous cherchez quelle couleur ?",
          english: "Hello, what colour are you looking for?",
        },
        {
          speaker: "Client",
          french: "Je cherche un pantalon noir.",
          english: "I’m looking for black pants.",
        },
        {
          speaker: "Vendeur",
          french: "Vous avez cette chemise en bleu ?",
          english: "Do you have this shirt in blue?",
        },
        {
          speaker: "Client",
          french: "Je préfère le bleu.",
          english: "I prefer blue.",
        },
        {
          speaker: "Vendeur",
          french: "Vous aimez les chaussures bleues ?",
          english: "Do you like the blue shoes?",
        },
        {
          speaker: "Client",
          french: "Oui, mais je préfère les chaussures marron.",
          english: "Yes, but I prefer the brown shoes.",
        },
        {
          speaker: "Vendeur",
          french: "Vous cherchez un pantalon bleu clair ?",
          english: "Are you looking for light blue pants?",
        },
        {
          speaker: "Client",
          french: "Non, je préfère un pull vert foncé.",
          english: "No, I prefer a dark green sweater.",
        },
      ],
    },
  ],
  explanations: [
    {
      id: "lesson-46-explanation-1",
      title: "Clothing and colour combinations",
      body:
        "Put a simple colour adjective after the clothing word: un pantalon noir (black pants), une chemise blanche (a white shirt), une robe rouge (a red dress), des chaussures bleues (blue shoes), and une jupe jaune (a yellow skirt). Review the colour forms and agreement rules in Lesson 45.",
    },
    {
      id: "lesson-46-explanation-2",
      title: "Colours that do not change",
      body:
        "Orange and marron are generally invariable when they describe a colour: un manteau orange, des chaussures marron. Other colours agree as usual: une veste beige, des chaussures bleues.",
    },
    {
      id: "lesson-46-explanation-3",
      title: "Light and dark shades",
      body:
        "Use bleu clair for light blue and vert foncé for dark green. In compound colour expressions such as bleu clair, the colour phrase is generally invariable: un pantalon bleu clair, des pantalons bleu clair.",
    },
    {
      id: "lesson-46-explanation-4",
      title: "Ask for a colour in a shop",
      body:
        "Ask Vous cherchez quelle couleur ? (What colour are you looking for?) or Vous avez cette chemise en bleu ? (Do you have this shirt in blue?). To ask about an item, say De quelle couleur est ce pantalon ? (What colour are these pants?).",
    },
  ],
};

const words = [
  {
    id: "vocab-457",
    french: "Je cherche un pantalon noir.",
    ipa: "/ʒə ʃɛʁʃ œ̃ pɑ̃.ta.lɔ̃ nwaʁ/",
    english: "I’m looking for black pants.",
    order: 458,
  },
  {
    id: "vocab-458",
    french: "Vous avez cette chemise en bleu ?",
    ipa: "/vu za.ve sɛt ʃə.miz ɑ̃ blø/",
    english: "Do you have this shirt in blue?",
    order: 459,
  },
  {
    id: "vocab-472",
    french: "De quelle couleur est ce pantalon ?",
    ipa: "/də kɛl ku.lœʁ ɛ sə pɑ̃.ta.lɔ̃/",
    english: "What colour are these pants?",
    order: 473,
  },
  {
    id: "vocab-473",
    french: "un pantalon noir",
    ipa: "/œ̃ pɑ̃.ta.lɔ̃ nwaʁ/",
    english: "black pants",
    order: 474,
    imageFile: "Men's black PVC pants 01.jpg",
    imageAttribution: "Ralph Schulz · Wikimedia Commons (CC BY-SA 3.0)",
  },
  {
    id: "vocab-474",
    french: "une chemise blanche",
    ipa: "/yn ʃə.miz blɑ̃ʃ/",
    english: "a white shirt",
    order: 475,
    imageFile: "Folk like shirt bodysuit with short puffed sleeves in white.jpg",
    imageAttribution: "Tobias ToMar Maier · Wikimedia Commons (CC BY-SA 4.0)",
  },
  {
    id: "vocab-475",
    french: "une robe rouge",
    ipa: "/yn ʁɔb ʁuʒ/",
    english: "a red dress",
    order: 476,
    imageFile: "Woman with hat in red dress, North Beach SF.jpg",
    imageAttribution: "Radomianin · Wikimedia Commons (CC BY-SA 4.0)",
  },
  {
    id: "vocab-476",
    french: "des chaussures bleues",
    ipa: "/de ʃo.syʁ blø/",
    english: "blue shoes",
    order: 477,
    imageFile: "Blue Shoes (47471686).jpeg",
    imageAttribution: "Manu Pintor · Wikimedia Commons (see source page for license)",
  },
  {
    id: "vocab-477",
    french: "un pull vert",
    ipa: "/œ̃ pyl vɛʁ/",
    english: "a green sweater",
    order: 478,
    imageFile: "Green Aran Sweater.JPG",
    imageAttribution: "Wikimedia Commons (public domain)",
  },
  {
    id: "vocab-478",
    french: "un sac gris",
    ipa: "/œ̃ sak ɡʁi/",
    english: "a grey bag",
    order: 479,
    imageFile: "Handbag (AM 1996.159.1-6).jpg",
    imageAttribution: "Wikimedia Commons (see source page for author and license)",
  },
  {
    id: "vocab-479",
    french: "une jupe jaune",
    ipa: "/yn ʒyp ʒon/",
    english: "a yellow skirt",
    order: 480,
    imageFile: "Morgan Pressel - Flickr - Keith Allison (29).jpg",
    imageAttribution: "Keith Allison · Wikimedia Commons (CC BY-SA 2.0)",
  },
  {
    id: "vocab-480",
    french: "un manteau orange",
    ipa: "/œ̃ mɑ̃.to ɔ.ʁɑ̃ʒ/",
    english: "an orange coat",
    order: 481,
    imageFile: "Penguin and researcher (14844393347)FXD.jpg",
    imageAttribution: "Wikimedia Commons (CC BY; see source page for author and license)",
  },
  {
    id: "vocab-481",
    french: "une robe rose",
    ipa: "/yn ʁɔb ʁoz/",
    english: "a pink dress",
    order: 482,
    imageFile: "Flower Hair Clip, Red Hair, and a Pink Dress (17485009676).jpg",
    imageAttribution: "Jamie · Wikimedia Commons (CC BY-SA 2.0)",
  },
  {
    id: "vocab-482",
    french: "un chapeau violet",
    ipa: "/œ̃ ʃa.po vjɔ.lɛ/",
    english: "a purple hat",
    order: 483,
    imageFile: "Purple hat (14540142365).jpg",
    imageAttribution: "Arrian Jahangiri · Wikimedia Commons (CC BY-SA; see source for version)",
  },
  {
    id: "vocab-483",
    french: "des chaussures marron",
    ipa: "/de ʃo.syʁ ma.ʁɔ̃/",
    english: "brown shoes",
    order: 484,
    imageFile: "Tricker's Daniel derby shoes.jpg",
    imageAttribution: "Nick-D · Wikimedia Commons (CC BY-SA 4.0)",
  },
  {
    id: "vocab-484",
    french: "une veste beige",
    ipa: "/yn vɛst bɛʒ/",
    english: "a beige jacket",
    order: 485,
    imageFile: "Beige Karakul jacket with leather (3).jpg",
    imageAttribution: "Kürschner · Wikimedia Commons (CC0 1.0)",
  },
  {
    id: "vocab-485",
    french: "un pantalon bleu clair",
    ipa: "/œ̃ pɑ̃.ta.lɔ̃ blø klɛʁ/",
    english: "light blue pants",
    order: 486,
    imageFile: "Denim Jeans Pant.jpg",
    imageAttribution: "Fahad Faisal · Wikimedia Commons (CC BY-SA 4.0)",
  },
  {
    id: "vocab-486",
    french: "un pull vert foncé",
    ipa: "/œ̃ pyl vɛʁ fɔ̃.se/",
    english: "a dark green sweater",
    order: 487,
    imageFile: "Floral Pants, Leather Jacket, and Olive Green Sweater (16947071742).jpg",
    imageAttribution: "Jamie · Wikimedia Commons (CC BY-SA 2.0)",
  },
  {
    id: "vocab-487",
    french: "Je préfère le bleu.",
    ipa: "/ʒə pʁe.fɛʁ lə blø/",
    english: "I prefer blue.",
    order: 488,
  },
  {
    id: "vocab-488",
    french: "Je préfère le manteau orange.",
    ipa: "/ʒə pʁe.fɛʁ lə mɑ̃.to ɔ.ʁɑ̃ʒ/",
    english: "I prefer the orange coat.",
    order: 489,
  },
  {
    id: "vocab-489",
    french: "Vous cherchez quelle couleur ?",
    ipa: "/vu ʃɛʁ.ʃe kɛl ku.lœʁ/",
    english: "What colour are you looking for?",
    order: 490,
  },
].map((word) => ({
  ...word,
  ...(word.imageFile ? commonsImage(word.imageFile) : {}),
  lessonId: "lesson-46",
}));

async function seedLessonFortySix() {
  await db.collection("lessons").doc("lesson-46").set(lesson, { merge: true });
  await db.collection("lessonDetails").doc("lesson-46").set(lessonDetail, { merge: true });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: word.lessonId,
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
          imageUrl: word.imageUrl ?? FieldValue.delete(),
          imageAttribution: word.imageAttribution ?? FieldValue.delete(),
          imageSourceUrl: word.imageSourceUrl ?? FieldValue.delete(),
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 46 seed completed via Firebase Admin SDK.");
}

seedLessonFortySix().catch((error) => {
  console.error("Failed to seed lesson 46:", error);
  process.exitCode = 1;
});

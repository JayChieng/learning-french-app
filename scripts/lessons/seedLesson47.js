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

const lesson = {
  title: "Lesson 47: Acheter and Paying at the Checkout",
  category: "Shopping",
  content:
    "Learn how to conjugate acheter, talk about buying things, and pay at a shop checkout. Estimated study time: 25–30 minutes.",
  order: 47,
};

const lessonDetail = {
  lessonId: "lesson-47",
  summary:
    "Practise the present tense of acheter, useful shopping verbs, and common expressions for paying at the checkout.",
  dialogues: [
    {
      id: "lesson-47-dialogue-1",
      title: "Buying shoes and paying",
      lines: [
        {
          speaker: "Vendeur",
          french: "Bonjour ! Vous cherchez quelque chose ?",
          english: "Hello! Are you looking for something?",
        },
        {
          speaker: "Client",
          french: "Oui, je cherche des chaussures.",
          english: "Yes, I’m looking for shoes.",
        },
        {
          speaker: "Vendeur",
          french: "Vous voulez les essayer ?",
          english: "Would you like to try them on?",
        },
        {
          speaker: "Client",
          french: "Oui, elles sont très bien. Je les achète.",
          english: "Yes, they’re very nice. I’ll buy them.",
        },
        {
          speaker: "Vendeur",
          french: "Vous payez par carte ou en espèces ?",
          english: "Are you paying by card or in cash?",
        },
        {
          speaker: "Client",
          french: "Je paie par carte. Je peux avoir un reçu ?",
          english: "I’m paying by card. Can I have a receipt?",
        },
        {
          speaker: "Vendeur",
          french: "Bien sûr. Voici votre reçu.",
          english: "Of course. Here is your receipt.",
        },
      ],
    },
  ],
  explanations: [
    {
      id: "lesson-47-explanation-1",
      title: "Conjugate acheter in the present tense",
      body:
        "Acheter means “to buy.” In the present tense, the stem changes from achet- to achèt- before a silent e: j’achète, tu achètes, il / elle achète, and ils / elles achètent. The nous and vous forms keep the e: nous achetons and vous achetez.",
    },
    {
      id: "lesson-47-explanation-2",
      title: "Use acheter in sentences",
      body:
        "Use the conjugated verb for a current purchase: J’achète un téléphone (I’m buying a phone). After another verb such as vouloir, use the infinitive: Je veux acheter des chaussures (I want to buy shoes). In a negative sentence, ne ... rien means “not ... anything”: Je n’achète rien aujourd’hui (I’m not buying anything today).",
    },
    {
      id: "lesson-47-explanation-3",
      title: "Useful shopping verbs",
      body:
        "Chercher means “to look for,” essayer means “to try,” payer means “to pay,” and vouloir means “to want.” The infinitive payer is commonly pronounced /pe.je/. The form je paie is commonly pronounced /ʒə pɛ/.",
    },
    {
      id: "lesson-47-explanation-4",
      title: "Pay at the checkout",
      body:
        "Say Je paie par carte (I pay by card) or Je paie en espèces (I pay in cash). Ask Vous acceptez les cartes de crédit ? to check whether credit cards are accepted, and Je peux avoir un reçu ? to ask for a receipt. Gardez la monnaie means “Keep the change.”",
    },
  ],
};

const words = [
  {
    id: "vocab-490",
    french: "acheter",
    ipa: "/aʃ.te/",
    english: "to buy",
    order: 491,
  },
  {
    id: "vocab-491",
    french: "J’achète",
    ipa: "/ʒa.ʃɛt/",
    english: "I buy",
    order: 492,
  },
  {
    id: "vocab-492",
    french: "Tu achètes",
    ipa: "/ty a.ʃɛt/",
    english: "You buy (informal singular)",
    order: 493,
  },
  {
    id: "vocab-493",
    french: "Il achète",
    ipa: "/il a.ʃɛt/",
    english: "He buys",
    order: 494,
  },
  {
    id: "vocab-494",
    french: "Elle achète",
    ipa: "/ɛl a.ʃɛt/",
    english: "She buys",
    order: 495,
  },
  {
    id: "vocab-495",
    french: "Nous achetons",
    ipa: "/nu.zaʃ.tɔ̃/",
    english: "We buy",
    order: 496,
  },
  {
    id: "vocab-496",
    french: "Vous achetez",
    ipa: "/vu.zaʃ.te/",
    english: "You buy (formal or plural)",
    order: 497,
  },
  {
    id: "vocab-497",
    french: "Ils achètent",
    ipa: "/il.za.ʃɛt/",
    english: "They buy (masculine or mixed group)",
    order: 498,
  },
  {
    id: "vocab-498",
    french: "Elles achètent",
    ipa: "/ɛl.za.ʃɛt/",
    english: "They buy (feminine group)",
    order: 499,
  },
  {
    id: "vocab-499",
    french: "chercher",
    ipa: "/ʃɛʁ.ʃe/",
    english: "to look for",
    order: 500,
  },
  {
    id: "vocab-500",
    french: "essayer",
    ipa: "/e.sɛ.je/",
    english: "to try",
    order: 501,
  },
  {
    id: "vocab-501",
    french: "payer",
    ipa: "/pe.je/",
    english: "to pay",
    order: 502,
  },
  {
    id: "vocab-502",
    french: "vouloir",
    ipa: "/vu.lwaʁ/",
    english: "to want",
    order: 503,
  },
  {
    id: "vocab-503",
    french: "J’achète un téléphone.",
    ipa: "/ʒa.ʃɛt œ̃ te.le.fɔn/",
    english: "I’m buying a phone.",
    order: 504,
  },
  {
    id: "vocab-504",
    french: "Je veux acheter des chaussures.",
    ipa: "/ʒə vø a.ʃə.te de ʃo.syʁ/",
    english: "I want to buy shoes.",
    order: 505,
  },
  {
    id: "vocab-505",
    french: "Je n’achète rien aujourd’hui.",
    ipa: "/ʒə na.ʃɛt ʁjɛ̃ o.ʒuʁ.dɥi/",
    english: "I’m not buying anything today.",
    order: 506,
  },
  {
    id: "vocab-506",
    french: "Je paie par carte.",
    ipa: "/ʒə pɛ paʁ kaʁt/",
    english: "I pay by card.",
    order: 507,
  },
  {
    id: "vocab-507",
    french: "Je paie en espèces.",
    ipa: "/ʒə pɛ ɑ̃ ɛs.pɛs/",
    english: "I pay in cash.",
    order: 508,
  },
  {
    id: "vocab-508",
    french: "Vous acceptez les cartes de crédit ?",
    ipa: "/vu zak.sɛp.te le kaʁt də kʁe.di/",
    english: "Do you accept credit cards?",
    order: 509,
  },
  {
    id: "vocab-509",
    french: "Je peux avoir un reçu ?",
    ipa: "/ʒə pø a.vwaʁ œ̃ ʁə.sy/",
    english: "Can I have a receipt?",
    order: 510,
  },
  {
    id: "vocab-510",
    french: "Gardez la monnaie.",
    ipa: "/ɡaʁ.de la mɔ.nɛ/",
    english: "Keep the change.",
    order: 511,
  },
  {
    id: "vocab-511",
    french: "Bonjour ! Vous cherchez quelque chose ?",
    ipa: "/bɔ̃.ʒuʁ | vu ʃɛʁ.ʃe kɛlk ʃoz/",
    english: "Hello! Are you looking for something?",
    order: 512,
  },
  {
    id: "vocab-512",
    french: "Oui, je cherche un pantalon noir.",
    ipa: "/wi | ʒə ʃɛʁʃ œ̃ pɑ̃.ta.lɔ̃ nwaʁ/",
    english: "Yes, I'm looking for black pants.",
    order: 513,
  },
  {
    id: "vocab-513",
    french: "Quelle taille faites-vous ?",
    ipa: "/kɛl taj fɛt vu/",
    english: "What size are you?",
    order: 514,
  },
  {
    id: "vocab-514",
    french: "Je voudrais essayer celui-ci.",
    ipa: "/ʒə vu.dʁɛ e.se.je sə.lɥi.si/",
    english: "I'd like to try this one.",
    order: 515,
  },
  {
    id: "vocab-515",
    french: "Bien sûr. Les cabines sont là-bas.",
    ipa: "/bjɛ̃ syʁ | le ka.bin sɔ̃ la ba/",
    english: "Of course. The fitting rooms are over there.",
    order: 516,
  },
  {
    id: "vocab-516",
    french: "Merci. Combien ça coûte ?",
    ipa: "/mɛʁ.si | kɔ̃.bjɛ̃ sa kut/",
    english: "Thank you. How much does it cost?",
    order: 517,
  },
  {
    id: "vocab-517",
    french: "Ça coûte 40 dollars.",
    ipa: "/sa kut ka.ʁɑ̃t dɔ.laʁ/",
    english: "It costs 40 dollars.",
    order: 518,
  },
  {
    id: "vocab-518",
    french: "D’accord. Je paie par carte.",
    ipa: "/da.kɔʁ | ʒə pɛ paʁ kaʁt/",
    english: "Okay. I'll pay by card.",
    order: 519,
  },
].map((word) => ({ ...word, lessonId: "lesson-47" }));

async function seedLessonFortySeven() {
  await db.collection("lessons").doc("lesson-47").set(lesson, { merge: true });
  await db.collection("lessonDetails").doc("lesson-47").set(lessonDetail, { merge: true });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: word.lessonId,
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
          imageUrl: FieldValue.delete(),
          imageAttribution: FieldValue.delete(),
          imageSourceUrl: FieldValue.delete(),
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 47 seed completed via Firebase Admin SDK.");
}

seedLessonFortySeven().catch((error) => {
  console.error("Failed to seed lesson 47:", error);
  process.exitCode = 1;
});

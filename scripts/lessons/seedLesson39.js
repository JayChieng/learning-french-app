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

const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf8")
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const lesson = {
  title: "Lesson 39: Food and Drink",
  category: "Food and Drink",
  content:
    "Learn the names of common foods and drinks, and recognize useful vocabulary for ordering at a restaurant.",
  order: 39,
};

const lessonDetail = {
  lessonId: "lesson-39",
  summary:
    "Learn common French words for food and drinks, from bread, rice, and fish to coffee, salad, and the bill.",
  dialogues: [],
  explanations: [],
};

const words = [
  {
    id: "vocab-357",
    french: "du pain",
    ipa: "/dy pɛ̃/",
    english: "bread",
    order: 347,
    image: "bread.jpg",
    attribution: "Tomascastelazo · CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File%3AHome_made_sour_dough_bread.jpg",
  },
  {
    id: "vocab-358",
    french: "du riz",
    ipa: "/dy ʁi/",
    english: "rice",
    order: 348,
    image: "rice.jpg",
    attribution: "Ceeseven · CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File%3ABowl_of_Cooked_Brown_Rice.jpg",
  },
  {
    id: "vocab-359",
    french: "du poulet",
    ipa: "/dy pu.lɛ/",
    english: "chicken",
    order: 349,
    image: "chicken.jpg",
    attribution: "Jameswasswa · CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File%3AWhole_spiced_chicken_(roasted).jpg",
  },
  {
    id: "vocab-360",
    french: "du poisson",
    ipa: "/dy pwa.sɔ̃/",
    english: "fish",
    order: 350,
    image: "fish.jpg",
    attribution: "pompi · CC0",
    source: "https://commons.wikimedia.org/wiki/File%3APlated_grilled_fish.jpg",
  },
  {
    id: "vocab-361",
    french: "de l’eau",
    ipa: "/də lo/",
    english: "water",
    order: 351,
    image: "water.jpg",
    attribution: "Derek Jensen (Tysto) · Public domain",
    source: "https://commons.wikimedia.org/wiki/File%3AGlass-of-water.jpg",
  },
  {
    id: "vocab-362",
    french: "du café",
    ipa: "/dy ka.fe/",
    english: "coffee",
    order: 352,
    image: "coffee.jpg",
    attribution: "Julius Schorzman · CC BY-SA 2.0",
    source:
      "https://commons.wikimedia.org/wiki/File%3AA_small_cup_of_coffee.JPG",
  },
  {
    id: "vocab-363",
    french: "une bière",
    ipa: "/yn bjɛʁ/",
    english: "a beer",
    order: 353,
    image: "beer.jpg",
    attribution: 'Christian "VisualBeo" Horvat · CC BY-SA 3.0',
    source:
      "https://commons.wikimedia.org/wiki/File%3ABeer_wuerzburger_hofbraue_v.jpg",
  },
  {
    id: "vocab-364",
    french: "un thé",
    ipa: "/œ̃ te/",
    english: "a tea",
    order: 354,
    image: "tea.jpg",
    attribution: "Jacek Halicki · CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File%3A2023_Fili%C5%BCanki_do_herbaty.jpg",
  },
  {
    id: "vocab-365",
    french: "un jus",
    ipa: "/œ̃ ʒy/",
    english: "a juice",
    order: 355,
    image: "juice.jpg",
    attribution: "USDA; edited by Arad · Public domain",
    source:
      "https://commons.wikimedia.org/wiki/File%3AOrange_juice_1_edit1.jpg",
  },
  {
    id: "vocab-366",
    french: "une salade",
    ipa: "/yn sa.lad/",
    english: "a salad",
    order: 356,
    image: "salad.jpg",
    attribution: "Tomwsulcer · CC0",
    source:
      "https://commons.wikimedia.org/wiki/File%3AParty_food_dish_8_salad_tomatoes_cheese_lettuce_spinach.jpg",
  },
  {
    id: "vocab-367",
    french: "des légumes",
    ipa: "/de le.ɡym/",
    english: "vegetables",
    order: 357,
    image: "vegetables.jpg",
    attribution: "Shixart1985 · CC BY 2.0",
    source:
      "https://commons.wikimedia.org/wiki/File%3AA_woven_basket_filled_with_an_assortment_of_colorful_vegetables.jpg",
  },
  {
    id: "vocab-368",
    french: "un dessert",
    ipa: "/œ̃ de.sɛʁ/",
    english: "a dessert",
    order: 358,
    image: "dessert.jpg",
    attribution: "Daria Yakovleva; edited by Subsidiary account · CC0",
    source:
      "https://commons.wikimedia.org/wiki/File%3APiece_of_chocolate_cake_on_a_white_plate_decorated_with_chocolate_sauce.jpg",
  },
  {
    id: "vocab-369",
    french: "le menu",
    ipa: "/lə mə.ny/",
    english: "the menu",
    order: 359,
    image: "menu.jpg",
    attribution: "Benoît Prieur · CC0",
    source:
      "https://commons.wikimedia.org/wiki/File%3AMenu_du_jour_d%27un_restaurant_asiatique_lyonnais_en_2017.jpg",
  },
  {
    id: "vocab-370",
    french: "l’addition",
    ipa: "/la.di.sjɔ̃/",
    english: "the bill",
    order: 360,
    image: "bill.jpg",
    attribution: "KM francois Georges Pierre · CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File%3AHK_%E5%8C%97%E8%A7%92_North_Point_%E9%95%B7%E5%BA%B7%E8%A1%97_Cheung_Hong_Street_%E6%98%8E%E6%98%9F%E6%B5%B7%E9%AE%AE%E9%85%92%E5%AE%B6_Star_Seafood_Restaurant_food_bill_Receipt_night_March_2019_SSG.jpg",
  },
].map((word) => ({
  ...word,
  imageUrl: `/assets/lesson-39/${word.image}`,
}));

async function seedLessonThirtyNine() {
  await db.collection("lessons").doc("lesson-39").set(lesson, {
    merge: true,
  });

  await db.collection("lessonDetails").doc("lesson-39").set(lessonDetail, {
    merge: true,
  });

  await Promise.all(
    words.map((word) =>
      db.collection("vocabulary").doc(word.id).set(
        {
          lessonId: "lesson-39",
          french: word.french,
          ipa: word.ipa,
          english: word.english,
          order: word.order,
          imageUrl: word.imageUrl,
          imageAttribution: word.attribution,
          imageSourceUrl: word.source,
        },
        { merge: true }
      )
    )
  );

  console.log("Lesson 39 seed completed via Firebase Admin SDK.");
}

seedLessonThirtyNine().catch((error) => {
  console.error("Failed to seed lesson 39:", error);
  process.exitCode = 1;
});

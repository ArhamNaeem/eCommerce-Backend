import { ParsedQs } from "qs";
import { BadRequest } from "../../errors";

const clothCategory = [
  "Men shirts",
  "Men t-shirts",
  "Men trousers",
  "Men jeans",
  "Women t-shirts",
  "Women trousers",
  "Women jeans",
  "Women dresses",
];
const shoeCategory = [
  "Sneakers",
  "Dress Shoes",
  "Loafers",
  "Sandals",
  "Flats",
  "Sport shoes",
  "Heels",
];
const furnitureCategory = [
  "Sofas",
  "Chairs",
  "Sidetables",
  "TV stands",
  "Dining tables",
  "Dining chairs",
  "Buffets",
  "Bar stools",
  "Beds",
  "Headboards",
  "Vanities",
  "Dressers",
  "Desks",
  "Filing cabinets",
  "Bookcases",
];
const decorationCategory = [
  "Clocks",
  "Mirrors",
  "Paintings",
  "Table Vases",
  "Table Lamps",
  "Candles",
  "Area Rugs",
  "Floor Vases",
  "Floor Lamps",
  "Wreaths",
  "Christmas Lights",
  "Ornaments",
  "Spring Flowers",
  "Fall Leaves",
];
const cosmeticsCategory = [
  "Foundation",
  "Blush",
  "Highlighter",
  "Concealer",
  "Mascara",
  "Eyeliner",
  "Eyeshadow",
  "Lipstick",
  "Lip gloss",
  "Cleanser",
  "Moisturizer",
  "Serum",
  "Toner",
];
const applianceCategory = [
  "Refrigerators",
  "Freezers",
  "Ovens",
  "Microwaves",
  "Dishwashers",
  "Washing machines",
  "Combination washer/dryers",
  "Vacuum cleaners",
  "Steam cleaners",
  "Carpet cleaners",
];

export const validate = (queryParams: ParsedQs) => {
  const { type, category, color, size } = queryParams;
  if (!type && (category || color || size)) {
    throw new BadRequest("Type shall be identified");
  }
  switch (type) {
    case "furniture":
    case "cosmetics":
    case "appliances":
    case "decorations":
      if (color || size) {
        throw new BadRequest(`Invalid paramter on type ${type}`);
      }
      break;
    default:
      break;
  }
  if (category && !isValidCategory(type, category)) {
    throw new BadRequest(`Invalid category on type ${type}`);
  }
};

export const isValidCategory = (
  type: string | string[] | ParsedQs | ParsedQs[] | undefined,
  category: string | string[] | ParsedQs | ParsedQs[]
) => {
  switch (type) {
    case "clothing":
      return clothCategory.includes(category.toString());
    case "furniture":
      return furnitureCategory.includes(category.toString());
    case "cosmetics":
      return cosmeticsCategory.includes(category.toString());
    case "decoration":
      return decorationCategory.includes(category.toString());
    case "appliances":
      return applianceCategory.includes(category.toString());
    case "shoes":
      return shoeCategory.includes(category.toString());
  }
};

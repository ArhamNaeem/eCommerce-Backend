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

export const validate = (queryParams: any) => {
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

export const isValidCategory = (type: string, category: string) => {
  switch (type) {
    case "clothing":
      return clothCategory.includes(category);
    case "furniture":
      return furnitureCategory.includes(category);
    case "cosmetics":
      return cosmeticsCategory.includes(category);
    case "decoration":
      return decorationCategory.includes(category);
    case "appliances":
      return applianceCategory.includes(category);
    case "shoes":
      return shoeCategory.includes(category);
  }
};

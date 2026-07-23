export const filterTabs = [
  { key: "all", label: "All Projects" },
  { key: "kitchen", label: "Kitchens" },
  { key: "bathroom", label: "Bathrooms" },
  { key: "laundry", label: "Laundry" },
  { key: "living", label: "Living Spaces" },
];

export const portfolioItems = [
  { id: "bath-1", category: "bathroom", tag: "Bathroom", title: "Arched Powder Room", desc: "Fluted travertine and warm plaster", img: "/images/bathroom/bathroom-1.jpg" },
  { id: "bath-2", category: "bathroom", tag: "Bathroom", title: "Terrazzo Ensuite", desc: "Terrazzo, brass and a curved vanity", img: "/images/bathroom/bathroom-2.jpg" },
  { id: "bath-3", category: "bathroom", tag: "Bathroom", title: "Emerald Marble Bath", desc: "Book-matched marble and brushed gold", img: "/images/bathroom/bathroom-3.jpg" },
  { id: "bath-4", category: "bathroom", tag: "Bathroom", title: "Emerald Cabinetry Suite", desc: "Deep green joinery, herringbone marble floor", img: "/images/bathroom/bathroom-4.jpg" },
  { id: "bath-5", category: "bathroom", tag: "Bathroom", title: "Double Vanity in Calacatta Viola", desc: "Statement stone and oak cabinetry", img: "/images/bathroom/bathroom-5.jpg" },
  { id: "kitchen-1", category: "kitchen", tag: "Kitchen", title: "Olive Cabinetry Kitchen", desc: "Fluted timber hood and stone island", img: "/images/kitchen/kitchen-1.jpg" },
  { id: "kitchen-2", category: "kitchen", tag: "Kitchen", title: "Navy & Brass Island Kitchen", desc: "Marble waterfall island, antique brass", img: "/images/kitchen/kitchen-2.jpg" },
  { id: "kitchen-3", category: "kitchen", tag: "Kitchen", title: "Navy Butler’s Kitchen", desc: "Glass-front joinery and brass hardware", img: "/images/kitchen/kitchen-3.jpg" },
  { id: "kitchen-4", category: "kitchen", tag: "Kitchen", title: "Walnut & Stone Island", desc: "Warm walnut tones with a stone waterfall edge", img: "/images/kitchen/kitchen-4.jpg" },
  { id: "kitchen-5", category: "kitchen", tag: "Kitchen", title: "Light Oak Family Kitchen", desc: "Soft neutrals with a fluted timber island", img: "/images/kitchen/kitchen-5.jpg" },
  { id: "laundry-1", category: "laundry", tag: "Laundry", title: "Sage Laundry & Utility", desc: "Sage cabinetry with concealed appliances", img: "/images/laundry/laundry-1.jpg" },
  { id: "laundry-2", category: "laundry", tag: "Laundry", title: "Terrazzo Butler’s Laundry", desc: "Terrazzo tile and warm oak joinery", img: "/images/laundry/laundry-2.jpg" },
  { id: "laundry-3", category: "laundry", tag: "Laundry", title: "Marble Laundry Counter", desc: "Brushed brass fittings, honed marble benchtop", img: "/images/laundry/laundry-3.jpg" },
  { id: "laundry-4", category: "laundry", tag: "Laundry", title: "Oak Laundry Suite", desc: "Open shelving and a brass tap over dual appliances", img: "/images/laundry/laundry-4.jpg" },
  { id: "living-1", category: "living", tag: "Living", title: "Coffered Living Room", desc: "Marble fireplace framed by custom built-ins", img: "/images/living/living-1.jpg" },
  { id: "living-2", category: "living", tag: "Living", title: "Bar Cart Lounge", desc: "Sectional seating with a vintage bar cart", img: "/images/living/living-2.jpg" },
  { id: "living-3", category: "living", tag: "Living", title: "Slatted Wood Lounge", desc: "Concrete walls and timber slats with warm accents", img: "/images/living/living-3.jpg" },
  { id: "living-4", category: "living", tag: "Living", title: "Neutral Sectional Lounge", desc: "Stone nesting tables beneath a woven pendant", img: "/images/living/living-4.jpg" },
  { id: "living-5", category: "living", tag: "Living", title: "City View Living Room", desc: "Floor-to-ceiling glass framing the evening skyline", img: "/images/living/living-5.jpg" },
];

export function filterPortfolio(items, key) {
  return key === "all" ? items : items.filter((item) => item.category === key);
}

export function findPortfolioItem(id) {
  const item = portfolioItems.find((i) => i.id === id);
  if (!item) throw new Error(`No portfolio item with id "${id}"`);
  return item;
}

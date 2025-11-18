class Item {
  constructor(
    id,
    user_id,
    location_id,
    category,
    description,
    status,
    created_at,
  ) {
    this.id = id;
    this.user_id = user_id;
    this.location_id = location_id;
    this.category = CATEGORY.OTHER;
    this.description = description;
    this.status = STATUS.LOST;
    this.created_at = new Date();
  }
}

const CATEGORY = {
  CLOTHING: "CLOTHING",
  ACCESSORIES: "ACCESSORIES",
  ELECTRONICS: "ELECTRONICS",
  BOOKS: "BOOKS",
  OTHER: "OTHER",
};

const STATUS = {
  LOST: "LOST",
  FOUND: "FOUND",
  CLAIMED: "CLAIMED",
};

export default { Item, CATEGORY, STATUS };

// TODO: Implement item controllers
// - Get all items
// - Get item by ID
// - Create item
// - Update item
// - Delete item

import AppDataSource from "../config/dataSource.js";
import { UserEntity } from "../models/User.js";
import { ItemEntity } from "../models/Item.js";
import { ImageEntity } from "../models/Image.js";
const itemRepo = AppDataSource.getRepository(ItemEntity);
const userRepo = AppDataSource.getRepository(UserEntity);
const imageRepo = AppDataSource.getRepository(ImageEntity);

// this return all the items

export const getAllItems = async (req, res) => {
  try {
    const items = await itemRepo
      .createQueryBuilder("item")
      .leftJoinAndSelect("item.images", "images")
      .leftJoinAndSelect("item.user", "user")
      .select([
        "item.id",
        "item.title",
        "item.category",
        "item.description",
        "item.status",
        "item.location",
        "item.createdAt",

        "images", // selecting whole object is allowed

        "user.id",
        "user.name",
        "user.email",
        "user.phone",
      ])
      .getMany();

    res.status(200).json({
      ok: true,
      status: 200,
      data: items,
      message: "Items received successfully!",
    });
  } catch (err) {
    console.error("Error in get_all_items:", err);

    res.status(500).json({
      ok: false,
      status: 500,
      message: "Server error while fetching items",
    });
  }
};

// this return all the items of a specific user

export const getMyItems = async (req, res) => {
  const { user_id } = req.params;
  try {
    const items = await itemRepo
      .createQueryBuilder("item")
      .leftJoinAndSelect("item.images", "images")
      .leftJoinAndSelect("item.user", "user")
      .where("item.user_id = :user_id", { user_id })
      .select([
        "item.id",
        "item.title",
        "item.category",
        "item.description",
        "item.status",
        "item.location",
        "item.createdAt",

        "images", // selecting whole object is allowed

        "user.id",
        "user.name",
        "user.email",
        "user.phone",
      ])
      .getMany();

    res.status(200).json({
      ok: true,
      status: 200,
      data: items,
      message: "Items received successfully!",
    });
  } catch (err) {
    console.error("Error in get_my_items:", err);

    res.status(500).json({
      ok: false,
      status: 500,
      message: "Server error while fetching items",
    });
  }
};

// this gets an item by ID

export const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await itemRepo
      .createQueryBuilder("item")
      .leftJoinAndSelect("item.images", "images")
      .leftJoinAndSelect("item.user", "user")
      .where("item.id = :id", { id })
      .select([
        "item.id",
        "item.title",
        "item.category",
        "item.description",
        "item.status",
        "item.location",
        "item.createdAt",

        "images", // selecting whole object is allowed

        "user.id",
        "user.name",
        "user.email",
        "user.phone",
      ])
      .getOne();
    if (!item) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Item not found",
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      data: item,
      message: "Item received successfully!",
    });
  } catch (err) {
    console.error("Error in get_item_by_id: ", err);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Server error while fetching item",
    });
  }
};

//  this create an item

export const createItem = async (req, res) => {
  const { location, category, title, description, status, images } = req.body;
  const user_id = req.user.user_id; // Use ID from token, not body
  console.log("Create Item - User ID from token:", user_id);

  try {
    //Load related entities
    const user = await userRepo.findOneBy({ id: user_id });
    console.log("Create Item - User found:", user ? "Yes" : "No");

    if (!user || !location) {
      return res.status(400).json({
        ok: false,
        message: "User or Location not found",
      });
    }

    // Normalize category and status to Title Case to match Enum
    const normalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;
    const formattedCategory = normalize(category);
    const formattedStatus = normalize(status);
    // Validate Category
    if (!formattedCategory || formattedCategory.trim() === '') {
      return res.status(400).json({ ok: false, message: "Category is required" });
    }

    //Create Item entity
    const item = itemRepo.create({
      category: formattedCategory,
      title,
      description,
      status: formattedStatus,
      user,
      location,

    });

    // Save Item first to get its id
    await itemRepo.save(item);

    //Handle images (one-to-many)
    const imageEntities = images.map((url) => ({ url, item }));
    await imageRepo.save(imageEntities);

    res.status(201).json({
      ok: true,
      status: 201,
      message: "Item created successfully!",
      item,
    });
  } catch (err) {
    console.error("Error in create_item: ", err);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Server error while creating new item",
    });
  }
};

//  this is to delete item which is only allowed to the user who uploaded the item or the admin

export const deleteItem = async (req, res) => {
  const { item_id } = req.params;
  const user_id = req.user.user_id;
  try {
    const item = await itemRepo.findOneBy({
      id: item_id,
      user: { id: user_id },
    });
    if (!item) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Item not found",
      });
    }
    if (item.user.id !== user_id || !req.user.isAdmin) {
      return res.status(403).json({
        ok: false,
        status: 403,
        message: "Unauthorized",
      });
    }
    await itemRepo.delete(item_id);
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Item deleted successfully!",
    });
  } catch (err) {
    console.error("Error in delete_item: ", err);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Server error while deleting item",
    });
  }
};

//  have to come up with the logic for when the item is claimed to remove it from the list
//  of the item to be displayed

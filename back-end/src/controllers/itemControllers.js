// TODO: Implement item controllers
// - Get all items
// - Get item by ID
// - Create item
// - Update item
// - Delete item

import { Item } from "../models/itemModel.js";
import prisma from "../config/prismaClient.js";

// this return all the items

const get_all_items = async (req, res) => {
  try {
    const items = await prisma.item.findMany(); // model should be lowercase in Prisma Client

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

// this gets an item by ID

const get_item_by_id = async (req, res) => {
  const { item_id } = req.body;
  try {
    const item = await prisma.item.findUnique({
      where: {
        id: item_id,
      },
    });
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

const create_item = async (req, res) => {
  const { user_id, location_id, category, name, description, status, images } =
    req.body;
  try {
    await prisma.item.create({
      data: {
        user_id: user_id,
        location_id: location_id,
        category: category,
        name: name,
        description: description,
        status: status,
        images: {
          createMany: {
            data: images,
          },
        },
      },
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

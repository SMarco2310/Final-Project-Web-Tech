// TODO: Implement item controllers
// - Get all items
// - Get item by ID
// - Create item
// - Update item
// - Delete item

import prisma from "../config/prismaClient.js";

// this return all the items

export const getAllItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      where: {
        status: {
          in: ["LOST", "FOUND"],
        },
      },
      include: {
        images: true,
        user: {
          include: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    }); // model should be lowercase in Prisma Client

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

export const getItemById = async (req, res) => {
  const { item_id } = req.params;
  try {
    const item = await prisma.item.findUnique({
      where: {
        id: item_id,
      },
      include: {
        images: true,
        // make decision on whether to include the claims or not
        user: {
          include: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
    res.status(200).json({
      ok: true,
      status: 200,
      data: { item },
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
  const { user_id, location_id, category, name, description, status, images } =
    req.body;
  // this tranfrorms the list of string url into a list of url object
  const images_url = images.map((url) => ({ url: url }));
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
            data: images_url,
          },
        },
      },
    });
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Item created successfully!",
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
  const { user_id } = req.user;
  const item = await prisma.item.findUnique({
    where: {
      id: item_id,
    },
  });
  if (!item) {
    return res.status(404).json({
      ok: false,
      status: 404,
      message: "Item not found",
    });
  }
  if (item.user_id !== user_id && !req.user.isAdmim) {
    return res.status(403).json({
      ok: false,
      status: 403,
      message: "Unauthorized",
    });
  }
  await prisma.item.delete({
    where: {
      id: item_id,
    },
  });
  res.status(200).json({
    ok: true,
    status: 200,
    message: "Item deleted successfully!",
  });
};

//  have to come up with the logic for when the item is claimed to remove it from the list
//  of the item to be displayed

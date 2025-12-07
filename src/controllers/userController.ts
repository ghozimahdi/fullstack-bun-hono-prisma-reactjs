import type { Context } from "hono";
import prisma from "../../prisma/client";
import { UserCreateRequest } from "../types/user";

export const getUsers = async (c: Context) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { id: "desc" },
    });

    return c.json(
      {
        success: true,
        message: "List Data Users",
        data: users,
      },
      200
    );
  } catch (e: unknown) {
    console.error(`Error getting users: ${e}`);
    return c.json({ success: false, message: "Internal server error" }, 500);
  }
};

export const createUser = async (c: Context) => {
  try {
    const { name, username, email, password } = c.get(
      "validatedBody"
    ) as UserCreateRequest;

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
      select: { id: true, email: true, username: true },
    });

    if (existing) {
      const conflictField =
        existing.email === email
          ? "email"
          : existing.username === username
          ? "username"
          : "email";
      return c.json(
        {
          success: false,
          message:
            conflictField === "email"
              ? "Email sudah terdaftar"
              : "Username sudah digunakan",
          errors: { [conflictField]: "Telah digunakan" },
        },
        409
      );
    }

    const hashedPassword = await Bun.password.hash(password);

    const user = await prisma.user.create({
      data: { name, username, email, password: hashedPassword },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return c.json(
      {
        success: true,
        message: "User Berhasil Dibuat",
        data: user,
      },
      201
    );
  } catch (e: unknown) {
    console.error(`Error creating user: ${e}`);
    return c.json({ success: false, message: "Internal server error" }, 500);
  }
};

export const getUserById = async (c: Context) => {
  try {
    const userId = c.req.param("id");

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return c.json(
        {
          success: false,
          message: "User Tidak Ditemukan!",
        },
        404
      );
    }

    return c.json(
      {
        success: true,
        message: "Detail Data User",
        data: user,
      },
      200
    );
  } catch (e: unknown) {
    console.error(`Error getting user by ID: ${e}`);
  }
};

export const updateUser = async (c: Context) => {
  try {
    const userId = c.req.param("id");

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return c.json(
        {
          success: false,
          message: "User Tidak Ditemukan!",
        },
        404
      );
    }

    const { name, username, email, password } = c.get(
      "validatedBody"
    ) as UserCreateRequest;

    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
        NOT: { id: Number(userId) },
      },
      select: { id: true, email: true, username: true },
    });

    if (existing) {
      const conflictField =
        existing.email === email
          ? "email"
          : existing.username === username
          ? "username"
          : "email";
      return c.json(
        {
          success: false,
          message:
            conflictField === "email"
              ? "Email sudah terdaftar"
              : "Username sudah digunakan",
          errors: { [conflictField]: "Telah digunakan" },
        },
        409
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        name,
        username,
        email,
        password: password ? await Bun.password.hash(password) : user.password,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return c.json(
      {
        success: true,
        message: "User Berhasil Diupdate!",
        data: updatedUser,
      },
      200
    );
  } catch (e: unknown) {
    console.error(`Error updating user by ID: ${e}`);
  }
};

export const deleteUser = async (c: Context) => {
  try {
    const userId = c.req.param("id");

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return c.json(
        {
          success: false,
          message: "User Tidak Ditemukan!",
        },
        404
      );
    }

    await prisma.user.delete({ where: { id: Number(userId) } });

    return c.json(
      {
        success: true,
        message: "User Berhasil Dihapus!",
      },
      200
    );
  } catch (e: unknown) {
    console.error(`Error deleting user by ID: ${e}`);
  }
};

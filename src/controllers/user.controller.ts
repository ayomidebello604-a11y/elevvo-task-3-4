import type { NextFunction, Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getAlluserService,
  getUserByIdService,
  updateUserService,
  type User,
} from "../services/user.service.ts";

type UserParams = { id: string };
type UserUpdate = Partial<Omit<User, "id">>;

export const getAllUsers = (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(getAlluserService());
  } catch (error) {
    next(error);
    }
};

export const getUserById = (
  req: Request<UserParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = getUserByIdService(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = (
  req: Request<Record<string, never>, unknown, User>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = createUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = (
  req: Request<UserParams, unknown, UserUpdate>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = updateUserService(req.params.id, req.body);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = (
  req: Request<UserParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = deleteUserService(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};


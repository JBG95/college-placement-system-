import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { compare, hash } from "bcrypt";
import { DecodedToken } from "../types/index";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { generateTokens } from "../utils/index";

export class UserCollection {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        res.status(httpStatus.NOT_FOUND).json({
          message: "User with the provided email doesn't exist",
        });
        return;
      }
      const confirmPasswords = await compare(password, user.password);
      if (!confirmPasswords) {
        res.status(httpStatus.BAD_REQUEST).json({
          message: "Passwords do not match",
        });
        return;
      }
      const { refreshToken, accessToken } = generateTokens(user.id);

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });

      res.status(httpStatus.OK).json({
        id: user.id,
        email: user.email,
        phone: user.phone,
        username: user.username,
        fullname: user.fullname,
        avatarUrl: user.avatarUrl,
        role: user.role,
        location: user.location,
        emailVerified: user.emailVerified,
        phoneVerified: user.phoneVerified,
        privateProfile: user.privateProfile,
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred",
        message: error.message,
      });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { username, email, password, fullname, phone } = req.body;
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (user) {
        res.status(httpStatus.CONFLICT).json({
          message: "A user with the same email exists",
        });
        return;
      }

      const newuser = await prisma.user.create({
        data: {
          email,
          password: await hash(password, 10),
          username,
          fullname,
          phone,
        },
      });
      res
        .status(httpStatus.OK)
        .json({ message: "User created successfully", id: newuser.id });
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred",
        message: error.message,
      });
    }
  }

  async googleLogin(req: Request, res: Response) {
    try {
      const { displayName, email, emailVerified, photoURL, role } = req.body;
      let user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            username: displayName,
            fullname: displayName,
            avatarUrl: photoURL,
            emailVerified,
            password: "",
            role: role === "" ? "Customer" : role,
          },
        });
      }

      const { refreshToken, accessToken } = generateTokens(user.id);

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });

      res.status(httpStatus.OK).json({
        id: user.id,
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        avatarUrl: user.avatarUrl,
        role: user.role,
        location: user.location,
        emailVerified: user.emailVerified,
        phoneVerified: user.phoneVerified,
        privateProfile: user.privateProfile,
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred",
        message: error.message,
      });
    }
  }

  async whoami(req: Request, res: Response) {
    try {
      const { accessToken, refreshToken } = req.body;

      if (!accessToken || !refreshToken) {
        res.status(httpStatus.UNAUTHORIZED).json({
          message: "Unauthorized - no tokens provided",
        });
        return;
      }

      let decoded: DecodedToken;

      try {
        decoded = jwt.verify(
          accessToken,
          `${process.env.JWT_SECRET}`
        ) as DecodedToken;
        res
          .status(httpStatus.OK)
          .json({ message: "Token is valid", user: decoded });
        return;
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          try {
            decoded = jwt.verify(
              refreshToken,
              `${process.env.JWT_REFRESH}`
            ) as DecodedToken;
          } catch (refreshError) {
            if (refreshError instanceof TokenExpiredError) {
              res.status(httpStatus.UNAUTHORIZED).json({
                message: "Unauthorized - refresh token expired",
              });
              return;
            } else {
              res.status(httpStatus.UNAUTHORIZED).json({
                message: "Unauthorized - invalid refresh token",
              });
              return;
            }
          }

          const user = await prisma.user.findUnique({
            where: {
              id: decoded.id,
              refreshToken,
            },
          });

          if (!user) {
            res.status(httpStatus.NOT_FOUND).json({
              message: "User with the provided refresh token doesn't exist",
            });
            return;
          }

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            generateTokens(user.id);

          await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: newRefreshToken },
          });

          res.status(httpStatus.OK).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          });
        } else {
          res.status(httpStatus.UNAUTHORIZED).json({
            message: "Unauthorized - invalid access token",
          });
        }
      }
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred",
        message: error.message,
      });
    }
  }

  async updateAvatar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!req.file) {
        res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "No image file uploaded" });
        return;
      }

      const avatarUrl = `/uploads/${req.file.filename}`;

      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          avatarUrl,
        },
      });

      res.status(httpStatus.OK).json({ userId: updatedUser.id, avatarUrl });
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while updating the user's avatar",
        message: error.message,
      });
    }
  }

  async updateRole(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { role } = req.body;
      console.log("this is it", req.body);

      const updatedCompany = await prisma.user.update({
        where: { id },
        data: {
          role,
        },
      });

      res.status(httpStatus.OK).json(updatedCompany);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while updating the company",
        message: error.message,
      });
    }
  }
}

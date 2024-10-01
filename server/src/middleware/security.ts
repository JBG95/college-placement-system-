import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { UserRole } from "@prisma/client";
import { DecodedToken } from "../types";

const JWT_SECRET = process.env.JWT_SECRET as string;

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        role: UserRole;
      };
    }
  }
}

export function securityMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const xssRegex =
    /(?:<[^>]*|\b)(on\w+\s*=|javascript\s*:|expression\s*\(|eval\s*\()|<\s*script|<\s*img|<\s*iframe|<\s*link|<\s*meta|<\s*form|<\s*svg|data\s*:|vbscript\s*:|<\s*object/i;

  const sqlInjectionRegex =
    /(SELECT.*FROM|INSERT INTO|UPDATE.*SET|DELETE FROM|DROP)/gi;

  const params = req.query;
  const body = req.body;
  const headers = req.headers;
  const isXSS = (data: any) => xssRegex.test(data);
  const isSQLI = (data: any) => sqlInjectionRegex.test(data);

  const checkForPayloads = (data: any) => {
    if (typeof data === "object") {
      for (let key in data) {
        if (isXSS(data[key]) || isSQLI(data[key])) {
          return true;
        }
        if (checkForPayloads(data[key])) {
          return true;
        }
      }
    }
    return false;
  };

  if (
    Object.keys(params).some(
      (key) => isXSS(params[key]) || isSQLI(params[key])
    ) ||
    checkForPayloads(body) ||
    Object.keys(headers).some(
      (key) => isXSS(headers[key]) || isSQLI(headers[key])
    )
  ) {
    return res
      .status(403)
      .send({ status: "Forbidden", message: "Forbidden request" });
  }

  next();
}

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Unauthorized - no token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded: DecodedToken;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          message: "Unauthorized - token expired",
        });
      } else {
        return res.status(httpStatus.UNAUTHORIZED).json({
          message: "Unauthorized - invalid token",
        });
      }
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "User with the decoded ID doesn't exist",
      });
    }

    req.user = {
      id: user.id,
      role: user.role,
    };
    next();
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: "An error occurred",
      message: error.message,
    });
  }
};

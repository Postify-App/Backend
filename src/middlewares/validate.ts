import { ZodObject } from 'zod';
import { fromError } from 'zod-validation-error';

import { NextFunction, Request, Response } from 'express';

const validate =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const err = fromError(result.error);
      throw new Error(err.message);
    }

    if (result.data.body) req.body = result.data.body;
    next();
  };

export default validate;

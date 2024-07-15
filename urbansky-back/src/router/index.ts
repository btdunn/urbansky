import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator'

import { ItemModel } from '../models/Item';

export const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.status(200).send('ok');
});

router.get('/items', async (req: Request, res: Response) => {
  try {
    const items = await ItemModel.all()
    if (!items) {
      return res.status(404).json({
        message: 'Items not found',
      });
    }
    res.json({
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.get('/items/:id', async (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(400).json({
      message: 'Bad Request, please provide an Item id',
    });
  }

  try {
    const item = await ItemModel.findById(req.params.id)
    if (!item) {
      return res.status(404).json({
        message: 'Item not found, id may not exist',
      });
    }
    res.json({
      data: item,
    });
  } catch (error) {
    console.error('Error finding item:', error)
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.post(
  '/items',
  // validate fields
  [
    body('serial').isFloat({ gt: -1 }).withMessage('Serial number must be a positive number'),
    body('serial').notEmpty().withMessage('Serial number is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('quantity').isFloat({ gt: -1 }).withMessage('Quantity must be a positive number'),
    body('quantity').notEmpty().withMessage('Quantity is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newItem = await ItemModel.create(req.body);
      res.json({
        data: newItem,
      });
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  }
);

router.patch(
  '/items/:id',
  // validate fields
  [
    body('serial').optional().isFloat({ gt: -1 }).withMessage('Serial number must be a positive number'),
    body('serial').optional().notEmpty().withMessage('Serial number is required'),
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('description').optional().notEmpty().withMessage('Description is required'),
    body('quantity').optional().isFloat({ gt: -1 }).withMessage('Quantity must be a positive number'),
    body('quantity').optional().notEmpty().withMessage('Quantity is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedItem = await ItemModel.update(req.params.id, req.body);
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json({
        data: updatedItem,
      });
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  }
);

router.delete('/items/:id', async (req: Request, res: Response) => {
  try {
    const item = await ItemModel.delete(req.params.id)
    if (!item) {
      return res.status(404).json({
        message: 'Item not found, id may not exist',
      });
    }
    res.json({
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});
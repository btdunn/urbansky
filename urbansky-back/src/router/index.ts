import { Request, Response, Router } from 'express';

import { ItemModel } from '../models/Item';

export const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.status(200).send('ok');
});

router.get('/items', async (req: Request, res: Response) => {
  try {
    res.json({
      data: await ItemModel.all(),
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
      message: 'Bad Request',
    });
  }

  try {
    res.json({
      data: await ItemModel.findById(req.params.id),
    });
  } catch (error) {
    console.error('Error creating item:', error)
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.post('/items', async (req: Request, res: Response) => {
  try {
    const newItem = await ItemModel.create(req.body)
    res.json({
      data: newItem,
    });
  } catch (error) {
    console.error('Error creating item:', error)
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.patch('/items/:id', async (req: Request, res: Response) => {
  try {
    const updatedItem = await ItemModel.update(req.params.id, req.body)
    res.json({
      data: updatedItem,
    });
  } catch (error) {
    console.error('Error creating item:', error)
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
})

router.delete('/items/:id', async (req: Request, res: Response) => {
  try {
    res.json({
      data: await ItemModel.delete(req.params.id),
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});